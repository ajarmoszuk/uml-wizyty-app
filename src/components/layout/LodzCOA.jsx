import { useT } from '../../i18n'

/** Official Łódź COA image from `public/lodz-coa.svg` — alt text stresses this app is unofficial. */
const ASPECT = 611.344 / 478.074

export default function LodzCOA({ size = 44 }) {
  const t = useT()
  const h = Math.round(size * ASPECT)
  return (
    <img
      src="/lodz-coa.svg"
      alt={t('coaAlt')}
      width={size}
      height={h}
      decoding="async"
      style={{
        display: 'block',
        width: size,
        height: 'auto',
        maxWidth: '100%',
      }}
    />
  )
}
