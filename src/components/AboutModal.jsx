import React, { useEffect, useRef } from 'react'
import { useT } from '../i18n.jsx'
import Icon from './Icon.jsx'

const GITHUB_URL = 'https://github.com/ajarmoszuk/uml-wizyty-app'

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export default function AboutModal({ onClose }) {
  const t = useT()
  const modalRef = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    const modal = modalRef.current
    const focusable = modal?.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])')
    if (focusable?.length) focusable[0].focus()

    function onKey(e) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab' || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [onClose])

  return (
    <div
      className="fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('aboutTitle')}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'var(--modal-overlay)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px 16px',
        backdropFilter: 'blur(4px)',
      }}>
      <div
        ref={modalRef}
        className="pop-in"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          borderRadius: 20,
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: 560, width: '100%',
          maxHeight: '90vh', overflowY: 'auto',
          padding: '36px 32px',
        }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 6 }}>
              {t('aboutTitle')}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 700, lineHeight: 1.4 }}>
              {t('aboutTagline')}
            </p>
          </div>
          <button onClick={onClose} aria-label={t('close')} style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
            background: 'var(--surface2)', border: '1px solid var(--border)',
            cursor: 'pointer', color: 'var(--text-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name="x" size={16} /></button>
        </div>

        {/* Body */}
        <div style={{
          fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75,
          whiteSpace: 'pre-line', marginBottom: 24,
        }}>
          {t('aboutBody')}
        </div>

        {/* API horror show */}
        <div style={{
          background: 'var(--surface2)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '12px 16px', marginBottom: 24,
          fontFamily: 'monospace', fontSize: 11.5, color: 'var(--text-3)',
          lineHeight: 1.6, overflowX: 'auto',
        }}>
          <span style={{ color: 'var(--text-2)', fontWeight: 700 }}>{'//'} Actual API response from wizyty.uml.lodz.pl:</span>{'\n'}
          {'"ANALYZE": "5 - 5 = 0, CZYLI WYTWORZYŁ 0 DŁUGU",\n"WZÓR": "[ZOBACZ POLE *WZÓR*]",\n"ILOŚĆ DOSTĘPNYCH MIEJSC MIEJSC": "5"'}
        </div>

        {/* Claude note */}
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20, fontStyle: 'italic' }}>
          {t('claudeNote')}
        </p>

        {/* Hire me */}
        <div style={{
          background: 'var(--green-light)', border: '1.5px solid var(--green)',
          borderRadius: 10, padding: '14px 16px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        }}>
          <Icon name="handshake" size={20} style={{ color: 'var(--green)', flexShrink: 0 }} />
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 14, fontWeight: 800, color: 'var(--green)', marginBottom: 2 }}>
              {t('hireMe')}
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>
              {t('hireMeSub')}{' '}
              <a
                href="mailto:alex@jarmosz.uk"
                style={{ color: 'var(--green)', fontWeight: 800, textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
                onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
              >alex@jarmosz.uk</a>
            </span>
          </span>
        </div>

        {/* Data / proxy note */}
        <div style={{
          background: 'var(--accent-light)', border: '1px solid var(--accent)',
          borderRadius: 10, padding: '14px 16px', marginBottom: 24,
        }}>
          <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700, lineHeight: 1.6 }}>
            {t('aboutDataNote')}
          </div>
          <div style={{
            marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--accent)',
            display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'monospace' }}>
              Browser → Vercel proxy → wizyty.uml.lodz.pl
            </span>
            <span style={{ fontSize: 11, background: 'var(--accent)', color: '#fff', borderRadius: 5, padding: '1px 7px', fontWeight: 800 }}>
              zero storage
            </span>
          </div>
        </div>

        {/* License */}
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span>© 2026 Aleksander Jarmoszuk</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none', fontSize: 12 }}
          >CC BY-SA 4.0</a>
        </div>

        {/* Footer actions */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px',
            background: 'var(--text)',
            color: 'var(--bg)',
            borderRadius: 10, textDecoration: 'none',
            fontSize: 13, fontWeight: 800, fontFamily: 'var(--font)',
            transition: 'opacity var(--transition)',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            <GitHubIcon /> {t('sourceCode')}
          </a>
          <button onClick={onClose} style={{
            padding: '10px 18px',
            background: 'transparent',
            border: '1.5px solid var(--border)',
            borderRadius: 10, cursor: 'pointer',
            fontSize: 13, fontWeight: 700, fontFamily: 'var(--font)',
            color: 'var(--text-2)', transition: 'all var(--transition)',
          }}>
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  )
}
