import React, { useState } from 'react'
import { useT, useDobHint } from '../i18n.jsx'

const STORAGE_KEY = 'uml_user_data'
function loadSaved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}

function formatDateLong(dateStr, lang) {
  const d = new Date(dateStr + 'T12:00:00')
  const locale = lang === 'uk' ? 'uk-UA' : lang === 'en' ? 'en-GB' : 'pl-PL'
  return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })
}

function formatDob(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 4) return digits
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`
}

function displayPhone(digits) {
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
}

export default function StepDetails({ booking, onNext, onBack }) {
  const t = useT()
  const dobHint = useDobHint()
  const lang = t('lang')
  const saved = loadSaved()
  const [form, setForm] = useState({
    name: saved.name || '',
    phone: saved.phone || '',
    dateOfBirth: saved.dateOfBirth || '',
    email: saved.email || '',
    notificationType: saved.notificationType || 'email',
  })
  const [errors, setErrors] = useState({})
  const [saveData, setSaveData] = useState(true)

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: null }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = t('nameError')
    if (!/^\d{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = t('phoneError')
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.dateOfBirth)) e.dateOfBirth = t('dobError')
    if (!form.email.includes('@')) e.email = t('emailError')
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    if (saveData) localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    onNext(form)
  }

  const phoneDigits = form.phone.replace(/\D/g, '')

  return (
    <div className="fade-up" style={{ padding: '32px 28px' }}>

      {/* Booking summary */}
      <div style={{
        background: 'var(--accent-light)',
        border: '1.5px solid var(--accent)',
        borderRadius: 14, padding: '14px 18px',
        marginBottom: 32,
        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
      }}>
        <div style={{ fontSize: 32, lineHeight: 1 }} aria-hidden="true">📅</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('yourSlot')}</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)' }}>
            {formatDateLong(booking.date, lang)}, <span style={{ color: 'var(--accent)' }}>{booking.slot.time}</span>
          </div>
          {booking.service?.label && (
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 3, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{booking.service.label}</div>
          )}
        </div>
      </div>

      <h2 style={{ fontSize: 21, fontWeight: 900, marginBottom: 6, letterSpacing: '-0.02em' }}>{t('enterDetails')}</h2>
      <p style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: lang === 'pl' ? 28 : 16, lineHeight: 1.5 }}>
        {t('detailsSub')}
      </p>

      {lang !== 'pl' && (
        <div style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          background: 'var(--orange-light)', border: '1.5px solid var(--orange)',
          borderRadius: 12, padding: '12px 14px', marginBottom: 20,
        }}>
          <span style={{ fontSize: 20, lineHeight: 1.3, flexShrink: 0 }} aria-hidden="true">🗣️</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--orange)', marginBottom: 3 }}>
              {t('langWarning')}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
              {t('langWarningSub')}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Full name */}
        <Field id="field-name" label={t('nameLabel')} hint={t('nameHint')} error={errors.name}>
          <input
            id="field-name"
            style={inputStyle(!!errors.name)}
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Anna Kowalska"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'field-name-msg' : 'field-name-hint'}
          />
        </Field>

        {/* Phone */}
        <Field id="field-phone" label={t('phoneLabel')} hint={t('phoneHint')} error={errors.phone}
          badge={phoneDigits.length > 0 ? `${phoneDigits.length}/9` : null}
          badgeOk={phoneDigits.length === 9}>
          <input
            id="field-phone"
            style={inputStyle(!!errors.phone)}
            value={displayPhone(phoneDigits)}
            onChange={e => {
              const digits = e.target.value.replace(/\D/g, '').slice(0, 9)
              set('phone', digits)
            }}
            placeholder="600 123 456"
            inputMode="numeric"
            autoComplete="tel-national"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'field-phone-msg' : 'field-phone-hint'}
          />
        </Field>

        {/* Date of birth */}
        <Field id="field-dob" label={t('dobLabel')} hint={dobHint(booking.service) || t('dobHintDefault')} error={errors.dateOfBirth}>
          <input
            id="field-dob"
            style={inputStyle(!!errors.dateOfBirth)}
            value={form.dateOfBirth}
            onChange={e => set('dateOfBirth', formatDob(e.target.value))}
            placeholder="1985-03-22"
            inputMode="numeric"
            maxLength={10}
            aria-required="true"
            aria-invalid={!!errors.dateOfBirth}
            aria-describedby={errors.dateOfBirth ? 'field-dob-msg' : 'field-dob-hint'}
          />
        </Field>

        {/* Email */}
        <Field id="field-email" label={t('emailLabel')} hint={t('emailHint')} error={errors.email}>
          <input
            id="field-email"
            style={inputStyle(!!errors.email)}
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="anna@email.com"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'field-email-msg' : 'field-email-hint'}
          />
        </Field>

        {/* Notification type */}
        <Field id="field-notif" label={t('notifLabel')}>
          <div role="group" aria-label={t('notifLabel')} style={{ display: 'flex', gap: 8 }}>
            {[{ val: 'email', label: '📧 E-mail' }, { val: 'sms', label: '📱 SMS' }].map(opt => (
              <button key={opt.val} onClick={() => set('notificationType', opt.val)}
                aria-pressed={form.notificationType === opt.val}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: `2px solid ${form.notificationType === opt.val ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 10,
                  background: form.notificationType === opt.val ? 'var(--accent-light)' : 'var(--surface2)',
                  color: form.notificationType === opt.val ? 'var(--accent)' : 'var(--text-2)',
                  fontFamily: 'var(--font)',
                  fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', transition: 'all var(--transition)',
                }}>
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        {/* Remember me */}
        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', fontSize: 14, color: 'var(--text-2)', userSelect: 'none', lineHeight: 1.4 }}>
          <input type="checkbox" checked={saveData} onChange={e => setSaveData(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: 'var(--accent)', cursor: 'pointer', marginTop: 1, flexShrink: 0 }} />
          {t('saveData')}
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        <BackBtn onClick={onBack} label={t('back')} />
        <button onClick={handleSubmit} style={primaryBtn}>
          {t('nextBtn')}
        </button>
      </div>
    </div>
  )
}

function Field({ id, label, hint, error, badge, badgeOk, children }) {
  const hintId = `${id}-hint`
  const msgId = `${id}-msg`
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <label htmlFor={id} style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>
          {label}
        </label>
        {badge && (
          <span aria-hidden="true" style={{ fontSize: 13, fontWeight: 700, color: badgeOk ? 'var(--green)' : 'var(--text-3)', transition: 'color 0.2s' }}>
            {badge}
          </span>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} style={{ fontWeight: 500, color: 'var(--text-3)', marginBottom: 6, fontSize: 13 }}>{hint}</p>
      )}
      {error && (
        <p id={msgId} role="alert" style={{ fontWeight: 600, color: 'var(--red)', marginBottom: 6, fontSize: 13 }}>⚠ {error}</p>
      )}
      {children}
    </div>
  )
}

const inputStyle = (hasError) => ({
  width: '100%',
  padding: '13px 16px',
  fontSize: 16,
  fontFamily: 'var(--font)',
  fontWeight: 600,
  background: hasError ? 'var(--red-light)' : 'var(--surface2)',
  border: `1.5px solid ${hasError ? 'var(--red)' : 'var(--border)'}`,
  borderRadius: 10,
  color: 'var(--text)',
  outline: 'none',
  transition: 'border-color var(--transition)',
})

export const primaryBtn = {
  flex: 1,
  padding: '15px 24px',
  background: 'var(--accent)',
  color: 'white',
  border: 'none',
  borderRadius: 12,
  fontFamily: 'var(--font)',
  fontWeight: 900,
  fontSize: 16,
  cursor: 'pointer',
  letterSpacing: '-0.01em',
  transition: 'background var(--transition)',
}

export function BackBtn({ onClick, label }) {
  const t = useT()
  return (
    <button onClick={onClick} style={{
      padding: '15px 20px',
      background: 'transparent',
      color: 'var(--text-2)',
      border: '1.5px solid var(--border)',
      borderRadius: 12,
      fontFamily: 'var(--font)',
      fontWeight: 700,
      fontSize: 15,
      cursor: 'pointer',
    }}>
      {label || t('back')}
    </button>
  )
}
