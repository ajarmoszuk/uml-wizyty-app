import React, { useState, useEffect, useCallback } from 'react'
import { fetchRangeAvailability, fetchSlots, SERVICES, CATEGORY_META } from '../api/booking.js'
import { useT, usePluralService, useServiceLabel, useOfficeLabel, CAT_KEY } from '../i18n.jsx'

function toDateStr(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function formatDateLong(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })
}

const CATEGORIES = [...new Set(SERVICES.map(s => s.category))]

// ── Icons ────────────────────────────────────────────────────────────────────
function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="6.5" height="6.5" rx="1.5"/>
      <rect x="9.5" y="0" width="6.5" height="6.5" rx="1.5"/>
      <rect x="0" y="9.5" width="6.5" height="6.5" rx="1.5"/>
      <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1.5"/>
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="5" y="1.5" width="11" height="2" rx="1"/>
      <rect x="5" y="7" width="11" height="2" rx="1"/>
      <rect x="5" y="12.5" width="11" height="2" rx="1"/>
      <circle cx="1.5" cy="2.5" r="1.5"/>
      <circle cx="1.5" cy="8" r="1.5"/>
      <circle cx="1.5" cy="13.5" r="1.5"/>
    </svg>
  )
}

// ── View toggle ──────────────────────────────────────────────────────────────
function ViewToggle({ viewMode, onChange }) {
  const btnBase = (active) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32, borderRadius: 6, border: 'none',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? 'white' : 'var(--text-3)',
    cursor: 'pointer', transition: 'all var(--transition)',
    flexShrink: 0,
  })
  return (
    <div role="group" aria-label="View mode" style={{
      display: 'flex', background: 'var(--surface2)', border: '1px solid var(--border)',
      borderRadius: 8, padding: 2, gap: 2, flexShrink: 0,
    }}>
      <button onClick={() => onChange('grid')} aria-pressed={viewMode === 'grid'} aria-label="Grid view" title="Grid view" style={btnBase(viewMode === 'grid')}>
        <GridIcon />
      </button>
      <button onClick={() => onChange('list')} aria-pressed={viewMode === 'list'} aria-label="List view" title="List view" style={btnBase(viewMode === 'list')}>
        <ListIcon />
      </button>
    </div>
  )
}

// ── Booking rules panel ──────────────────────────────────────────────────────
function BookingRules() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const rules = [t('rule1'), t('rule2'), t('rule3'), t('rule4'), t('rule5')]
  return (
    <div style={{ marginTop: 28, border: '1.5px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 10, padding: '13px 16px',
          background: 'var(--surface2)', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font)', fontSize: 13, fontWeight: 700,
          color: 'var(--text-2)', textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span aria-hidden="true">📋</span> {t('rulesToggle')}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-3)', transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none' }} aria-hidden="true">▼</span>
      </button>
      {open && (
        <div style={{ padding: '16px 18px 18px', background: 'var(--surface)' }}>
          <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>{t('rulesTitle')}</p>
          <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rules.map((rule, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{rule}</li>
            ))}
          </ol>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 7, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <a
              href="https://bip.uml.lodz.pl/inne-informacje/ochrona-danych-osobowych/"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <span aria-hidden="true">🔒</span> {t('rule6')}
            </a>
            <a
              href="https://bip.uml.lodz.pl/inne-informacje/polityka-prywatnosci/"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <span aria-hidden="true">📄</span> {t('rule7')}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function StepSlots({ onSelect }) {
  const t = useT()
  const pluralService = usePluralService()
  const svcLabel = useServiceLabel()
  const officeLabel = useOfficeLabel()
  const today = new Date(); today.setHours(0,0,0,0)

  const [viewMode, setViewMode] = useState(() => localStorage.getItem('uml_view') || 'grid')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [pendingGroupServices, setPendingGroupServices] = useState(null) // office-picker state

  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [availability, setAvailability] = useState({})
  const [loadingCal, setLoadingCal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  function changeViewMode(m) {
    setViewMode(m)
    localStorage.setItem('uml_view', m)
  }

  const loadMonth = useCallback(async (month, service) => {
    setLoadingCal(true)
    const start = new Date(Math.max(today.getTime(), month.getTime()))
    const end = new Date(month.getFullYear(), month.getMonth() + 1, 0)
    try {
      const avail = await fetchRangeAvailability(service.branchId, service.serviceId, start, end)
      setAvailability(prev => ({ ...prev, ...avail }))
    } catch(e) { console.error(e) }
    setLoadingCal(false)
  }, [])

  useEffect(() => {
    if (selectedService) loadMonth(viewMonth, selectedService)
  }, [viewMonth, selectedService])

  useEffect(() => {
    if (!selectedDate || !selectedService) return
    setLoadingSlots(true); setSlots([])
    fetchSlots(selectedService.branchId, selectedService.serviceId, selectedDate)
      .then(setSlots).catch(console.error).finally(() => setLoadingSlots(false))
  }, [selectedDate, selectedService])

  function handleServiceSelect(svc) {
    setSelectedService(svc)
    setSelectedDate(null)
    setSlots([])
    setAvailability({})
  }

  function handleChangeService() {
    setSelectedService(null)
    setSelectedCategory(null)
    setSelectedDate(null)
    setSlots([])
    setAvailability({})
    setPendingGroupServices(null)
  }

  function handleServiceCardClick(svc) {
    if (svc.serviceGroup) {
      const offices = SERVICES.filter(s => s.category === selectedCategory && s.serviceGroup === svc.serviceGroup)
      if (offices.length > 1) {
        setPendingGroupServices(offices)
        return
      }
    }
    handleServiceSelect(svc)
  }

  // ── OFFICE PICKER ───────────────────────────────────────────────────────
  if (!selectedService && pendingGroupServices) {
    const groupMeta = CATEGORY_META[pendingGroupServices[0].category] || { icon: '📋', color: '#2563eb' }
    return (
      <div className="fade-up" style={{ padding: '32px 28px' }}>
        <button onClick={() => setPendingGroupServices(null)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 20px',
          fontSize: 13, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          ← {t('changeService')}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 26 }} aria-hidden="true">{pendingGroupServices[0].icon}</span>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em', lineHeight: 1.2, margin: 0 }}>
            {svcLabel(pendingGroupServices[0])}
          </h2>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.5 }}>
          {t('chooseOffice')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pendingGroupServices.map((svc, i) => (
            <button key={i}
              onClick={() => { handleServiceSelect(svc); setPendingGroupServices(null) }}
              style={{
                padding: '18px 20px',
                background: 'var(--surface)',
                border: `1.5px solid var(--border)`,
                borderLeft: `4px solid ${groupMeta.color}`,
                borderRadius: 14,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--font)',
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'all var(--transition)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${groupMeta.color}0d`
                e.currentTarget.style.borderColor = `${groupMeta.color}80`
                e.currentTarget.style.borderLeftColor = groupMeta.color
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--surface)'
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.borderLeftColor = groupMeta.color
              }}
              aria-label={`${officeLabel(svc)}, ${svc.address}`}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }} aria-hidden="true">📍</span>
              <span>
                <span style={{ display: 'block', fontSize: 16, fontWeight: 800, color: 'var(--text)', lineHeight: 1.3 }}>
                  {officeLabel(svc)}
                </span>
                <span style={{ display: 'block', fontSize: 13, color: 'var(--text-2)', fontWeight: 500, marginTop: 3 }}>
                  {svc.address}
                </span>
              </span>
              <span style={{ fontSize: 22, color: 'var(--text-3)', marginLeft: 'auto', flexShrink: 0 }} aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── SERVICE PICKER ──────────────────────────────────────────────────────
  if (!selectedService) {
    // Deduplicate services by serviceGroup — show one card per logical service type
    const uniqueServicesInCategory = selectedCategory
      ? (() => {
          const seen = new Set()
          return SERVICES
            .filter(s => s.category === selectedCategory)
            .filter(s => {
              const key = s.serviceGroup || s.serviceId
              if (seen.has(key)) return false
              seen.add(key)
              return true
            })
        })()
      : []
    const servicesInCategory = uniqueServicesInCategory
    const selectedCatMeta = selectedCategory ? CATEGORY_META[selectedCategory] : null
    const selectedCatLabel = selectedCategory ? t(CAT_KEY[selectedCategory] || 'cat_Pojazdy') : null
    const isGrid = viewMode === 'grid'

    return (
      <div className="fade-up" style={{ padding: '32px 28px' }}>

        {/* Heading row with toggle */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
          <h2 style={{ fontSize: 21, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            {selectedCategory ? selectedCatLabel : t('whatNeeded')}
          </h2>
          <ViewToggle viewMode={viewMode} onChange={changeViewMode} />
        </div>
        <p style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.5 }}>
          {selectedCategory ? t('chooseService') : t('chooseCategory')}
        </p>

        {!selectedCategory ? (
          <>
          {isGrid ? (
            // ── CATEGORY GRID ─────────────────────────────────────────────
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {CATEGORIES.map(cat => {
                const meta = CATEGORY_META[cat] || { icon: '📋', color: '#374151' }
                const seen = new Set()
                const count = SERVICES.filter(s => s.category === cat).filter(s => {
                  const key = s.serviceGroup || s.serviceId
                  if (seen.has(key)) return false
                  seen.add(key)
                  return true
                }).length
                const catLabel = t(CAT_KEY[cat] || cat)
                return (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                    padding: '16px 10px 14px',
                    background: 'var(--surface)',
                    border: `1.5px solid var(--border)`,
                    borderTop: `4px solid ${meta.color}`,
                    borderRadius: 14,
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontFamily: 'var(--font)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'all var(--transition)',
                    minHeight: 110,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${meta.color}0d`
                    e.currentTarget.style.borderColor = `${meta.color}70`
                    e.currentTarget.style.borderTopColor = meta.color
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 4px 16px ${meta.color}20`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--surface)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.borderTopColor = meta.color
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}>
                    <span style={{ fontSize: 36, lineHeight: 1 }} aria-hidden="true">{meta.icon}</span>
                    <span>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: 16, fontWeight: 800, color: 'var(--text)', lineHeight: 1.3 }}>{catLabel}</span>
                      <span style={{ display: 'block', fontSize: 13, color: 'var(--text-2)', fontWeight: 600, marginTop: 3 }}>
                        {count} {pluralService(count)}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            // ── CATEGORY LIST ─────────────────────────────────────────────
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CATEGORIES.map(cat => {
                const meta = CATEGORY_META[cat] || { icon: '📋', color: '#374151' }
                const seenL = new Set()
                const count = SERVICES.filter(s => s.category === cat).filter(s => {
                  const key = s.serviceGroup || s.serviceId
                  if (seenL.has(key)) return false
                  seenL.add(key)
                  return true
                }).length
                const catLabel = t(CAT_KEY[cat] || cat)
                return (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                    padding: '16px 18px',
                    background: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    borderLeft: `4px solid ${meta.color}`,
                    borderRadius: 14,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font)',
                    display: 'flex', alignItems: 'center', gap: 14,
                    transition: 'all var(--transition)',
                    minHeight: 68,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${meta.color}0d`
                    e.currentTarget.style.borderColor = `${meta.color}80`
                    e.currentTarget.style.borderLeftColor = meta.color
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--surface)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.borderLeftColor = meta.color
                  }}>
                    <span style={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }} aria-hidden="true">{meta.icon}</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: 'block', fontSize: 16, fontWeight: 800, color: 'var(--text)', lineHeight: 1.3 }}>{catLabel}</span>
                      <span style={{ display: 'block', fontSize: 13, color: 'var(--text-3)', fontWeight: 600, marginTop: 2 }}>
                        {count} {pluralService(count)}
                      </span>
                    </span>
                    <span style={{ fontSize: 22, color: 'var(--text-3)', flexShrink: 0, lineHeight: 1 }} aria-hidden="true">›</span>
                  </button>
                )
              })}
            </div>
          )}
          <BookingRules />
          </>
        ) : (
          <>
            {/* Back to categories */}
            <button onClick={() => setSelectedCategory(null)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 16px',
              fontSize: 13, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font)',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {t('changeCategory')}
            </button>

            {isGrid ? (
              // ── SERVICE GRID ───────────────────────────────────────────
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {servicesInCategory.map((svc, i) => {
                  const meta = selectedCatMeta || { color: '#2563eb' }
                  const hasMultipleOffices = svc.serviceGroup &&
                    SERVICES.filter(s => s.category === selectedCategory && s.serviceGroup === svc.serviceGroup).length > 1
                  return (
                    <button key={i} onClick={() => handleServiceCardClick(svc)} style={{
                      padding: '18px 14px 16px',
                      background: 'var(--surface)',
                      border: `1.5px solid var(--border)`,
                      borderTop: `3px solid ${meta.color}`,
                      borderRadius: 12,
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontFamily: 'var(--font)',
                      fontSize: 15,
                      fontWeight: 700,
                      color: 'var(--text)',
                      lineHeight: 1.4,
                      transition: 'all var(--transition)',
                      minHeight: 110,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${meta.color}0d`
                      e.currentTarget.style.borderColor = `${meta.color}70`
                      e.currentTarget.style.borderTopColor = meta.color
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--surface)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.borderTopColor = meta.color
                      e.currentTarget.style.transform = 'none'
                    }}>
                      <span style={{ fontSize: 30, lineHeight: 1 }} aria-hidden="true">{svc.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35 }}>{svcLabel(svc)}</span>
                      {hasMultipleOffices && (() => {
                        const cnt = SERVICES.filter(s => s.category === selectedCategory && s.serviceGroup === svc.serviceGroup).length
                        return (
                          <span style={{ fontSize: 11, color: meta.color, fontWeight: 700, background: `${meta.color}18`, borderRadius: 6, padding: '2px 7px' }}>
                            📍 {t('officesBadge', cnt)}
                          </span>
                        )
                      })()}
                    </button>
                  )
                })}
              </div>
            ) : (
              // ── SERVICE LIST ───────────────────────────────────────────
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {servicesInCategory.map((svc, i) => {
                  const meta = selectedCatMeta || { color: '#2563eb' }
                  const officeCount = svc.serviceGroup
                    ? SERVICES.filter(s => s.category === selectedCategory && s.serviceGroup === svc.serviceGroup).length
                    : 0
                  return (
                    <button key={i} onClick={() => handleServiceCardClick(svc)} style={{
                      padding: '15px 18px',
                      background: 'var(--surface)',
                      border: '1.5px solid var(--border)',
                      borderLeft: `4px solid ${meta.color}40`,
                      borderRadius: 12,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'var(--font)',
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--text)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                      minHeight: 64, lineHeight: 1.4,
                      transition: 'all var(--transition)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${meta.color}80`
                      e.currentTarget.style.borderLeftColor = meta.color
                      e.currentTarget.style.background = `${meta.color}0d`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.borderLeftColor = `${meta.color}40`
                      e.currentTarget.style.background = 'var(--surface)'
                    }}>
                      <span style={{ fontSize: 22, flexShrink: 0 }} aria-hidden="true">{svc.icon}</span>
                      <span style={{ flex: 1 }}>
                        {svcLabel(svc)}
                        {officeCount > 1 && (
                          <span style={{ display: 'block', fontSize: 12, color: 'var(--text-2)', fontWeight: 600, marginTop: 2 }}>
                            📍 {t('officesBadge', officeCount)}
                          </span>
                        )}
                      </span>
                      <span style={{ fontSize: 22, color: 'var(--text-3)', flexShrink: 0 }} aria-hidden="true">›</span>
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  // ── CALENDAR ────────────────────────────────────────────────────────────
  const meta = CATEGORY_META[selectedService.category] || { icon: '📋', color: '#2563eb' }
  const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1)
  const startPad = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate()
  const cells = [...Array(startPad).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1))]
  const canPrevMonth = viewMonth > new Date(today.getFullYear(), today.getMonth(), 1)

  return (
    <div className="fade-up" style={{ padding: '32px 28px' }}>

      {/* Selected service chip */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: `${meta.color}12`,
        border: `1.5px solid ${meta.color}40`,
        borderRadius: 12, padding: '10px 14px', marginBottom: 24, gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
            <span aria-hidden="true">{meta.icon}</span> {t(CAT_KEY[selectedService.category] || selectedService.category)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }} aria-hidden="true">{selectedService.icon}</span>
            <div>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{svcLabel(selectedService)}</span>
              {selectedService.address && (
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span aria-hidden="true">📍</span>
                  {selectedService.officeLabel && (
                    <span style={{ fontWeight: 700 }}>{officeLabel(selectedService)} · </span>
                  )}
                  {selectedService.address}
                </div>
              )}
            </div>
          </div>
        </div>
        <button onClick={handleChangeService} style={{
          background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
          fontSize: 12, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'var(--font)',
          padding: '4px 8px', borderRadius: 6, whiteSpace: 'nowrap',
        }}>
          {t('changeService')}
        </button>
      </div>

      <h2 style={{ fontSize: 21, fontWeight: 800, color: 'var(--text)', marginBottom: 20, letterSpacing: '-0.01em' }}>
        {t('whenCome')}
      </h2>

      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <NavBtn
          onClick={() => setViewMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
          disabled={!canPrevMonth}
          ariaLabel={t('prevMonthLabel')}>
          {t('prevMonth')}
        </NavBtn>
        <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }} aria-live="polite" aria-atomic="true">
          {t('months')[viewMonth.getMonth()]} {viewMonth.getFullYear()}
          {loadingCal && <Spinner size={14} />}
        </div>
        <NavBtn
          onClick={() => setViewMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
          ariaLabel={t('nextMonthLabel')}>
          {t('nextMonth')}
        </NavBtn>
      </div>

      {/* Day headers */}
      <div role="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
        {t('days').map(d => (
          <div key={d} role="columnheader" aria-label={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 800, color: 'var(--text-3)', padding: '4px 0', letterSpacing: '0.04em' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Legend */}
      {!loadingCal && Object.keys(availability).length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 13, color: 'var(--text-3)', fontWeight: 600 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--accent-light)', border: '1px solid var(--accent)', flexShrink: 0 }} aria-hidden="true" />
          {t('calendarLegend')}
        </div>
      )}

      {/* Calendar grid */}
      <div role="grid" aria-label={`${t('months')[viewMonth.getMonth()]} ${viewMonth.getFullYear()}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 28 }}>
        {cells.map((date, i) => {
          if (!date) return <div key={i} role="gridcell" />
          const ds = toDateStr(date)
          const isPast = date < today
          const isWeekend = date.getDay() === 0 || date.getDay() === 6
          const avail = availability[ds]
          const isSelected = selectedDate === ds
          const hasSlots = avail > 0
          const disabled = isPast || isWeekend || avail === 0
          const monthName = t('months')[date.getMonth()]
          const dayAriaLabel = isSelected
            ? `${date.getDate()} ${monthName} — ${t('dayAvail', avail)}, ${t('changeService')}`
            : hasSlots
            ? `${date.getDate()} ${monthName} — ${t('dayAvail', avail)}`
            : `${date.getDate()} ${monthName} — ${t('dayNone')}`

          return (
            <button key={i}
              role="gridcell"
              disabled={disabled}
              aria-label={dayAriaLabel}
              aria-pressed={isSelected}
              aria-disabled={disabled}
              onClick={() => setSelectedDate(ds)}
              style={{
                aspectRatio: '1',
                border: 'none',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: isSelected ? 900 : hasSlots ? 700 : 400,
                fontFamily: 'var(--font)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: disabled ? 'default' : 'pointer',
                transition: 'all var(--transition)',
                background: isSelected
                  ? 'var(--accent)'
                  : hasSlots ? 'var(--accent-light)' : 'transparent',
                color: isSelected ? 'white'
                  : hasSlots ? 'var(--accent)'
                  : 'var(--text-3)',
                opacity: (isPast || isWeekend) ? 0.25 : 1,
                outline: 'none',
              }}>
              {date.getDate()}
              {hasSlots && !isSelected && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', marginTop: 2, opacity: 0.6 }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Time slots */}
      <div role="region" aria-live="polite" aria-atomic="false" aria-label={t('availableHours')}>
        {selectedDate && (
          <div className="fade-up" style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
            <h2 style={{ fontSize: 21, fontWeight: 800, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.01em' }}>
              {t('availableHours')} {t('on')} <span style={{ color: 'var(--accent)', textTransform: 'lowercase' }}>{formatDateLong(selectedDate)}</span>
            </h2>

            {loadingSlots && (
              <div role="status" style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--text-2)', fontSize: 15, padding: '8px 0' }}>
                <Spinner size={18} /> {t('checkingSlots')}
              </div>
            )}

            {!loadingSlots && slots.length === 0 && (
              <div style={{
                background: 'var(--surface2)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '16px 20px',
                fontSize: 15, color: 'var(--text-2)', fontWeight: 600,
              }}>
                {t('noSlots')}
              </div>
            )}

            {!loadingSlots && slots.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {slots.map((s, i) => (
                  <button key={i}
                    className="pop-in"
                    aria-label={`${s.time} — ${s.slots === 1 ? t('slot1') : t('slotsN', s.slots)}`}
                    style={{
                      animationDelay: `${i * 25}ms`,
                      padding: '14px 22px',
                      background: 'var(--surface)',
                      border: '2px solid var(--border)',
                      borderRadius: 12,
                      cursor: 'pointer',
                      transition: 'all var(--transition)',
                      fontFamily: 'var(--font)',
                      textAlign: 'center',
                      minWidth: 90,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.background = 'var(--accent-light)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.background = 'var(--surface)'
                    }}
                    onClick={() => onSelect({ service: selectedService, date: selectedDate, slot: s })}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)' }}>{s.time}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2, fontWeight: 600 }}>
                      {s.slots === 1 ? t('slot1') : t('slotsN', s.slots)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!selectedDate && !loadingCal && (
          <div style={{ textAlign: 'center', padding: '8px 0', fontSize: 15, color: 'var(--text-3)' }}>
            {t('clickHint')}
          </div>
        )}
      </div>
    </div>
  )
}

function NavBtn({ children, onClick, disabled, ariaLabel }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={ariaLabel} style={{
      background: 'none', border: 'none', cursor: disabled ? 'default' : 'pointer',
      fontSize: 14, fontWeight: 700, color: disabled ? 'var(--text-3)' : 'var(--accent)',
      fontFamily: 'var(--font)', padding: '6px 10px', borderRadius: 6, minHeight: 40,
      opacity: disabled ? 0.4 : 1, transition: 'opacity 0.2s',
    }}>
      {children}
    </button>
  )
}

function Spinner({ size = 16 }) {
  return (
    <div style={{
      width: size, height: size,
      border: `2px solid var(--border)`,
      borderTopColor: 'var(--accent)',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
      flexShrink: 0,
    }} />
  )
}
