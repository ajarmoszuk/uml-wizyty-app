import React from 'react'
import { useT } from '../../i18n'
import Icon from '../ui/Icon.jsx'

export default function SystemBanner({ icon, color, bg, onDismiss, children }) {
  const t = useT()
  return (
    <div role="alert" style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      background: bg, border: `1.5px solid ${color}`,
      borderRadius: 12, padding: '12px 14px',
      marginBottom: 16, color,
    }}>
      <Icon name={icon} size={18} style={{ flexShrink: 0, marginTop: 2 }} />
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.55, minWidth: 0 }}>{children}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={t('bannerDismiss')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color, padding: '0 2px', flexShrink: 0,
          display: 'flex', alignItems: 'center',
        }}
      ><Icon name="x" size={18} /></button>
    </div>
  )
}
