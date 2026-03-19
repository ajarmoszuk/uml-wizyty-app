export default function LodzCOA({ size = 44 }) {
  const h = Math.round(size * 120 / 100)
  return (
    <svg
      width={size} height={h}
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Herb Lodz"
      style={{ display: 'block' }}
    >
      <title>Herb Lodz</title>

      {/* Shield */}
      <path d="M8 6 H92 V76 Q92 110 50 120 Q8 110 8 76 Z" fill="#C8102E" />
      <path d="M12 10 H88 V76 Q88 106 50 116 Q12 106 12 76 Z"
        fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />
      <path d="M8 6 H92 V76 Q92 110 50 120 Q8 110 8 76 Z"
        fill="none" stroke="#7a0010" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Left wing — upper sweep */}
      <path d="M44 60 Q32 46 15 33 Q24 47 37 61 Q40 64 44 67 Z" fill="white" />
      {/* Left wing — lower tertials */}
      <path d="M44 68 Q26 64 13 54 Q28 59 43 72 Z" fill="white" />

      {/* Right wing — upper sweep */}
      <path d="M56 60 Q68 46 85 33 Q76 47 63 61 Q60 64 56 67 Z" fill="white" />
      {/* Right wing — lower tertials */}
      <path d="M56 68 Q74 64 87 54 Q72 59 57 72 Z" fill="white" />

      {/* Body */}
      <ellipse cx="50" cy="72" rx="8.5" ry="13" fill="white" />

      {/* Neck */}
      <path d="M44 60 Q44 52 50 50 Q56 52 56 60 Q53 63 47 63 Z" fill="white" />

      {/* Head */}
      <ellipse cx="50" cy="44" rx="9" ry="10" fill="white" />

      {/* Crown — gold */}
      <path d="M41 36 L41 29 L45.5 33 L50 26 L54.5 33 L59 29 L59 36 Q50 32.5 41 36 Z"
        fill="#F5B800" />
      <path d="M41 36 Q50 39 59 36 L59 39.5 Q50 42.5 41 39.5 Z" fill="#C99400" />

      {/* Beak — gold, facing left */}
      <path d="M41 43 L34 47 L41 50 Z" fill="#F5B800" />

      {/* Eye */}
      <circle cx="43" cy="43" r="2.8" fill="#C8102E" />
      <circle cx="43" cy="43" r="1.4" fill="#700010" />

      {/* Tail */}
      <path d="M43 84 L40 97 L50 91 L60 97 L57 84 Z" fill="white" />

      {/* Legs */}
      <line x1="44" y1="84" x2="41" y2="95" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="56" y1="84" x2="59" y2="95" stroke="white" strokeWidth="3.5" strokeLinecap="round" />

      {/* Left talons */}
      <line x1="41" y1="95" x2="36" y2="99" stroke="#F5B800" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="41" y1="95" x2="40" y2="101" stroke="#F5B800" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="41" y1="95" x2="45" y2="100" stroke="#F5B800" strokeWidth="2.2" strokeLinecap="round" />

      {/* Right talons */}
      <line x1="59" y1="95" x2="55" y2="99" stroke="#F5B800" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="59" y1="95" x2="59" y2="101" stroke="#F5B800" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="59" y1="95" x2="63" y2="99" stroke="#F5B800" strokeWidth="2.2" strokeLinecap="round" />

      {/* Primary feather tips — left */}
      <line x1="15" y1="33" x2="12" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="27" x2="20" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="22" x2="29" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />

      {/* Primary feather tips — right */}
      <line x1="85" y1="33" x2="88" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="78" y1="27" x2="80" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="22" x2="71" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
