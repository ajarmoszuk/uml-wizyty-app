# UML Łódź API — Implementation Notes

Reverse-engineered from browser DevTools while using `wizyty.uml.lodz.pl`.  
There is no public API documentation. Everything here was discovered by observation.

---

## Base URL

```
https://wizyty.uml.lodz.pl
```

All endpoints live under `/admin/API/`.  
In this app every call is made via the `/api/` prefix, which the Vite dev proxy (and the Vercel rewrite in production) transparently rewrites to the base URL above.

---

## Authentication & Sessions

- No API key or token is required for GET requests.
- The API uses `PHPSESSID` and `TS0…` cookies for session continuity, but these are not required for the slot-fetching endpoints — they work anonymously.
- The booking flow is protected by **SMS phone number verification** (see [POST /validate_phone](#post-adminapivalidate_phone) and [POST /take_appointment](#post-adminapitake_appointment)).
- There is **no CAPTCHA**.

---

## Data Model

Every service has two parallel identifiers:

| Field | Type | Meaning |
|---|---|---|
| `BranchID` | int | The office branch (building/department) |
| `ServiceID` | int | The specific service within that branch |
| `SedcoBranchID` | int | Same branch in the SEDCO queue system |
| `SedcoServiceID` | int | Same service in the SEDCO queue system |

Both pairs must be supplied together. They do **not** share the same numeric space — `BranchID: 8, SedcoBranchID: 311` both refer to the vehicle registration office, for example.

---

## Endpoints

### GET `/admin/API/time/{branchId}/{serviceId}/{date}`

Returns available time slots for a given service on a given date.

**Path parameters**

| Param | Format | Example |
|---|---|---|
| `branchId` | integer | `8` |
| `serviceId` | integer | `60` |
| `date` | `YYYY-MM-DD` | `2026-03-24` |

> ⚠️ **Timezone trap.** The date must be formatted using **local time**, not UTC.  
> Using `new Date().toISOString()` will produce a UTC date that is one day behind in Polish time  
> (UTC+1/+2). Always build the date string using `getFullYear()` / `getMonth()` / `getDate()`.

**Response**

```json
{
  "DEBUG": {
    "TIME_MEASURE": {
      "TIMEZONE": { "date": "2026-03-24 09:00:00", "timezone": "Europe/Warsaw" },
      "START": "0.123 1742800000"
    }
  },
  "TIMES": [
    {
      "time": "08:30:00",
      "slots": 2,
      "max_slots": "3",
      "reservations_count": 1
    }
  ]
}
```

- `TIMES` is absent or empty on weekends and public holidays.
- Entries where `slots === 0` are fully booked and should be filtered out.
- The response always includes a `DEBUG.TIME_MEASURE` object — the API wraps every response with internal telemetry. The gem from the `ANALYZE` field:  
  `"5 - 5 = 0, CZYLI WYTWORZYŁ 0 DŁUGU"` ("5 - 5 = 0, meaning it generated 0 debt").

---

### POST `/admin/API/validate_phone`

Sends an SMS verification code to the user's phone number.  
Must be called before `take_appointment`.

**Request**

Content-Type: `multipart/form-data`  
Single form field: `JSONForm` (string, JSON-encoded)

```json
{
  "phone": "600123456",
  "timestamp": 1742838049243,
  "SedcoBranchID": 311,
  "SedcoServiceID": 409,
  "BranchID": 8,
  "ServiceID": 60
}
```

- `phone` — 9-digit Polish number, no country code, no spaces.
- `timestamp` — `Date.now()` in milliseconds. Purpose unknown; appears to be logging only.
- Both ID pairs are required.

**Response**

```json
{
  "DEBUG": { ... }
}
```

On success the response body contains only the `DEBUG` object and an HTTP 200.  
There is no explicit success field — absence of an error is the success signal.  
The SMS is delivered within a few seconds. The code is 4 digits.  
A cooldown applies: re-sending within ~60 seconds returns an error.

---

### POST `/admin/API/take_appointment`

Books the appointment. Requires the 4-digit SMS code received from `validate_phone`.

**Request**

Content-Type: `multipart/form-data`  
Single form field: `JSONForm` (string, JSON-encoded)

```json
{
  "SedcoBranchID": 311,
  "SedcoServiceID": 409,
  "BranchID": 8,
  "ServiceID": 60,
  "AppointmentDay": "2026-03-24",
  "AppointmentTime": "08:30:00",
  "CustomerInfo": {
    "AdditionalInfo": {
      "CustomerName_L2": "Jan Kowalski",
      "Phone": "600123456",
      "verificationCode": "1234",
      "DateOfBirth": "1990-05-20",
      "Email": "jan@example.com",
      "NotificationType": ["email"],
      "checkbox": true,
      "checkbox2": true
    }
  },
  "LanguagePrefix": "pl",
  "SelectedLanguage": "pl",
  "SegmentIdentification": "internet"
}
```

| Field | Notes |
|---|---|
| `AppointmentDay` | `YYYY-MM-DD`, local time — same timezone trap as above |
| `AppointmentTime` | `HH:MM:SS` — must include seconds |
| `CustomerName_L2` | Full name — the `_L2` suffix likely means "language 2" (the non-queue-display name) |
| `verificationCode` | 4-digit string from the SMS |
| `DateOfBirth` | `YYYY-MM-DD` |
| `NotificationType` | Array; known values: `"email"`, `"sms"` |
| `checkbox` | Acceptance of booking terms (must be `true`) |
| `checkbox2` | GDPR consent for personal data processing (must be `true`) |
| `LanguagePrefix` | Hardcoded `"pl"` — no observed effect when changed |
| `SegmentIdentification` | Hardcoded `"internet"` — distinguishes web from in-person |

**Response — success**

```json
{
  "DEBUG": { ... },
  "RESPONSE": {
    "TakeAppointmentResult": {
      "Code": 0,
      "Description": "OK"
    },
    "AppointmentTicketInfo": {
      "TicketNumber": "A042",
      "AppointmentDay": "2026-03-24",
      "AppointmentTime": "08:30:00",
      "BranchName": "Wydział Komunikacji",
      "ServiceName": "Rejestracja pojazdu"
    }
  }
}
```

**Response — failure**

```json
{
  "RESPONSE": {
    "TakeAppointmentResult": {
      "Code": 1,
      "Description": "Nieprawidłowy kod weryfikacyjny"
    }
  }
}
```

- `Code: 0` = success. Any other code = error; surface `Description` to the user.
- Common failure codes:
  - Wrong SMS code → `Code: 1`
  - Slot already taken (race condition) → `Code: 1` or slot disappears from the time list
  - Session expired / code expired → `Code: 1`

---

## Known Quirks

### The ANALYZE field
Every slot response includes a `DEBUG` block containing lines like:
```
"ANALYZE": "5 - 5 = 0, CZYLI WYTWORZYŁ 0 DŁUGU"
"WZÓR": "[ZOBACZ POLE *WZÓR*]"
"ILOŚĆ DOSTĘPNYCH MIEJSC MIEJSC": "5"
```
("ILOŚĆ DOSTĘPNYCH MIEJSC MIEJSC" = "NUMBER OF AVAILABLE PLACES PLACES" — the word "MIEJSC" appears twice.)  
These are internal debug traces left in the production API. They are safe to ignore.

### Weekend / holiday handling
The API does not return a `slots: 0` response for closed days — it returns an empty `TIMES` array (or no `TIMES` key at all). Treat both as "no availability".

### No service discovery endpoint
`GET /admin/API/services` returns empty JSON. Service and branch IDs were discovered by:
1. Observing network requests on the official site for each service
2. Fetching `/admin/API/branch/{id}` for each known branch ID
3. Resolving label strings via `/admin/API/teksts`

All discovered IDs are hardcoded in `src/api/booking.js`.

### Maintenance window
The API is typically unavailable between **00:00 and 03:00 Europe/Warsaw** (likely a nightly DB backup/maintenance job). Requests during this window may hang or return 5xx errors.

---

## Proxy Setup

The browser cannot call `wizyty.uml.lodz.pl` directly due to CORS restrictions.

| Environment | Proxy |
|---|---|
| Development | Vite `server.proxy` in `vite.config.js` rewrites `/api/*` → `https://wizyty.uml.lodz.pl/*` |
| Production (Vercel) | `vercel.json` rewrite rule does the same at the edge |

No backend server is required in either case.

---

## Meta

This entire project — reverse-engineering the API, building the UI, accessibility, i18n (PL/EN/UK), dark mode, caching, SEO, and this documentation — was built with the help of [Claude](https://claude.ai) in approximately **3 hours** and roughly **$20 in API tokens**.

That figure is shared only as context on the scale of a side experiment, not as criticism of institutional procurement or teams.
