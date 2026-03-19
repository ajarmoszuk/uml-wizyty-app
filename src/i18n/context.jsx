import React, { createContext, useContext, useState, useEffect } from 'react'
import { T } from './translations.js'

export { T, CAT_KEY } from './translations.js'

export const LangContext = createContext({ lang: 'pl', setLang: () => {} })
export const ThemeContext = createContext({ dark: false, setDark: () => {} })

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('uml_lang') || 'pl')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function setLang(l) {
    setLangState(l)
    localStorage.setItem('uml_lang', l)
  }
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function ThemeProvider({ children }) {
  const [dark, setDarkState] = useState(() => {
    const saved = localStorage.getItem('uml_theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('uml_theme', dark ? 'dark' : 'light')
  }, [dark])

  function setDark(v) { setDarkState(v) }
  return <ThemeContext.Provider value={{ dark, setDark }}>{children}</ThemeContext.Provider>
}

export function useLang() { return useContext(LangContext) }
export function useTheme() { return useContext(ThemeContext) }

export function useT() {
  const { lang } = useLang()
  const strings = T[lang] || T.pl
  return (key, ...args) => {
    const val = strings[key] ?? T.pl[key] ?? key
    return typeof val === 'function' ? val(...args) : val
  }
}

export function useServiceLabel() {
  const { lang } = useLang()
  return (svc) => {
    if (!svc) return ''
    if (lang === 'en' && svc.labelEn) return svc.labelEn
    if (lang === 'uk' && svc.labelUk) return svc.labelUk
    return svc.label
  }
}

export function useDobHint() {
  const { lang } = useLang()
  return (svc) => {
    if (!svc?.dobHint) return null
    if (lang === 'en') return svc.dobHint.en ?? svc.dobHint.pl
    if (lang === 'uk') return svc.dobHint.uk ?? svc.dobHint.pl
    return svc.dobHint.pl
  }
}

export function useOfficeLabel() {
  const { lang } = useLang()
  return (svc) => {
    if (!svc) return ''
    if (lang === 'en' && svc.officeLabelEn) return svc.officeLabelEn
    if (lang === 'uk' && svc.officeLabelUk) return svc.officeLabelUk
    return svc.officeLabel || ''
  }
}

export function usePluralService() {
  const { lang } = useLang()
  const t = useT()
  return (n) => {
    if (lang === 'pl' || lang === 'uk') {
      const mod10 = n % 10
      const mod100 = n % 100
      if (n === 1) return t('serviceSingular')
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return t('servicePlural')
      return t('serviceGenPlural')
    }
    return n === 1 ? t('serviceSingular') : t('servicePlural')
  }
}
