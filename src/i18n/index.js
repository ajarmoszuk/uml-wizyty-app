/**
 * i18n: plain strings in ./translations.js, React providers & hooks in ./context.jsx
 */
export { T, CAT_KEY } from './translations.js'
export {
  LangContext,
  ThemeContext,
  A11yContext,
  LangProvider,
  ThemeProvider,
  A11yProvider,
  useLang,
  useTheme,
  useA11y,
  useT,
  useServiceLabel,
  useDobHint,
  useOfficeLabel,
  usePluralService,
} from './context.jsx'
