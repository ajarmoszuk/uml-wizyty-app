import React, { useState, useRef, useEffect } from 'react'
import { sendVerificationCode, takeAppointment } from '../../api/booking.js'
import { BackBtn, primaryBtn } from './StepDetails.jsx'
import { useT, useOfficeLabel } from '../../i18n'
import { googleMapsUrl } from '../../utils/googleMaps.js'
import Icon from '../ui/Icon.jsx'

export default function StepVerify({ booking, details, onSuccess, onBack }) {
  const t = useT()
  const officeLabel = useOfficeLabel()
  const [phase, setPhase] = useState('send') // send | code | booking
  const [code, setCode] = useState(['', '', '', ''])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  async function handleSend() {
    setLoading(true); setError(null)
    try {
      await sendVerificationCode({
        phone: details.phone,
        branchId: booking.service.branchId,
        serviceId: booking.service.serviceId,
        sedcoBranch: booking.service.sedcoBranch,
        sedcoService: booking.service.sedcoService,
      })
      setPhase('code')
      setCooldown(60)
      setTimeout(() => inputRefs[0].current?.focus(), 100)
    } catch {
      setError(t('sendError'))
    }
    setLoading(false)
  }

  function handleDigit(i, val) {
    const d = val.replace(/\D/g, '').slice(-1)
    const next = [...code]; next[i] = d; setCode(next)
    if (d && i < 3) inputRefs[i + 1].current?.focus()
  }

  function handleKey(i, e) {
    if (e.key === 'Backspace' && !code[i] && i > 0) inputRefs[i - 1].current?.focus()
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (text.length === 4) { setCode(text.split('')); inputRefs[3].current?.focus() }
  }

  async function handleBook() {
    const fullCode = code.join('')
    if (fullCode.length !== 4) { setError(t('codeError')); return }
    setLoading(true); setError(null); setPhase('booking')
    try {
      const ticket = await takeAppointment({
        sedcoBranch: booking.service.sedcoBranch,
        sedcoService: booking.service.sedcoService,
        branchId: booking.service.branchId,
        serviceId: booking.service.serviceId,
        appointmentDay: booking.date,
        appointmentTime: booking.slot.time + ':00',
        name: details.name,
        phone: details.phone,
        verificationCode: fullCode,
        dateOfBirth: details.dateOfBirth,
        email: details.email,
        notifyEmail: details.notifyEmail,
        notifySms: details.notifySms,
      })
      onSuccess(ticket)
    } catch(e) {
      setError(t('bookError') + e.message)
      setPhase('code')
    }
    setLoading(false)
  }

  return (
    <div className="fade-up card-padding" style={{ maxWidth: 480, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

      {booking.service?.address && (
        <div
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 20,
            fontSize: 13,
            color: 'var(--text-2)',
            lineHeight: 1.45,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
            {t('addressLabel')}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 12px', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, color: 'var(--text)', wordBreak: 'break-word' }}>
              {booking.service.officeLabel && `${officeLabel(booking.service)} · `}
              {booking.service.address}
            </span>
            <a
              className="maps-inline-link"
              href={googleMapsUrl(booking.service.address)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('officeLinkMaps')}: ${booking.service.address}`}
            >
              <Icon name="map-pinned" size={14} />
              {t('officeLinkMaps')}
            </a>
          </div>
        </div>
      )}

      {phase === 'send' && (
        <>
          <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.01em' }}>
            {t('verifyTitle')}
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 24 }}>
            {t('verifySub')}
          </p>

          <div style={{
            background: 'var(--accent-light)', border: '1.5px solid var(--accent)',
            borderRadius: 14, padding: '20px 24px', marginBottom: 28, textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              {t('yourNumber')}
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--text)', letterSpacing: '0.06em' }}>
              +48 {details.phone}
            </div>
          </div>

          {error && <ErrorBanner>{error}</ErrorBanner>}

          <div className="form-actions">
            <BackBtn onClick={onBack} />
            <button onClick={handleSend} disabled={loading} style={{ ...primaryBtn, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? <><Spinner /> {t('sending')}</> : <>{t('sendSms')} <Icon name="chevron-right" size={18} /></>}
            </button>
          </div>
        </>
      )}

      {(phase === 'code' || phase === 'booking') && (
        <>
          <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.01em' }}>
            {t('enterCode')}
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 28 }}>
            {t('codeSent', details.phone)}
          </p>

          <div role="group" aria-label={t('enterCode')} className="otp-row" onPaste={handlePaste}>
            {code.map((digit, i) => (
              <input key={i} ref={inputRefs[i]}
                aria-label={t('codeDigit', i)}
                value={digit}
                onChange={e => handleDigit(i, e.target.value)}
                onKeyDown={e => handleKey(i, e)}
                maxLength={1} inputMode="numeric" autoComplete="one-time-code"
                style={{
                  border: `2px solid ${digit ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 12,
                  background: digit ? 'var(--accent-light)' : 'var(--surface2)',
                  fontWeight: 900, fontFamily: 'var(--font)',
                  textAlign: 'center', outline: 'none',
                  color: 'var(--text)',
                  caretColor: 'var(--accent)',
                  transition: 'all var(--transition)',
                }}
              />
            ))}
          </div>

          <div role="status" aria-live="polite" style={{ textAlign: 'center', marginBottom: 24, fontSize: 14, color: 'var(--text-3)' }}>
            {cooldown > 0
              ? t('resendIn', cooldown)
              : <button onClick={handleSend} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                  {t('resend')}
                </button>
            }
          </div>

          {error && <ErrorBanner>{error}</ErrorBanner>}

          {phase === 'booking' && !error && (
            <div role="status" aria-live="polite" style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)', fontSize: 15, padding: '8px 0' }}>
              <Spinner /> {t('bookingInProgress')}
            </div>
          )}

          {phase === 'code' && (
            <div className="form-actions">
              <BackBtn onClick={onBack} />
              <button onClick={handleBook} disabled={loading || code.join('').length !== 4}
                style={{ ...primaryBtn, opacity: code.join('').length !== 4 ? 0.45 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {loading ? <><Spinner /> {t('wait')}</> : <>{t('bookBtn')} <Icon name="chevron-right" size={18} /></>}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function ErrorBanner({ children }) {
  return (
    <div role="alert" style={{
      background: 'var(--red-light)', border: '1.5px solid var(--red)',
      borderRadius: 10, padding: '12px 16px',
      fontSize: 15, color: 'var(--red)', fontWeight: 600, marginBottom: 16,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <Icon name="alert" size={18} style={{ flexShrink: 0 }} /> {children}
    </div>
  )
}

function Spinner() {
  return (
    <div style={{
      width: 16, height: 16, border: '2px solid currentColor',
      borderTopColor: 'transparent', borderRadius: '50%',
      animation: 'spin 0.7s linear infinite', display: 'inline-block', flexShrink: 0,
    }} />
  )
}
