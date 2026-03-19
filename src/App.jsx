import React, { useState, useRef, useEffect } from 'react'
import StepSlots from './components/StepSlots.jsx'
import StepDetails from './components/StepDetails.jsx'
import StepVerify from './components/StepVerify.jsx'
import StepConfirm from './components/StepConfirm.jsx'
import TopBar from './components/TopBar.jsx'
import LodzCOA from './components/LodzCOA.jsx'
import { useT } from './i18n.jsx'

function useSystemBanners() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [offlineDismissed, setOfflineDismissed] = useState(false)
  const [maintenanceDismissed, setMaintenanceDismissed] = useState(false)
  const [connectionReset, setConnectionReset] = useState(false)
  const [connectionResetDismissed, setConnectionResetDismissed] = useState(false)

  useEffect(() => {
    const goOffline = () => { setIsOffline(true); setOfflineDismissed(false) }
    const goOnline  = () => setIsOffline(false)
    // PR_CONNECT_RESET_ERROR / ERR_CONNECTION_RESET → server maintenance
    const onReset = () => { setConnectionReset(true); setConnectionResetDismissed(false) }
    window.addEventListener('offline', goOffline)
    window.addEventListener('online',  goOnline)
    window.addEventListener('uml:connectionreset', onReset)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online',  goOnline)
      window.removeEventListener('uml:connectionreset', onReset)
    }
  }, [])

  const hour = new Date().getHours()
  const isTimeWindow = hour >= 0 && hour < 3
  const isMaintenance = isTimeWindow || connectionReset

  return {
    showOffline:           isOffline && !offlineDismissed,
    showMaintenance:       !isOffline && isMaintenance && !maintenanceDismissed,
    isConnectionReset:     connectionReset && !isTimeWindow, // flag to show specific message
    dismissOffline:        () => setOfflineDismissed(true),
    dismissMaintenance:    () => { setMaintenanceDismissed(true); setConnectionResetDismissed(true) },
  }
}

export default function App() {
  const t = useT()
  const [step, setStep] = useState(0)
  const cardRef = useRef(null)
  const banners = useSystemBanners()

  useEffect(() => {
    cardRef.current?.focus()
    const stepTitles = [t('step0'), t('step1'), t('step2'), t('stepConfirmTitle')]
    document.title = `${stepTitles[step] || t('bookTitle')} — UML Wizyty`
  }, [step])
  const [booking, setBooking] = useState(null)
  const [details, setDetails] = useState(null)
  const [ticket, setTicket] = useState(null)

  const STEPS = [
    { icon: '📅', labelKey: 'step0' },
    { icon: '👤', labelKey: 'step1' },
    { icon: '📱', labelKey: 'step2' },
  ]

  function reset() {
    setStep(0); setBooking(null); setDetails(null); setTicket(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '24px 16px 64px' }}>
      <a href="#main-content" className="skip-link">{t('skipToMain')}</a>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        <TopBar />

        {/* System banners */}
        {banners.showOffline && (
          <SystemBanner icon="📡" color="var(--red)" bg="var(--red-light)" onDismiss={banners.dismissOffline}>
            {t('bannerOffline')}
          </SystemBanner>
        )}
        {banners.showMaintenance && (
          <SystemBanner icon="🔧" color="var(--orange)" bg="var(--orange-light)" onDismiss={banners.dismissMaintenance}>
            {banners.isConnectionReset ? t('bannerConnectionReset') : t('bannerMaintenance')}
          </SystemBanner>
        )}

        {/* Header */}
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', marginBottom: 10, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.22))' }}>
            <LodzCOA size={44} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
            &lsquo;{t('city')}&rsquo;
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {t('bookTitle')}
          </h1>
        </div>

        {/* Progress steps */}
        {step < 3 && (
          <div style={{ marginBottom: 28 }}>
            {/* Step counter */}
            <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {t('stepCount', step + 1, 3)}
            </div>

            {/* Step dots */}
            <ol aria-label={t('stepCount', step + 1, 3)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, listStyle: 'none', padding: 0 }}>
              {STEPS.map((s, i) => {
                const done = i < step
                const active = i === step
                return (
                  <React.Fragment key={i}>
                    <li aria-current={active ? 'step' : undefined} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transition: 'opacity 0.3s', opacity: (!active && !done) ? 0.3 : 1 }}>
                      <div style={{
                        width: active ? 48 : 40, height: active ? 48 : 40,
                        borderRadius: '50%',
                        background: active ? 'var(--accent)' : done ? 'var(--green)' : 'var(--surface2)',
                        border: `2.5px solid ${active ? 'var(--accent)' : done ? 'var(--green)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: done ? 16 : active ? 20 : 17,
                        color: (active || done) ? 'white' : 'var(--text-3)',
                        fontWeight: 900,
                        transition: 'all 0.3s',
                        boxShadow: active ? '0 4px 14px color-mix(in srgb, var(--accent) 35%, transparent)' : 'none',
                      }} aria-hidden="true">
                        {done ? '✓' : s.icon}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: active ? 800 : 600, color: active ? 'var(--accent)' : done ? 'var(--green)' : 'var(--text-3)', whiteSpace: 'nowrap' }}>
                        {t(s.labelKey)}
                      </span>
                    </li>
                    {i < 2 && (
                      <li aria-hidden="true" style={{
                        width: 56, height: 3, margin: '0 4px', marginBottom: 24,
                        background: i < step ? 'var(--green)' : 'var(--border)',
                        borderRadius: 2, transition: 'background 0.4s', flexShrink: 0,
                      }} />
                    )}
                  </React.Fragment>
                )
              })}
            </ol>
          </div>
        )}

        {/* Main card */}
        <div id="main-content" ref={cardRef} tabIndex={-1} style={{
          background: 'var(--surface)',
          borderRadius: 20,
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          outline: 'none',
        }}>
          {step === 0 && <StepSlots onSelect={b => { setBooking(b); setStep(1) }} />}
          {step === 1 && <StepDetails booking={booking} onNext={d => { setDetails(d); setStep(2) }} onBack={() => setStep(0)} />}
          {step === 2 && <StepVerify booking={booking} details={details} onSuccess={t => { setTicket(t); setStep(3) }} onBack={() => setStep(1)} />}
          {step === 3 && <StepConfirm booking={booking} ticket={ticket} onReset={reset} />}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-3)', lineHeight: 1.8 }}>
          <div>{t('unofficial')}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', opacity: 0.75, fontFamily: 'monospace', marginTop: 2 }}>
            🔒 {t('proxyNote')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span>© 2026 Aleksander Jarmoszuk</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-3)', textDecoration: 'none', fontWeight: 700 }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)' }}
            >CC BY-SA 4.0</a>
            <span style={{ opacity: 0.4 }}>·</span>
            <a
              href={`https://github.com/ajarmoszuk/uml-wizyty-app/commit/${__GIT_COMMIT__}`}
              target="_blank"
              rel="noopener noreferrer"
              title="View this commit on GitHub"
              style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-3)', textDecoration: 'none', letterSpacing: '0.04em' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)' }}
            >{__GIT_COMMIT__}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function SystemBanner({ icon, color, bg, onDismiss, children }) {
  const t = useT()
  return (
    <div role="alert" style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      background: bg, border: `1.5px solid ${color}`,
      borderRadius: 12, padding: '12px 14px',
      marginBottom: 16, color,
    }}>
      <span style={{ fontSize: 18, lineHeight: 1.4, flexShrink: 0 }} aria-hidden="true">{icon}</span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.55 }}>{children}</span>
      <button
        onClick={onDismiss}
        aria-label={t('bannerDismiss')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color, fontSize: 18, lineHeight: 1, padding: '0 2px', flexShrink: 0,
          fontFamily: 'var(--font)', fontWeight: 700,
        }}
      >×</button>
    </div>
  )
}
