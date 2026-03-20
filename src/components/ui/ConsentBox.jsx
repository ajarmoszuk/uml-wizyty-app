import React from 'react'

/**
 * Legal / booking consent checkbox — full label text, readable on mobile.
 */
export default function ConsentBox({ id, checked, onChange, highlight, children }) {
  return (
    <label htmlFor={id} className={`consent-box${highlight ? ' consent-box--error' : ''}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-required="true"
        className="uml-checkbox"
      />
      <span className="consent-box__text">{children}</span>
    </label>
  )
}
