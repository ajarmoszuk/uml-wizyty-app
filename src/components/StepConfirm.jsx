import React, { useRef, useEffect } from 'react'
import { useT } from '../i18n.jsx'

export default function StepConfirm({ booking, ticket, onReset }) {
  const t = useT()
  const lang = t('lang')
  const locale = lang === 'uk' ? 'uk-UA' : lang === 'en' ? 'en-GB' : 'pl-PL'
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const dateFormatted = new Date(booking.date + 'T12:00:00').toLocaleDateString(locale, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="fade-up" style={{ padding: '40px 28px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>

      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'var(--green-light)', border: '3px solid var(--green)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36, margin: '0 auto 20px',
        animation: 'popIn 0.4s ease both',
      }} aria-hidden="true">
        ✅
      </div>

      <h2 ref={headingRef} tabIndex={-1} style={{ fontSize: 26, fontWeight: 900, color: 'var(--green)', marginBottom: 8, letterSpacing: '-0.02em', outline: 'none' }}>
        {t('confirmedTitle')}
      </h2>
      <p style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: 32, lineHeight: 1.5 }}>
        {t('confirmedSub')}
      </p>

      <div style={{
        background: 'var(--surface2)',
        border: '1.5px solid var(--border)',
        borderRadius: 16, padding: '24px 28px',
        textAlign: 'left', marginBottom: 24,
      }}>
        {ticket?.TicketNumber && (
          <div style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
              {t('ticketNumber')}
            </div>
            <div style={{ fontSize: 38, fontWeight: 900, color: 'var(--accent)', letterSpacing: '0.08em' }}>
              {ticket.TicketNumber}
            </div>
          </div>
        )}

        <InfoRow label={t('dateLabel')}    value={ticket?.AppointmentDay || dateFormatted} />
        <InfoRow label={t('timeLabel')}    value={
          <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)' }}>
            {ticket?.AppointmentTime || booking.slot.time}
          </span>
        } />
        <InfoRow label={t('serviceLabel')} value={ticket?.Service?.Name || booking.service.label} />
        <InfoRow label={t('addressLabel')} value="ul. Smugowa 30/32, Łódź" last />
      </div>

      <div style={{
        background: 'var(--surface2)', border: '1.5px solid var(--border)',
        borderRadius: 12, padding: '14px 18px',
        fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6,
        textAlign: 'left', marginBottom: 28,
      }}>
        {t('reminder')}
      </div>

      <button onClick={onReset} style={{
        padding: '13px 28px',
        background: 'transparent',
        border: '1.5px solid var(--border)',
        borderRadius: 12,
        fontFamily: 'var(--font)',
        fontWeight: 700, fontSize: 15,
        color: 'var(--text-2)', cursor: 'pointer',
      }}>
        {t('bookAnother')}
      </button>
    </div>
  )
}

function InfoRow({ label, value, last }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      paddingBottom: last ? 0 : 14, marginBottom: last ? 0 : 14,
      borderBottom: last ? 'none' : '1px solid var(--border)',
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', textAlign: 'right', maxWidth: '60%' }}>
        {value}
      </span>
    </div>
  )
}
