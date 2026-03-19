import React, { createContext, useContext, useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const T = {
  pl: {
    // meta
    lang: 'pl',
    months: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
    days: ['Pn','Wt','Śr','Cz','Pt','Sb','Nd'],

    // nav / header
    city: 'Urząd Miasta Łodzi',
    bookTitle: 'Umów wizytę',
    about: 'O projekcie',
    unofficial: 'Nieoficjalny interfejs · dane wysyłane wyłącznie do wizyty.uml.lodz.pl',
    bannerMaintenance: 'System UML może być niedostępny — zazwyczaj przerwa techniczna trwa od 00:00 do 3:00.',
    bannerOffline: 'Brak połączenia z internetem. Sprawdź sieć i spróbuj ponownie.',
    bannerDismiss: 'Zamknij',

    // step labels
    step0: 'Termin',
    step1: 'Dane',
    step2: 'SMS',
    stepCount: (n, total) => `Krok ${n} z ${total}`,

    // service picker
    whatNeeded: 'Czego potrzebujesz?',
    chooseCategory: 'Wybierz kategorię, żeby zobaczyć usługi:',
    chooseService: 'Wybierz usługę:',
    changeCategory: '← Zmień kategorię',
    changeService: 'zmień ↩',
    serviceSingular: 'usługa',
    servicePlural: 'usługi',
    serviceGenPlural: 'usług',

    // calendar
    whenCome: 'Kiedy chcesz przyjść?',
    prevMonth: '← Poprzedni',
    nextMonth: 'Następny →',
    prevMonthLabel: 'Poprzedni miesiąc',
    nextMonthLabel: 'Następny miesiąc',
    githubLabel: 'Kod źródłowy na GitHub (otwiera nową kartę)',
    darkOn: 'Przełącz na tryb jasny',
    darkOff: 'Przełącz na tryb ciemny',
    codeDigit: (i) => `Cyfra ${i + 1} z 4`,
    dayAvail: (n) => `${n} wolnych miejsc`,
    dayNone: 'Brak wolnych miejsc',
    checkingSlots: 'Sprawdzam wolne godziny...',
    availableHours: 'Dostępne godziny',
    on: '—',
    noSlots: '😕 W tym dniu nie ma wolnych miejsc. Wybierz inny dzień.',
    clickHint: 'Kliknij na podświetlony dzień, żeby zobaczyć godziny',
    calendarLegend: 'Podświetlone dni mają wolne miejsca',
    slot1: '1 miejsce',
    slotsN: (n) => `${n} miejsca`,

    // details
    yourSlot: 'Twój wybrany termin',
    enterDetails: 'Podaj swoje dane',
    detailsSub: 'Potrzebujemy ich do rezerwacji. Numer telefonu posłuży do weryfikacji SMS.',
    nameLabel: 'Imię i nazwisko',
    nameHint: 'Tak jak w dowodzie',
    nameError: 'Wpisz imię i nazwisko',
    phoneLabel: 'Numer telefonu',
    phoneHint: '9 cyfr, bez +48',
    phoneError: 'Wpisz 9 cyfr numeru polskiego',
    dobLabel: 'Data urodzenia',
    dobHintDefault: 'W formacie rok-miesiąc-dzień',
    dobError: 'Format: RRRR-MM-DD (np. 1990-05-20)',
    emailLabel: 'Adres e-mail',
    emailHint: 'Tu wyślemy potwierdzenie',
    emailError: 'Wpisz poprawny adres e-mail',
    notifLabel: 'Potwierdzenie wizyty przez',
    saveData: 'Zapamiętaj moje dane na tym urządzeniu',
    nextBtn: 'Dalej — wyślij kod SMS →',
    back: '← Wróć',

    // consent checkboxes
    terms1: 'Zgadzam się z warunkami rezerwacji. Warunki ogólne: Aby zarezerwować wizytę w dowolnej komórce organizacyjnej Urzędu Miasta Łodzi, należy wybrać odpowiednią grupę spraw, dzień i godzinę planowanej wizyty. W razie konieczności załatwienia spraw w różnych grupach (np. A i B) należy wykonać rezerwację dla każdej osobno. Po wypełnieniu wymaganych pól i wybraniu przycisku „ZAREZERWUJ WIZYTĘ" wyświetli się potwierdzenie rezerwacji. W przypadku podania adresu e-mail system wygeneruje potwierdzenie rezerwacji na wskazany adres. W przypadku rezygnacji z umówionej wizyty prosimy o informację poprzez wejście na link, który przesyłany jest automatycznie wraz z potwierdzeniem na wskazany adres e-mail.',
    terms2: 'Wyrażam zgodę na przetwarzanie moich danych osobowych, tj. imienia, nazwiska, numeru telefonu, daty urodzenia oraz adresu e-mail, przez Prezydenta Miasta Łodzi z siedzibą w Łodzi, przy ul. Piotrkowskiej 104, 90-926 Łódź, w celu realizacji rezerwacji terminu wizyty i jej obsługi.',
    termsRequired: 'Zaznacz oba pola, żeby kontynuować.',

    // verify
    verifyTitle: 'Weryfikacja numeru telefonu',
    verifySub: 'Wyślemy bezpłatny SMS z 4-cyfrowym kodem na numer:',
    yourNumber: 'Twój numer',
    sendSms: '📱 Wyślij kod SMS →',
    sendError: 'Nie udało się wysłać SMS. Spróbuj ponownie.',
    sending: 'Wysyłanie...',
    enterCode: 'Wpisz kod z SMS',
    codeSent: (phone) => `Wysłaliśmy 4-cyfrowy kod na +48 ${phone}. Sprawdź wiadomości.`,
    resendIn: (n) => `Wyślij ponownie za ${n}s`,
    resend: 'Wyślij kod ponownie',
    codeError: 'Wpisz 4-cyfrowy kod z SMS',
    bookingInProgress: 'Rezerwuję wizytę...',
    bookBtn: '✅ Zarezerwuj wizytę →',
    bookError: 'Rezerwacja nie powiodła się: ',
    wait: 'Chwilę...',

    // confirm
    confirmedTitle: 'Wizyta zarezerwowana!',
    confirmedSub: 'Potwierdzenie zostało wysłane na Twój adres e-mail.',
    ticketNumber: 'Numer biletu',
    dateLabel: 'Data',
    timeLabel: 'Godzina',
    serviceLabel: 'Usługa',
    addressLabel: 'Adres',
    reminder: '💡 Przyjdź nie wcześniej niż 20 minut przed wizytą. Spóźnienie powoduje automatyczne anulowanie.',
    bookAnother: 'Zarezerwuj kolejną wizytę',

    // category names
    cat_Pojazdy: 'Pojazdy',
    cat_PrawaJazdy: 'Prawa jazdy',
    cat_Dowody: 'Dowody osobiste i meldunki',
    cat_USC: 'Urząd Stanu Cywilnego',
    cat_Nadzor: 'Nadzór i kontrola',
    cat_WZK: 'Centrum Kontaktu z Mieszkańcami',
    cat_Podatki: 'Podatki i opłaty',
    cat_Niepelnosprawni: 'Osoby z niepełnosprawnością',
    cat_Egzekucja: 'Egzekucja i windykacja',
    cat_Dzialalnosc: 'Działalność gospodarcza',

    // about modal
    aboutTitle: 'O projekcie',
    aboutTagline: 'Nieoficjalny, otwartoźródłowy wrapper dla systemu rezerwacji wizyt UMŁ.',
    aboutBody: `Oryginalna platforma (wizyty.uml.lodz.pl) jest, delikatnie mówiąc, trudna w użyciu. Odpowiedzi API zawierają kilkanaście kilobajtów wewnętrznych notatek developerskich, polskie nazwy pól w JSON, działania arytmetyczne jako stringi i praktycznie zerową strukturę. Frontend jest wolny, nieintuicyjny i utrudnia nawet najprostszą rezerwację.

Ten projekt to nieoficjalny, open-source wrapper — rozmawia z tymi samymi serwerami uml.lodz.pl, ale prezentuje informacje tak, jakby napisał go człowiek. Nic tutaj nie jest zbierane ani przechowywane. Twoje dane trafiają wyłącznie do serwera urzędu.`,
    claudeNote: 'Zbudowane z pomocą Claude w ~3 godziny i ~20$ na tokeny. Tyle zajęło AI zrobienie czegoś, co UML zlecił ludziom.',
    aboutDataNote: '🔒 Twoje dane trafiają wyłącznie na serwery uml.lodz.pl. Nic nie jest tutaj zbierane.',
    hireMe: 'Jesteś z Łódzkiego Urzędu?',
    hireMeSub: 'Skontaktuj się ze mną lub zatrudnij mnie —',
    sourceCode: 'Kod źródłowy na GitHub',
    close: 'Zamknij',
  },

  en: {
    lang: 'en',
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    days: ['Mo','Tu','We','Th','Fr','Sa','Su'],

    city: 'City of Łódź',
    bookTitle: 'Book an appointment',
    about: 'About',
    unofficial: 'Unofficial interface · data sent only to wizyty.uml.lodz.pl',
    bannerMaintenance: 'The UML system may be unavailable — scheduled maintenance usually runs 00:00–3:00.',
    bannerOffline: 'No internet connection. Check your network and try again.',
    bannerDismiss: 'Dismiss',

    step0: 'Date',
    step1: 'Details',
    step2: 'SMS',
    stepCount: (n, total) => `Step ${n} of ${total}`,

    whatNeeded: 'What do you need?',
    chooseCategory: 'Choose a category to see available services:',
    chooseService: 'Choose a service:',
    changeCategory: '← Change category',
    changeService: 'change ↩',
    serviceSingular: 'service',
    servicePlural: 'services',
    serviceGenPlural: 'services',

    whenCome: 'When do you want to come?',
    prevMonth: '← Previous',
    nextMonth: 'Next →',
    prevMonthLabel: 'Previous month',
    nextMonthLabel: 'Next month',
    githubLabel: 'Source code on GitHub (opens new tab)',
    darkOn: 'Switch to light mode',
    darkOff: 'Switch to dark mode',
    codeDigit: (i) => `Digit ${i + 1} of 4`,
    dayAvail: (n) => `${n} available slots`,
    dayNone: 'No available slots',
    checkingSlots: 'Checking available times...',
    availableHours: 'Available times',
    on: '—',
    noSlots: '😕 No available slots on this day. Choose another date.',
    clickHint: 'Click a highlighted day to see available times',
    calendarLegend: 'Highlighted days have available slots',
    slot1: '1 slot',
    slotsN: (n) => `${n} slots`,

    yourSlot: 'Your chosen slot',
    enterDetails: 'Enter your details',
    detailsSub: 'We need these to book your appointment. Your phone number will be used for SMS verification.',
    nameLabel: 'Full name',
    nameHint: 'As on your ID',
    nameError: 'Enter your full name',
    phoneLabel: 'Phone number',
    phoneHint: '9 digits, no +48',
    phoneError: 'Enter a valid 9-digit Polish number',
    dobLabel: 'Date of birth',
    dobHintDefault: 'Format: year-month-day',
    dobError: 'Format: YYYY-MM-DD (e.g. 1990-05-20)',
    emailLabel: 'Email address',
    emailHint: 'Confirmation will be sent here',
    emailError: 'Enter a valid email address',
    notifLabel: 'Appointment confirmation via',
    saveData: 'Remember my details on this device',
    nextBtn: 'Next — send SMS code →',
    back: '← Back',

    // consent checkboxes
    terms1: 'I agree to the booking conditions. General terms: To book an appointment at Łódź City Office, select the relevant service group, date and time. If you need to deal with multiple service groups (e.g. A and B), make a separate booking for each. After completing the required fields and clicking "BOOK APPOINTMENT", a confirmation will be displayed. If an email address was provided, a confirmation will be sent to it. To cancel a booked appointment, use the cancellation link sent automatically in the confirmation email.',
    terms2: 'I consent to the processing of my personal data — including name, surname, phone number, date of birth and email address — by the Mayor of the City of Łódź, ul. Piotrkowska 104, 90-926 Łódź, for the purpose of booking and managing the appointment.',
    termsRequired: 'Please accept both terms to continue.',

    verifyTitle: 'Phone number verification',
    verifySub: 'We\'ll send a free SMS with a 4-digit code to:',
    yourNumber: 'Your number',
    sendSms: '📱 Send SMS code →',
    sendError: 'Failed to send SMS. Please try again.',
    sending: 'Sending...',
    enterCode: 'Enter SMS code',
    codeSent: (phone) => `We sent a 4-digit code to +48 ${phone}. Check your messages.`,
    resendIn: (n) => `Resend in ${n}s`,
    resend: 'Resend code',
    codeError: 'Enter the 4-digit code from the SMS',
    bookingInProgress: 'Booking your appointment...',
    bookBtn: '✅ Book appointment →',
    bookError: 'Booking failed: ',
    wait: 'Please wait...',

    confirmedTitle: 'Appointment booked!',
    confirmedSub: 'A confirmation has been sent to your email address.',
    ticketNumber: 'Ticket number',
    dateLabel: 'Date',
    timeLabel: 'Time',
    serviceLabel: 'Service',
    addressLabel: 'Address',
    reminder: '💡 Arrive no earlier than 20 minutes before your appointment. Late arrivals are automatically cancelled.',
    bookAnother: 'Book another appointment',

    cat_Pojazdy: 'Vehicles',
    cat_PrawaJazdy: 'Driver\'s licenses',
    cat_Dowody: 'ID cards & address registration',
    cat_USC: 'Civil Registry Office',
    cat_Nadzor: 'Supervision & control',
    cat_WZK: 'Resident Contact Centre',
    cat_Podatki: 'Taxes & fees',
    cat_Niepelnosprawni: 'People with disabilities',
    cat_Egzekucja: 'Debt enforcement',
    cat_Dzialalnosc: 'Business activities',

    aboutTitle: 'About this project',
    aboutTagline: 'An unofficial, open-source wrapper for the Łódź city office appointment system.',
    aboutBody: `The official platform (wizyty.uml.lodz.pl) is, to put it charitably, a product of the cheapest-bidder procurement process.

The API returns 15KB of internal developer debug notes per request. Field names are Polish strings embedded in JSON. Arithmetic calculations appear as string values like "5 - 5 = 0, CZYLI WYTWORZYŁ 0 DŁUGU". There is no versioning, no documentation, no structure. The frontend is slow, counter-intuitive, and appears to have never been reviewed by anyone with UX experience.

This project is an unofficial, open-source wrapper that talks to the same city servers but presents the information like a human being wrote it.`,
    claudeNote: 'Built with Claude in ~3 hours and ~$20 in tokens. That\'s how long it took an AI to do what Łódź City Hall commissioned from humans.',
    aboutDataNote: '🔒 Your data goes directly to uml.lodz.pl servers. Nothing is collected here.',
    hireMe: 'From Łódź City Office?',
    hireMeSub: 'Get in touch or hire me —',
    langWarning: 'Staff at Łódź City Office may not speak English.',
    langWarningSub: 'Consider bringing a Polish-speaking person with you, or prepare key phrases in advance.',
    sourceCode: 'Source code on GitHub',
    close: 'Close',
  },

  uk: {
    lang: 'uk',
    months: ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
    days: ['Пн','Вт','Ср','Чт','Пт','Сб','Нд'],

    city: 'Міська рада Лодзі',
    bookTitle: 'Записатися на прийом',
    about: 'Про проект',
    unofficial: 'Неофіційний інтерфейс · дані надсилаються лише на wizyty.uml.lodz.pl',
    bannerMaintenance: 'Система UML може бути недоступна — технічна перерва зазвичай з 00:00 до 3:00.',
    bannerOffline: 'Немає підключення до інтернету. Перевірте мережу і спробуйте ще раз.',
    bannerDismiss: 'Закрити',

    step0: 'Час',
    step1: 'Дані',
    step2: 'SMS',
    stepCount: (n, total) => `Крок ${n} з ${total}`,

    whatNeeded: 'Що вам потрібно?',
    chooseCategory: 'Оберіть категорію, щоб побачити послуги:',
    chooseService: 'Оберіть послугу:',
    changeCategory: '← Змінити категорію',
    changeService: 'змінити ↩',
    serviceSingular: 'послуга',
    servicePlural: 'послуги',
    serviceGenPlural: 'послуг',

    whenCome: 'Коли ви хочете прийти?',
    prevMonth: '← Попередній',
    nextMonth: 'Наступний →',
    prevMonthLabel: 'Попередній місяць',
    nextMonthLabel: 'Наступний місяць',
    githubLabel: 'Вихідний код на GitHub (відкриває нову вкладку)',
    darkOn: 'Переключити на світлу тему',
    darkOff: 'Переключити на темну тему',
    codeDigit: (i) => `Цифра ${i + 1} з 4`,
    dayAvail: (n) => `${n} вільних місць`,
    dayNone: 'Немає вільних місць',
    checkingSlots: 'Перевіряємо вільні години...',
    availableHours: 'Доступний час',
    on: '—',
    noSlots: '😕 У цей день немає вільних місць. Оберіть інший день.',
    clickHint: 'Натисніть на виділений день, щоб побачити доступний час',
    calendarLegend: 'Виділені дні мають вільні місця',
    slot1: '1 місце',
    slotsN: (n) => `${n} місця`,

    yourSlot: 'Обраний вами час',
    enterDetails: 'Введіть ваші дані',
    detailsSub: 'Вони потрібні для запису. Номер телефону використовуватиметься для SMS-верифікації.',
    nameLabel: 'Ім\'я та прізвище',
    nameHint: 'Як у документі',
    nameError: 'Введіть ваше ім\'я та прізвище',
    phoneLabel: 'Номер телефону',
    phoneHint: '9 цифр, без +48',
    phoneError: 'Введіть дійсний 9-значний польський номер',
    dobLabel: 'Дата народження',
    dobHintDefault: 'Формат: рік-місяць-день',
    dobError: 'Формат: РРРР-ММ-ДД (напр. 1990-05-20)',
    emailLabel: 'Адреса ел. пошти',
    emailHint: 'Сюди надійде підтвердження',
    emailError: 'Введіть дійсну адресу ел. пошти',
    notifLabel: 'Підтвердження запису через',
    saveData: 'Запам\'ятати мої дані на цьому пристрої',
    nextBtn: 'Далі — надіслати SMS-код →',
    back: '← Назад',

    // consent checkboxes
    terms1: "Погоджуюся з умовами резервації. Загальні умови: Щоб записатися на прийом у будь-який підрозділ Міської ради Лодзі, необхідно вибрати відповідну групу справ, день та час прийому. Якщо потрібно вирішити справи з різних груп (наприклад, А і Б), треба зробити окрему резервацію для кожної. Після заповнення всіх обов'язкових полів і натискання кнопки «ПІДТВЕРДИТИ ЗАПИС» з'явиться підтвердження. Якщо вказано адресу ел. пошти, підтвердження буде надіслано на неї. Для скасування запису скористайтеся посиланням, яке автоматично надходить разом із підтвердженням.",
    terms2: 'Даю згоду на обробку моїх персональних даних — імені, прізвища, номера телефону, дати народження та адреси ел. пошти — Президентом Міста Лодзі з місцезнаходженням у Лодзі, вул. Пьотрковська 104, 90-926 Лодзь, з метою реалізації резервації терміну прийому та її обслуговування.',
    termsRequired: 'Будь ласка, прийміть обидві умови, щоб продовжити.',

    verifyTitle: 'Верифікація номера телефону',
    verifySub: 'Надішлемо безкоштовний SMS з 4-значним кодом на номер:',
    yourNumber: 'Ваш номер',
    sendSms: '📱 Надіслати SMS-код →',
    sendError: 'Не вдалося надіслати SMS. Спробуйте ще раз.',
    sending: 'Надсилання...',
    enterCode: 'Введіть код з SMS',
    codeSent: (phone) => `Ми надіслали 4-значний код на +48 ${phone}. Перевірте повідомлення.`,
    resendIn: (n) => `Надіслати знову через ${n}с`,
    resend: 'Надіслати код знову',
    codeError: 'Введіть 4-значний код з SMS',
    bookingInProgress: 'Резервуємо запис...',
    bookBtn: '✅ Підтвердити запис →',
    bookError: 'Помилка бронювання: ',
    wait: 'Зачекайте...',

    confirmedTitle: 'Запис підтверджено!',
    confirmedSub: 'Підтвердження надіслано на вашу електронну адресу.',
    ticketNumber: 'Номер квитка',
    dateLabel: 'Дата',
    timeLabel: 'Час',
    serviceLabel: 'Послуга',
    addressLabel: 'Адреса',
    reminder: '💡 Приходьте не раніше ніж за 20 хвилин до прийому. Запізнення призводить до автоматичного скасування.',
    bookAnother: 'Записатися ще раз',

    cat_Pojazdy: 'Транспортні засоби',
    cat_PrawaJazdy: 'Водійські посвідчення',
    cat_Dowody: 'Посвідчення особи та реєстрація',
    cat_USC: 'Відділ реєстрації актів цивільного стану',
    cat_Nadzor: 'Нагляд та контроль',
    cat_WZK: 'Центр обслуговування мешканців',
    cat_Podatki: 'Податки та збори',
    cat_Niepelnosprawni: 'Люди з обмеженими можливостями',
    cat_Egzekucja: 'Виконавче провадження',
    cat_Dzialalnosc: 'Підприємницька діяльність',

    aboutTitle: 'Про цей проект',
    aboutTagline: 'Неофіційна обгортка з відкритим кодом для системи запису на прийом у Лодзі.',
    aboutBody: `Офіційна платформа (wizyty.uml.lodz.pl) є, м'яко кажучи, продуктом принципу «найдешевший постачальник».

API-відповіді містять 15 кілобайт внутрішніх розробницьких нотаток на кожен запит. Назви JSON-полів — польські рядки. Арифметичні обчислення вбудовані як рядки на зразок "5 - 5 = 0, CZYLI WYTWORZYŁ 0 DŁUGU". Жодного версіонування, жодної документації, жодної структури. Фронтенд повільний і незручний.

Цей проект — неофіційна обгортка з відкритим вихідним кодом, яка звертається до тих самих міських серверів, але представляє інформацію так, ніби її написала людина.`,
    claudeNote: 'Створено за допомогою Claude за ~3 години і ~$20 на токени. Стільки знадобилось ШІ, щоб зробити те, що Міська рада Лодзі замовила у людей.',
    aboutDataNote: '🔒 Ваші дані надходять напряму на сервери uml.lodz.pl. Тут нічого не збирається.',
    hireMe: 'Ви з Міської ради Лодзі?',
    hireMeSub: "Зв'яжіться зі мною або найміть мене —",
    langWarning: 'Персонал Міської ради Лодзі може не говорити українською.',
    langWarningSub: 'Розгляньте можливість взяти з собою людину, яка розмовляє польською, або підготуйте заздалегідь ключові фрази.',
    sourceCode: 'Вихідний код на GitHub',
    close: 'Закрити',
  },
}

// Map Polish category strings → translation key
export const CAT_KEY = {
  'Pojazdy':                         'cat_Pojazdy',
  'Prawa jazdy':                     'cat_PrawaJazdy',
  'Dowody osobiste i meldunki':      'cat_Dowody',
  'Urząd Stanu Cywilnego':           'cat_USC',
  'Nadzór i kontrola':               'cat_Nadzor',
  'Centrum Kontaktu z Mieszkańcami': 'cat_WZK',
  'Podatki i opłaty':                'cat_Podatki',
  'Osoby z niepełnosprawnością':     'cat_Niepelnosprawni',
  'Egzekucja i windykacja':          'cat_Egzekucja',
  'Działalność gospodarcza':         'cat_Dzialalnosc',
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXTS
// ─────────────────────────────────────────────────────────────────────────────
export const LangContext = createContext({ lang: 'pl', setLang: () => {} })
export const ThemeContext = createContext({ dark: false, setDark: () => {} })

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('uml_lang') || 'pl')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function setLang(l) {
    setLangState(l)
    localStorage.setItem('uml_lang', l)
  }
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function ThemeProvider({ children }) {
  const [dark, setDarkState] = useState(() => {
    const saved = localStorage.getItem('uml_theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('uml_theme', dark ? 'dark' : 'light')
  }, [dark])

  function setDark(v) { setDarkState(v) }
  return <ThemeContext.Provider value={{ dark, setDark }}>{children}</ThemeContext.Provider>
}

export function useLang() { return useContext(LangContext) }
export function useTheme() { return useContext(ThemeContext) }

// t(key) — returns translated string for current language
export function useT() {
  const { lang } = useLang()
  const strings = T[lang] || T.pl
  return (key, ...args) => {
    const val = strings[key] ?? T.pl[key] ?? key
    return typeof val === 'function' ? val(...args) : val
  }
}

// serviceLabel(svc) — returns the label for a service in the current language
export function useServiceLabel() {
  const { lang } = useLang()
  return (svc) => {
    if (!svc) return ''
    if (lang === 'en' && svc.labelEn) return svc.labelEn
    if (lang === 'uk' && svc.labelUk) return svc.labelUk
    return svc.label
  }
}

// dobHint(svc) — returns the date-of-birth hint for a service in the current language
export function useDobHint() {
  const { lang } = useLang()
  return (svc) => {
    if (!svc?.dobHint) return null
    if (lang === 'en') return svc.dobHint.en ?? svc.dobHint.pl
    if (lang === 'uk') return svc.dobHint.uk ?? svc.dobHint.pl
    return svc.dobHint.pl
  }
}

// pluralService(n) — correct noun form for service count per language
// PL/UK: 1 → singular, 2-4 (not 12-14) → plural, else → genitive plural
// EN: 1 → singular, else → plural
export function usePluralService() {
  const { lang } = useLang()
  const t = useT()
  return (n) => {
    if (lang === 'pl' || lang === 'uk') {
      const mod10  = n % 10
      const mod100 = n % 100
      if (n === 1) return t('serviceSingular')
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return t('servicePlural')
      return t('serviceGenPlural')
    }
    return n === 1 ? t('serviceSingular') : t('servicePlural')
  }
}
