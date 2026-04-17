import React, { useEffect, useRef } from 'react'
import { T } from '../../i18n'
import Icon from '../ui/Icon.jsx'

const GITHUB_URL = 'https://github.com/ajarmoszuk/uml-wizyty-app'

/** Komunikat zawsze po polsku — treść od autora projektu. */
const pl = T.pl

export default function EntryNoticeModal({ onClose }) {
  const modalRef = useRef(null)

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

  return (
    <div
      className="fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-notice-title"
      aria-describedby="entry-notice-body"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
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
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          borderRadius: 20,
          border: '2px solid var(--red)',
          boxShadow: 'var(--shadow-lg)',
          width: '100%',
          maxWidth: 'min(540px, calc(100vw - 24px))',
          maxHeight: 'min(85vh, 640px)',
          overflowY: 'auto',
          padding: 'clamp(20px, 5vw, 28px) clamp(16px, 4vw, 28px)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div
            aria-hidden
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'var(--red-light)',
              border: '1.5px solid color-mix(in srgb, var(--red) 40%, transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--red)',
            }}
          >
            <Icon name="alert" size={24} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2
              id="entry-notice-title"
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: 'var(--red)',
                letterSpacing: '-0.02em',
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              {pl.entryNoticeTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={pl.close}
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
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
            <Icon name="x" size={16} />
          </button>
        </div>

        <div
          id="entry-notice-body"
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--text-2)',
            lineHeight: 1.7,
            margin: '0 0 18px',
            whiteSpace: 'pre-line',
          }}
        >
          {pl.entryNoticeBody}
        </div>

        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-3)', margin: '0 0 6px' }}>
          {pl.entryNoticeGithubIntro}
        </p>
        <p style={{ margin: '0 0 22px', wordBreak: 'break-all' }}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            {GITHUB_URL}
          </a>
        </p>

        <button
          type="button"
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px 18px',
            background: 'var(--red)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 800,
            fontFamily: 'var(--font)',
            transition: 'opacity var(--transition)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.92'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1'
          }}
        >
          {pl.entryNoticeCta}
        </button>
      </div>
    </div>
  )
}
