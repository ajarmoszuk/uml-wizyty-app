/**
 * i18n: plain strings in ./translations.js, React providers & hooks in ./context.jsx
 */
export { T, CAT_KEY } from './translations.js'
export {
  LangContext,
  ThemeContext,
  LangProvider,
  ThemeProvider,
  useLang,
  useTheme,
  useT,
  useServiceLabel,
  useDobHint,
  useOfficeLabel,
  usePluralService,
} from './context.jsx'
