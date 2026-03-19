import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useT, useLang, usePluralService, CAT_KEY } from '../../i18n'
import { getOfficeLocationRows } from '../../api/officeDirectory.js'
import { CATEGORY_META, serviceDisplayIcon } from '../../api/booking.js'
import { googleMapsUrl } from '../../utils/googleMaps.js'
import Icon from '../ui/Icon.jsx'

const ROWS = getOfficeLocationRows()

function serviceLabelRaw(svc, lang) {
  if (lang === 'en' && svc.labelEn) return svc.labelEn
  if (lang === 'uk' && svc.labelUk) return svc.labelUk
  return svc.label
}

/** Translated district / counter name for one service */
function districtForService(svc, lang) {
  if (!svc.officeLabel) return null
  if (lang === 'en' && svc.officeLabelEn) return svc.officeLabelEn
  if (lang === 'uk' && svc.officeLabelUk) return svc.officeLabelUk
  return svc.officeLabel
}

/** If every service at this address shares one non-empty officeLabel, show it once in the card header */
function uniformHeaderDistrict(services, lang) {
  if (!services.length) return null
  const keys = services.map((s) => s.officeLabel || '')
  const uniq = [...new Set(keys)]
  if (uniq.length !== 1 || !uniq[0]) return null
  return districtForService(services[0], lang)
}

function rowMatchesSearch(row, q, t, lang) {
  if (!q.trim()) return true
  const n = q.trim().toLowerCase()
  const parts = [row.address]
  for (const s of row.services) {
    parts.push(serviceLabelRaw(s, lang), s.label, s.labelEn, s.labelUk, s.officeLabel, s.officeLabelEn, s.officeLabelUk)
    const ck = CAT_KEY[s.category]
    parts.push(ck ? t(ck) : s.category)
  }
  return parts.filter(Boolean).join(' ').toLowerCase().includes(n)
}

function sortLocale(lang) {
  if (lang === 'en') return 'en'
  if (lang === 'uk') return 'uk'
  return 'pl'
}

function pickServiceLabel(svc, lang, uniformDistrict) {
  const name = serviceLabelRaw(svc, lang)
  const dist = !uniformDistrict && svc.officeLabel ? districtForService(svc, lang) : null
  const tail = dist ? ` — ${dist}` : ''
  return `${name}${tail}`
}

export default function OfficeGuideModal({ onClose }) {
  const t = useT()
  const { lang } = useLang()
  const plural = usePluralService()
  const modalRef = useRef(null)
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)

  const filtered = useMemo(
    () => ROWS.filter((row) => rowMatchesSearch(row, query, t, lang)),
    [query, t, lang],
  )

  useEffect(() => {
    const prev = document.activeElement
    const modal = modalRef.current
    const focusable = modal?.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])')
    if (focusable?.length) focusable[0].focus()

    function onKey(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [onClose])

  const loc = sortLocale(lang)

  function handlePickService(svc) {
    window.dispatchEvent(
      new CustomEvent('uml:pickServiceFromGuide', {
        detail: { branchId: svc.branchId, serviceId: svc.serviceId },
      }),
    )
    onClose()
  }

  return (
    <div
      className="fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('officesGuideDialogAria')}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'var(--modal-overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 20px) clamp(10px, 3vw, 16px)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        ref={modalRef}
        className="pop-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          borderRadius: 20,
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          width: '100%',
          maxWidth: 'min(680px, calc(100vw - 24px))',
          maxHeight: 'min(88vh, 900px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            padding: 'clamp(16px, 4vw, 24px) clamp(14px, 4vw, 24px) 12px',
            flexShrink: 0,
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 10 }}>
            <div style={{ minWidth: 0 }}>
              <h2
                id="office-guide-title"
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: 'var(--text)',
                  letterSpacing: '-0.02em',
                  marginBottom: 6,
                  lineHeight: 1.2,
                }}
              >
                {t('officesGuideTitle')}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 600, lineHeight: 1.45, margin: 0 }}>
                {t('officesGuideSub')}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('close')}
              style={{
                flexShrink: 0,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                color: 'var(--text-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="x" size={18} />
            </button>
          </div>
          <label htmlFor="office-guide-search" style={{ display: 'block', marginTop: 4 }}>
            <span className="sr-only">{t('officesGuideSearchAria')}</span>
            <div style={{ position: 'relative' }}>
              <Icon
                name="search"
                size={18}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-3)',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="office-guide-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('officesGuideSearch')}
                aria-labelledby="office-guide-title"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 14px 12px 42px',
                  fontSize: 15,
                  fontFamily: 'var(--font)',
                  fontWeight: 600,
                  border: '1.5px solid var(--border)',
                  borderRadius: 12,
                  background: 'var(--surface2)',
                  color: 'var(--text)',
                  outline: 'none',
                }}
              />
            </div>
          </label>
        </div>

        <div
          style={{
            overflowY: 'auto',
            padding: '12px clamp(14px, 4vw, 24px) clamp(20px, 4vw, 28px)',
            flex: 1,
            minHeight: 0,
          }}
        >
          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-3)', fontWeight: 600, fontSize: 14, margin: '24px 0' }}>
              {t('officesGuideNoResults')}
            </p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filtered.map((row) => {
                const open = openId === row.id
                const uniformDistrict = uniformHeaderDistrict(row.services, lang)
                const n = row.services.length
                const categories = [...new Set(row.services.map((s) => s.category))]
                categories.sort((a, b) => {
                  const ta = CAT_KEY[a] ? t(CAT_KEY[a]) : a
                  const tb = CAT_KEY[b] ? t(CAT_KEY[b]) : b
                  return ta.localeCompare(tb, loc)
                })

                return (
                  <li
                    key={row.id}
                    style={{
                      borderRadius: 14,
                      border: '1px solid var(--border)',
                      background: 'var(--surface2)',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : row.id)}
                      aria-expanded={open}
                      aria-controls={`office-guide-panel-${row.id}`}
                      id={`office-guide-trigger-${row.id}`}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '14px 16px',
                        border: 'none',
                        background: open ? 'var(--accent-light)' : 'transparent',
                        cursor: 'pointer',
                        fontFamily: 'var(--font)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                        minWidth: 0,
                      }}
                    >
                      <Icon name="map-pinned" size={22} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', lineHeight: 1.35 }}>
                          {row.address}
                        </div>
                        {uniformDistrict && (
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginTop: 4 }}>
                            {uniformDistrict}
                          </div>
                        )}
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-3)', marginTop: 6 }}>
                          {n} {plural(n)}
                        </div>
                      </div>
                      <Icon
                        name="chevron-down"
                        size={20}
                        style={{
                          color: 'var(--text-3)',
                          flexShrink: 0,
                          transform: open ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease',
                          marginTop: 4,
                        }}
                      />
                    </button>
                    {row.address && row.address !== '—' && (
                      <a
                        className="office-guide__maps-btn"
                        href={googleMapsUrl(row.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('officesGuideMapsAria', row.address)}
                      >
                        <span className="office-guide__maps-btn-main">
                          <Icon name="route" size={22} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          <span className="office-guide__maps-btn-textcol">
                            <span className="office-guide__maps-btn-title">{t('officesGuideMapsCta')}</span>
                            <span className="office-guide__maps-btn-sub">{row.address}</span>
                            <span className="office-guide__maps-btn-caption">{t('officesGuideMapsSub')}</span>
                          </span>
                        </span>
                        <span className="office-guide__maps-btn-end" aria-hidden="true">
                          <span className="office-guide__maps-btn-tabpill">{t('officesGuideMapsNewTab')}</span>
                          <Icon name="square-arrow-out-up-right" size={20} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                        </span>
                      </a>
                    )}
                    {open && (
                      <div
                        id={`office-guide-panel-${row.id}`}
                        role="region"
                        aria-labelledby={`office-guide-trigger-${row.id}`}
                        style={{ padding: '4px 14px 16px 16px', borderTop: '1px solid var(--border)' }}
                      >
                        {categories.map((cat) => {
                          const color = CATEGORY_META[cat]?.color || 'var(--accent)'
                          const catTitle = CAT_KEY[cat] ? t(CAT_KEY[cat]) : cat
                          const inCat = row.services.filter((s) => s.category === cat)
                          return (
                            <div key={cat} style={{ marginTop: 14 }}>
                              <div
                                style={{
                                  fontSize: 11,
                                  fontWeight: 800,
                                  letterSpacing: '0.06em',
                                  textTransform: 'uppercase',
                                  color,
                                  marginBottom: 8,
                                  borderLeft: `3px solid ${color}`,
                                  paddingLeft: 8,
                                }}
                              >
                                {catTitle}
                              </div>
                              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {inCat.map((svc) => (
                                  <li key={`${svc.branchId}-${svc.serviceId}`} style={{ listStyle: 'none' }}>
                                    <button
                                      type="button"
                                      className="office-guide__svc-btn"
                                      onClick={() => handlePickService(svc)}
                                      title={t('officesGuidePickServiceHint')}
                                      aria-label={`${t('officesGuidePickService')}: ${pickServiceLabel(svc, lang, uniformDistrict)}`}
                                    >
                                      <Icon
                                        name={serviceDisplayIcon(svc)}
                                        size={16}
                                        style={{ color, flexShrink: 0, marginTop: 2 }}
                                      />
                                      <span style={{ flex: 1, minWidth: 0 }}>
                                        {serviceLabelRaw(svc, lang)}
                                        {!uniformDistrict && svc.officeLabel && (
                                          <span style={{ color: 'var(--text-3)', fontWeight: 600 }}>
                                            {' — '}
                                            {districtForService(svc, lang)}
                                          </span>
                                        )}
                                      </span>
                                      <Icon
                                        name="chevron-right"
                                        size={18}
                                        style={{ color: 'var(--text-3)', flexShrink: 0, marginTop: 2 }}
                                        aria-hidden
                                      />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
