import { SERVICES } from './booking.js'

/**
 * Group services by address only (one card per building).
 * District (officeLabel) is shown per service in the UI when it varies.
 */
export function getOfficeLocationRows() {
  const m = new Map()
  for (const svc of SERVICES) {
    const addr = svc.address || '—'
    if (!m.has(addr)) {
      m.set(addr, {
        id: addr,
        address: addr,
        services: [],
      })
    }
    m.get(addr).services.push(svc)
  }

  const rows = []
  for (const entry of m.values()) {
    const seen = new Set()
    const deduped = []
    for (const s of entry.services) {
      const sid = `${s.branchId}-${s.serviceId}`
      if (seen.has(sid)) continue
      seen.add(sid)
      deduped.push(s)
    }
    deduped.sort((a, b) => a.label.localeCompare(b.label, 'pl'))
    rows.push({ ...entry, services: deduped })
  }

  rows.sort((a, b) => a.address.localeCompare(b.address, 'pl'))
  return rows
}
