import React, { useState, useEffect } from 'react'
import { useLang, useTheme, useT } from '../../i18n'
import AboutModal from './AboutModal.jsx'
import OfficeGuideModal from './OfficeGuideModal.jsx'
import Icon from '../ui/Icon.jsx'

const GITHUB_URL = 'https://github.com/ajarmoszuk/uml-wizyty-app'

const LANGS = [
  { code: 'pl', flag: '🇵🇱', label: 'Polish', short: 'PL' },
  { code: 'en', flag: '🇬🇧', label: 'English', short: 'EN' },
  { code: 'uk', flag: '🇺🇦', label: 'Ukrainian', short: 'UK' },
]

const COMPACT_TOPBAR_MQ = '(max-width: 640px)'

function GitHubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function TopBar() {
  const { lang, setLang } = useLang()
  const { dark, setDark } = useTheme()
  const t = useT()
  const [showAbout, setShowAbout] = useState(false)
  const [showOfficeGuide, setShowOfficeGuide] = useState(false)
  const [compactTopBar, setCompactTopBar] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(COMPACT_TOPBAR_MQ).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_TOPBAR_MQ)
    const sync = () => setCompactTopBar(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const open = () => setShowAbout(true)
    window.addEventListener('uml:openabout', open)
    return () => window.removeEventListener('uml:openabout', open)
  }, [])

  useEffect(() => {
    const open = () => setShowOfficeGuide(true)
    window.addEventListener('uml:openofficeguide', open)
    return () => window.removeEventListener('uml:openofficeguide', open)
  }, [])

  const iconBtn = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    color: 'var(--text-2)',
    transition: 'all var(--transition)',
    flexShrink: 0,
  }

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__cluster">
          <button
            type="button"
            className="top-bar__action"
            onClick={() => setShowOfficeGuide(true)}
            aria-haspopup="dialog"
            aria-label={compactTopBar ? t('officesGuideTitle') : undefined}
            title={compactTopBar ? t('officesGuide') : undefined}
          >
            <Icon name="map-pinned" size={15} aria-hidden />
            <span className="top-bar__action-label" aria-hidden={compactTopBar}>{t('officesGuide')}</span>
          </button>
          <button
            type="button"
            className="top-bar__action"
            onClick={() => setShowAbout(true)}
            aria-haspopup="dialog"
            aria-label={compactTopBar ? t('aboutTitle') : undefined}
            title={compactTopBar ? t('about') : undefined}
          >
            <Icon name="info" size={15} aria-hidden />
            <span className="top-bar__action-label" aria-hidden={compactTopBar}>{t('about')}</span>
          </button>
        </div>

        <div className="top-bar__lang" role="group" aria-label="Language">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              className="top-bar__lang-btn"
              onClick={() => setLang(l.code)}
              aria-label={l.label}
              aria-pressed={lang === l.code}
            >
              <span className="top-bar__lang-flag" aria-hidden="true">{l.flag}</span>
              <span className="top-bar__lang-code" aria-hidden="true">{l.short}</span>
            </button>
          ))}
        </div>

        <div className="top-bar__tools">
          <button
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? t('darkOn') : t('darkOff')}
            aria-pressed={dark}
            style={iconBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-2)'
            }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('githubLabel')}
            style={{ ...iconBtn, textDecoration: 'none' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-2)'
            }}
          >
            <GitHubIcon />
          </a>
        </div>
      </div>

      {showOfficeGuide && <OfficeGuideModal onClose={() => setShowOfficeGuide(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </>
  )
}
