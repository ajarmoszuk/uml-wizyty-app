import React, { useState, useRef, useEffect } from 'react'
import StepSlots from './components/steps/StepSlots.jsx'
import StepDetails from './components/steps/StepDetails.jsx'
import StepVerify from './components/steps/StepVerify.jsx'
import StepConfirm from './components/steps/StepConfirm.jsx'
import TopBar from './components/layout/TopBar.jsx'
import LodzCOA from './components/layout/LodzCOA.jsx'
import SystemBanner from './components/layout/SystemBanner.jsx'
import { useT } from './i18n'
import { useSystemBanners } from './hooks/useSystemBanners.js'
import Icon from './components/ui/Icon.jsx'

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
    { icon: 'calendar', labelKey: 'step0' },
    { icon: 'user', labelKey: 'step1' },
    { icon: 'smartphone', labelKey: 'step2' },
  ]

  function reset() {
    setStep(0); setBooking(null); setDetails(null); setTicket(null)
  }

  return (
    <div className="app-root" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <a href="#main-content" className="skip-link">{t('skipToMain')}</a>
      <div className="app-inner">

        <TopBar />

        {/* System banners */}
        {banners.showOffline && (
          <SystemBanner icon="wifi-off" color="var(--red)" bg="var(--red-light)" onDismiss={banners.dismissOffline}>
            {t('bannerOffline')}
          </SystemBanner>
        )}
        {banners.showMaintenance && (
          <SystemBanner icon="wrench" color="var(--orange)" bg="var(--orange-light)" onDismiss={banners.dismissMaintenance}>
            {banners.isConnectionReset ? t('bannerConnectionReset') : t('bannerMaintenance')}
          </SystemBanner>
        )}

        {/* Header */}
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', marginBottom: 10, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.22))' }}>
            <LodzCOA size={44} />
          </div>
          <p
            role="note"
            style={{
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1.45,
              color: 'var(--orange)',
              background: 'var(--orange-light)',
              border: '1.5px solid color-mix(in srgb, var(--orange) 45%, transparent)',
              borderRadius: 10,
              padding: '8px 14px',
              margin: '0 auto 12px',
              maxWidth: 420,
            }}
          >
            {t('headerUnofficialBadge')}
          </p>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            {t('city')}
          </div>
          <h1 className="app-title" style={{ fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em' }}>
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
            <ol className="stepper-track" aria-label={t('stepCount', step + 1, 3)}>
              {STEPS.map((s, i) => {
                const done = i < step
                const active = i === step
                return (
                  <React.Fragment key={i}>
                    <li aria-current={active ? 'step' : undefined} className="stepper-item" style={{ transition: 'opacity 0.3s', opacity: (!active && !done) ? 0.3 : 1 }}>
                      <div style={{
                        width: 36, height: 36,
                        borderRadius: '50%',
                        background: active ? 'var(--accent)' : done ? 'var(--green)' : 'var(--surface2)',
                        border: `2px solid ${active ? 'var(--accent)' : done ? 'var(--green)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: (active || done) ? 'white' : 'var(--text-3)',
                        transition: 'all 0.3s',
                        flexShrink: 0,
                      }} aria-hidden="true">
                        {done ? <Icon name="check" size={16} /> : <Icon name={s.icon} size={16} />}
                      </div>
                      <span className="stepper-label" style={{ fontWeight: active ? 800 : 600, color: active ? 'var(--accent)' : done ? 'var(--green)' : 'var(--text-3)' }}>
                        {t(s.labelKey)}
                      </span>
                    </li>
                    {i < 2 && (
                      <li
                        aria-hidden="true"
                        className="stepper-connector"
                        style={{
                          background: i < step ? 'var(--green)' : 'var(--border)',
                          transition: 'background 0.4s',
                        }}
                      />
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
          minWidth: 0,
          maxWidth: '100%',
        }}>
          {step === 0 && <StepSlots onSelect={b => { setBooking(b); setStep(1) }} />}
          {step === 1 && <StepDetails booking={booking} onNext={d => { setDetails(d); setStep(2) }} onBack={() => setStep(0)} />}
          {step === 2 && <StepVerify booking={booking} details={details} onSuccess={t => { setTicket(t); setStep(3) }} onBack={() => setStep(1)} />}
          {step === 3 && <StepConfirm booking={booking} ticket={ticket} onReset={reset} />}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-3)', lineHeight: 1.8 }}>
          <div>{t('unofficial')}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', opacity: 0.75, fontFamily: 'monospace', marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <Icon name="lock" size={11} /> {t('proxyNote')}
          </div>
          <div style={{ marginTop: 10, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', fontSize: 11, lineHeight: 1.55, color: 'var(--text-3)', opacity: 0.82 }}>
            {t('footerBuildHint')}{' '}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('uml:openabout'))}
              aria-label={t('aboutTitle')}
              style={{
                background: 'none', border: 'none', padding: 0, margin: 0,
                color: 'var(--accent)', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 'inherit', textDecoration: 'underline',
                textUnderlineOffset: 2,
              }}
            >
              {t('about')}
            </button>
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
