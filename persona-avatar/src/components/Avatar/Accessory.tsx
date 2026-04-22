type Props = { variant: string; color: string; faceShape?: string };

export const Accessory = ({ variant, color, faceShape = "round" }: Props) => {
  const earX =
    faceShape === "oval" ? { l: 50, r: 150 } :
    faceShape === "square" ? { l: 42, r: 158 } :
    { l: 38, r: 162 };

  // ── GLASSES ──────────────────────────────────────────────────────────────
  if (variant === "glasses") {
    return (
      <g>
        <ellipse cx={78} cy={101} rx={16} ry={15} fill="#00000018" />
        <ellipse cx={122} cy={101} rx={16} ry={15} fill="#00000018" />
        <ellipse cx={78} cy={100} rx={15} ry={14} fill={color} opacity={0.25} />
        <ellipse cx={122} cy={100} rx={15} ry={14} fill={color} opacity={0.25} />
        <ellipse cx={78} cy={100} rx={15} ry={14} fill="none" stroke="#1a1a2e" strokeWidth={2.5} />
        <ellipse cx={122} cy={100} rx={15} ry={14} fill="none" stroke="#1a1a2e" strokeWidth={2.5} />
        <path d="M68 92 Q72 89 76 91" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
        <path d="M112 92 Q116 89 120 91" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
        <path d="M93 100 Q100 97 107 100" fill="none" stroke="#1a1a2e" strokeWidth={2} />
        <line x1={63} y1={99} x2={52} y2={102} stroke="#1a1a2e" strokeWidth={2} strokeLinecap="round" />
        <line x1={137} y1={99} x2={148} y2={102} stroke="#1a1a2e" strokeWidth={2} strokeLinecap="round" />
      </g>
    );
  }

  // ── TOP HAT ───────────────────────────────────────────────────────────────
  if (variant === "hat") {
    return (
      <g>
        <ellipse cx={100} cy={55} rx={56} ry={10} fill="#00000020" />
        <ellipse cx={100} cy={53} rx={54} ry={9} fill={color} />
        <rect x={66} y={14} width={68} height={40} rx={10} fill={color} />
        <rect x={66} y={40} width={68} height={14} rx={6} fill="#00000020" />
        <rect x={72} y={18} width={28} height={12} rx={6} fill="#ffffff25" />
        <rect x={66} y={46} width={68} height={8} rx={4} fill="#00000030" />
      </g>
    );
  }

  // ── COWBOY HAT ────────────────────────────────────────────────────────────
  if (variant === "cowboy-hat") {
    return (
      <g>
        {/* Wide brim shadow */}
        <ellipse cx={100} cy={60} rx={76} ry={12} fill="#00000022" />
        {/* Wide brim */}
        <ellipse cx={100} cy={57} rx={74} ry={11} fill={color} />
        {/* Crown sides */}
        <path d="M72 57 Q68 32 80 20 Q100 11 120 20 Q132 32 128 57 Z" fill={color} />
        {/* Crown top dent */}
        <ellipse cx={100} cy={19} rx={18} ry={7} fill="#00000028" />
        {/* Crown highlight */}
        <ellipse cx={88} cy={24} rx={12} ry={6} fill="#ffffff20" />
        {/* Hat band */}
        <path d="M72 49 Q100 54 128 49 L128 57 Q100 62 72 57 Z" fill="#00000030" />
        {/* Band decorative stitch */}
        <path d="M74 52 Q100 57 126 52" fill="none" stroke="#ffffff30" strokeWidth={1} strokeDasharray="3,3" />
        {/* Brim underside shadow */}
        <ellipse cx={100} cy={57} rx={74} ry={6} fill="#00000012" />
      </g>
    );
  }

  // ── BEANIE ────────────────────────────────────────────────────────────────
  if (variant === "beanie") {
    return (
      <g>
        {/* Main dome */}
        <path d="M44 74 Q42 18 100 16 Q158 18 156 74 Z" fill={color} />
        {/* Dome highlight */}
        <ellipse cx={82} cy={38} rx={20} ry={15} fill="#ffffff1a" />
        {/* Ribbing lines */}
        <path d="M48 66 Q100 60 152 66" fill="none" stroke="#00000018" strokeWidth={3} />
        <path d="M46 59 Q100 52 154 59" fill="none" stroke="#00000015" strokeWidth={2.5} />
        <path d="M47 52 Q100 44 153 52" fill="none" stroke="#00000015" strokeWidth={2} />
        {/* Cuff band */}
        <path d="M44 74 Q100 82 156 74 L156 86 Q100 94 44 86 Z" fill={color} />
        <path d="M44 74 Q100 82 156 74 L156 80 Q100 88 44 80 Z" fill="#00000020" />
        {/* Pom-pom */}
        <circle cx={100} cy={16} r={13} fill={color} />
        <circle cx={100} cy={16} r={10} fill={color} />
        <circle cx={96} cy={12} r={4} fill="#ffffff28" />
        <circle cx={102} cy={20} r={2.5} fill="#ffffff15" />
      </g>
    );
  }

  // ── CROWN ─────────────────────────────────────────────────────────────────
  if (variant === "crown") {
    return (
      <g>
        {/* Crown points */}
        <path d="M55 62 L55 38 L72 54 L100 20 L128 54 L145 38 L145 62 Z" fill={color} />
        {/* Base band */}
        <rect x={55} y={56} width={90} height={14} rx={4} fill={color} />
        {/* Band shadow */}
        <rect x={55} y={62} width={90} height={8} rx={4} fill="#00000022" />
        {/* Band highlight */}
        <rect x={57} y={57} width={86} height={5} rx={3} fill="#ffffff18" />
        {/* Centre jewel (ruby) */}
        <circle cx={100} cy={40} r={6} fill="#FF1744" />
        <circle cx={100} cy={40} r={4} fill="#FF6B6B" />
        <circle cx={98} cy={38} r={1.5} fill="#ffffff80" />
        {/* Left jewel (sapphire) */}
        <circle cx={71} cy={54} r={5} fill="#2962FF" />
        <circle cx={71} cy={54} r={3} fill="#82B1FF" />
        <circle cx={70} cy={53} r={1} fill="#ffffff80" />
        {/* Right jewel (emerald) */}
        <circle cx={129} cy={54} r={5} fill="#00C853" />
        <circle cx={129} cy={54} r={3} fill="#69F0AE" />
        <circle cx={128} cy={53} r={1} fill="#ffffff80" />
        {/* Band gems */}
        <circle cx={78} cy={63} r={3.5} fill="#FFD740" />
        <circle cx={100} cy={63} r={3.5} fill="#E040FB" />
        <circle cx={122} cy={63} r={3.5} fill="#FF6D00" />
        {/* Crown highlight streaks */}
        <path d="M62 52 L65 42" stroke="#ffffff35" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M100 24 L100 32" stroke="#ffffff35" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M138 52 L135 42" stroke="#ffffff35" strokeWidth={1.5} strokeLinecap="round" />
      </g>
    );
  }

  // ── PARTY HAT ─────────────────────────────────────────────────────────────
  if (variant === "party-hat") {
    return (
      <g>
        {/* Cone body */}
        <path d="M76 60 L100 2 L124 60 Z" fill={color} />
        {/* Cone shading right side */}
        <path d="M100 2 L124 60 Q112 52 100 2 Z" fill="#00000018" />
        {/* Polka dots */}
        <circle cx={100} cy={24} r={4} fill="#ffffff60" />
        <circle cx={88} cy={40} r={3.5} fill="#FFD93D" opacity={0.85} />
        <circle cx={112} cy={40} r={3.5} fill="#ffffff55" />
        <circle cx={94} cy={50} r={3} fill="#FFD93D" opacity={0.85} />
        <circle cx={108} cy={16} r={3} fill="#ffffff55" />
        <circle cx={93} cy={30} r={2.5} fill="#ffffff40" />
        <circle cx={107} cy={33} r={2.5} fill="#FF6B6B" opacity={0.7} />
        {/* Base ellipse */}
        <ellipse cx={100} cy={60} rx={24} ry={7} fill="#00000022" />
        <path d="M76 60 Q100 67 124 60" fill="none" stroke="#00000025" strokeWidth={2} />
        {/* Pom-pom */}
        <circle cx={100} cy={2} r={8} fill="#FFD93D" />
        <circle cx={100} cy={2} r={6} fill="#FFE57F" />
        <circle cx={97} cy={-1} r={2.5} fill="#ffffff55" />
      </g>
    );
  }

  // ── HEADPHONES (AirPods) ──────────────────────────────────────────────────
  if (variant === "headphones") {
    const lx = earX.l;
    const rx = earX.r;
    return (
      <g>
        <rect x={lx - 4} y={112} width={9} height={22} rx={4.5} fill="#e8e8e8" />
        <rect x={lx - 3} y={113} width={4} height={10} rx={2} fill="#ffffff60" />
        <rect x={lx - 4} y={130} width={9} height={4} rx={2} fill="#00000020" />
        <ellipse cx={lx} cy={108} rx={13} ry={14} fill="#e8e8e8" />
        <ellipse cx={lx} cy={112} rx={10} ry={9} fill="#00000012" />
        <ellipse cx={lx} cy={108} rx={7} ry={8} fill="#d0d0d0" />
        <ellipse cx={lx} cy={108} rx={4} ry={5} fill="#b8b8b8" />
        <ellipse cx={lx} cy={97} rx={5} ry={4} fill="#c8c8c8" />
        <ellipse cx={lx} cy={97} rx={3} ry={2.5} fill="#e0e0e0" />
        <ellipse cx={lx - 4} cy={103} rx={3} ry={4} fill="#ffffff50" />
        <circle cx={lx} cy={121} r={2} fill={color} opacity={0.8} />
        <rect x={rx - 4} y={112} width={9} height={22} rx={4.5} fill="#e8e8e8" />
        <rect x={rx - 3} y={113} width={4} height={10} rx={2} fill="#ffffff60" />
        <rect x={rx - 4} y={130} width={9} height={4} rx={2} fill="#00000020" />
        <ellipse cx={rx} cy={108} rx={13} ry={14} fill="#e8e8e8" />
        <ellipse cx={rx} cy={112} rx={10} ry={9} fill="#00000012" />
        <ellipse cx={rx} cy={108} rx={7} ry={8} fill="#d0d0d0" />
        <ellipse cx={rx} cy={108} rx={4} ry={5} fill="#b8b8b8" />
        <ellipse cx={rx} cy={97} rx={5} ry={4} fill="#c8c8c8" />
        <ellipse cx={rx} cy={97} rx={3} ry={2.5} fill="#e0e0e0" />
        <ellipse cx={rx - 4} cy={103} rx={3} ry={4} fill="#ffffff50" />
        <circle cx={rx} cy={121} r={2} fill={color} opacity={0.8} />
      </g>
    );
  }

  // ── 6-PETAL FLOWER ────────────────────────────────────────────────────────
  if (variant === "flower") {
    return (
      <g transform="translate(132, 44)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx={Math.cos((angle * Math.PI) / 180) * 10}
            cy={Math.sin((angle * Math.PI) / 180) * 10}
            rx={7} ry={4.5}
            fill={color}
            transform={`rotate(${angle})`}
            opacity={0.9}
          />
        ))}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={`s${angle}`}
            cx={Math.cos((angle * Math.PI) / 180) * 10}
            cy={Math.sin((angle * Math.PI) / 180) * 10}
            rx={4} ry={2.5}
            fill="#00000015"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx={0} cy={0} r={6} fill="#FFD93D" />
        <circle cx={0} cy={0} r={4} fill="#FFC107" />
        <circle cx={-1.5} cy={-1.5} r={1.5} fill="#ffffff60" />
        <line x1={0} y1={6} x2={0} y2={18} stroke="#4CAF50" strokeWidth={2} strokeLinecap="round" />
      </g>
    );
  }

  // ── SUNFLOWER ─────────────────────────────────────────────────────────────
  if (variant === "sunflower") {
    const petalAngles = Array.from({ length: 13 }, (_, i) => (i * 360) / 13);
    return (
      <g transform="translate(132, 42)">
        {/* Outer petals — long yellow */}
        {petalAngles.map((angle) => (
          <ellipse
            key={`p${angle}`}
            cx={Math.cos((angle * Math.PI) / 180) * 15}
            cy={Math.sin((angle * Math.PI) / 180) * 15}
            rx={5} ry={9}
            fill="#FFD600"
            transform={`rotate(${angle})`}
            opacity={0.95}
          />
        ))}
        {/* Inner petal shading */}
        {petalAngles.map((angle) => (
          <ellipse
            key={`ps${angle}`}
            cx={Math.cos((angle * Math.PI) / 180) * 15}
            cy={Math.sin((angle * Math.PI) / 180) * 15}
            rx={2.5} ry={4.5}
            fill="#F57F17"
            transform={`rotate(${angle})`}
            opacity={0.5}
          />
        ))}
        {/* Dark seed disc */}
        <circle cx={0} cy={0} r={9} fill="#4E342E" />
        <circle cx={0} cy={0} r={8} fill="#3E2723" />
        {/* Seed dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <circle
            key={`sd${a}`}
            cx={Math.cos((a * Math.PI) / 180) * 5}
            cy={Math.sin((a * Math.PI) / 180) * 5}
            r={1.2}
            fill="#6D4C41"
          />
        ))}
        <circle cx={0} cy={0} r={2} fill="#5D4037" />
        <circle cx={-0.8} cy={-0.8} r={0.8} fill="#ffffff25" />
        {/* Stem */}
        <line x1={0} y1={9} x2={0} y2={24} stroke="#388E3C" strokeWidth={2.5} strokeLinecap="round" />
        <path d="M0 18 Q-6 14 -9 8" fill="none" stroke="#388E3C" strokeWidth={1.5} strokeLinecap="round" />
      </g>
    );
  }

  // ── ROSE ──────────────────────────────────────────────────────────────────
  if (variant === "rose") {
    return (
      <g transform="translate(132, 44)">
        {/* Outer petals */}
        <path d="M0 -13 Q10 -8 8 0 Q10 8 0 13 Q-10 8 -8 0 Q-10 -8 0 -13 Z" fill={color} opacity={0.6} />
        {/* Mid petals */}
        <path d="M0 -10 Q8 -4 6 3 Q3 10 0 10 Q-3 10 -6 3 Q-8 -4 0 -10 Z" fill={color} opacity={0.8} />
        {/* Inner spiral petals */}
        <path d="M0 -7 Q6 -2 4 4 Q1 8 0 7 Q-4 5 -3 0 Q-2 -5 0 -7 Z" fill={color} />
        <path d="M0 -4 Q4 0 2 4 Q0 6 -1 3 Q-3 1 0 -4 Z" fill={color} opacity={0.9} />
        {/* Centre */}
        <circle cx={0} cy={0} r={3} fill={color} />
        <circle cx={-0.5} cy={-0.5} r={1.2} fill="#ffffff35" />
        {/* Petal shadows */}
        <path d="M3 -8 Q8 -2 6 5" fill="none" stroke="#00000018" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M-3 -8 Q-8 -2 -6 5" fill="none" stroke="#00000018" strokeWidth={1.5} strokeLinecap="round" />
        {/* Sepals */}
        <path d="M0 13 Q4 10 6 14 Q2 16 0 15 Z" fill="#388E3C" />
        <path d="M0 13 Q-4 10 -6 14 Q-2 16 0 15 Z" fill="#388E3C" />
        {/* Stem */}
        <line x1={0} y1={14} x2={0} y2={26} stroke="#388E3C" strokeWidth={2.5} strokeLinecap="round" />
        {/* Leaf */}
        <path d="M0 20 Q-7 16 -10 10 Q-4 14 0 20 Z" fill="#43A047" />
      </g>
    );
  }

  // ── BOW ───────────────────────────────────────────────────────────────────
  if (variant === "bow") {
    return (
      <g transform="translate(100, 42)">
        {/* Left loop */}
        <path d="M-2 0 Q-22 -22 -30 -8 Q-28 6 -2 4 Z" fill={color} opacity={0.9} />
        <path d="M-2 0 Q-22 -22 -30 -8 Q-28 6 -2 4 Z" fill="none" stroke="#00000018" strokeWidth={1} />
        <path d="M-8 -4 Q-20 -16 -26 -6" fill="none" stroke="#ffffff25" strokeWidth={1.5} strokeLinecap="round" />
        {/* Right loop */}
        <path d="M2 0 Q22 -22 30 -8 Q28 6 2 4 Z" fill={color} opacity={0.9} />
        <path d="M2 0 Q22 -22 30 -8 Q28 6 2 4 Z" fill="none" stroke="#00000018" strokeWidth={1} />
        <path d="M8 -4 Q20 -16 26 -6" fill="none" stroke="#ffffff25" strokeWidth={1.5} strokeLinecap="round" />
        {/* Tails */}
        <path d="M-2 4 Q-10 14 -14 20" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" />
        <path d="M2 4 Q10 14 14 20" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" />
        {/* Centre knot */}
        <ellipse cx={0} cy={2} rx={6} ry={5} fill={color} />
        <ellipse cx={0} cy={2} rx={4} ry={3} fill="#00000015" />
        <ellipse cx={-1} cy={1} rx={2} ry={1.5} fill="#ffffff25" />
      </g>
    );
  }

  // ── EARRINGS ──────────────────────────────────────────────────────────────
  if (variant === "earrings") {
    const lx = earX.l;
    const rx = earX.r;
    return (
      <g>
        {/* Left ear wire */}
        <path d={`M${lx} 118 Q${lx - 3} 123 ${lx} 127`} fill="none" stroke="#C0A060" strokeWidth={1.5} strokeLinecap="round" />
        {/* Left gem */}
        <ellipse cx={lx} cy={113} rx={5} ry={5} fill={color} />
        <ellipse cx={lx} cy={113} rx={3} ry={3} fill="#ffffff40" />
        <circle cx={lx - 1} cy={112} r={1.2} fill="#ffffff70" />
        {/* Left dangle drop */}
        <path d={`M${lx} 127 L${lx} 140`} stroke="#C0A060" strokeWidth={1.5} strokeLinecap="round" />
        <ellipse cx={lx} cy={145} rx={5} ry={7} fill={color} />
        <ellipse cx={lx} cy={145} rx={3} ry={4} fill="#ffffff30" />
        <circle cx={lx - 1.5} cy={143} r={1.5} fill="#ffffff55" />

        {/* Right ear wire */}
        <path d={`M${rx} 118 Q${rx + 3} 123 ${rx} 127`} fill="none" stroke="#C0A060" strokeWidth={1.5} strokeLinecap="round" />
        {/* Right gem */}
        <ellipse cx={rx} cy={113} rx={5} ry={5} fill={color} />
        <ellipse cx={rx} cy={113} rx={3} ry={3} fill="#ffffff40" />
        <circle cx={rx - 1} cy={112} r={1.2} fill="#ffffff70" />
        {/* Right dangle drop */}
        <path d={`M${rx} 127 L${rx} 140`} stroke="#C0A060" strokeWidth={1.5} strokeLinecap="round" />
        <ellipse cx={rx} cy={145} rx={5} ry={7} fill={color} />
        <ellipse cx={rx} cy={145} rx={3} ry={4} fill="#ffffff30" />
        <circle cx={rx - 1.5} cy={143} r={1.5} fill="#ffffff55" />
      </g>
    );
  }

  // ── SUNGLASSES ────────────────────────────────────────────────────────────
  if (variant === "sunglasses") {
    return (
      <g>
        <ellipse cx={78} cy={101} rx={16} ry={14} fill="#1a1a1a" opacity={0.88} />
        <ellipse cx={122} cy={101} rx={16} ry={14} fill="#1a1a1a" opacity={0.88} />
        <ellipse cx={78} cy={99} rx={13} ry={10} fill="#2a2a2a" opacity={0.6} />
        <ellipse cx={122} cy={99} rx={13} ry={10} fill="#2a2a2a" opacity={0.6} />
        {/* Tinted shine */}
        <ellipse cx={72} cy={95} rx={5} ry={3} fill="#ffffff18" transform="rotate(-20,72,95)" />
        <ellipse cx={116} cy={95} rx={5} ry={3} fill="#ffffff18" transform="rotate(-20,116,95)" />
        <ellipse cx={78} cy={101} rx={16} ry={14} fill="none" stroke="#111" strokeWidth={2.5} />
        <ellipse cx={122} cy={101} rx={16} ry={14} fill="none" stroke="#111" strokeWidth={2.5} />
        <path d="M94 100 Q100 97 106 100" fill="none" stroke="#111" strokeWidth={2} />
        <line x1={62} y1={99} x2={50} y2={102} stroke="#111" strokeWidth={2.2} strokeLinecap="round" />
        <line x1={138} y1={99} x2={150} y2={102} stroke="#111" strokeWidth={2.2} strokeLinecap="round" />
      </g>
    );
  }

  // ── MONOCLE ───────────────────────────────────────────────────────────────
  if (variant === "monocle") {
    return (
      <g>
        <ellipse cx={122} cy={101} rx={16} ry={15} fill={color} opacity={0.2} />
        <ellipse cx={122} cy={101} rx={16} ry={15} fill="none" stroke="#C0A060" strokeWidth={3} />
        <ellipse cx={116} cy={96} rx={5} ry={3} fill="#ffffff30" transform="rotate(-25,116,96)" />
        {/* Gold chain */}
        <path d="M136 108 Q142 118 138 130 Q135 140 130 148" fill="none" stroke="#C0A060" strokeWidth={1.5} strokeDasharray="3,3" strokeLinecap="round" />
        <circle cx={130} cy={150} r={3} fill="#C0A060" />
        <circle cx={138} cy={100} r={2} fill="#C0A060" />
      </g>
    );
  }

  // ── WIZARD HAT ────────────────────────────────────────────────────────────
  if (variant === "wizard-hat") {
    return (
      <g>
        {/* Wide brim */}
        <ellipse cx={100} cy={62} rx={58} ry={10} fill="#00000022" />
        <ellipse cx={100} cy={60} rx={56} ry={9} fill={color} />
        {/* Tall cone */}
        <path d="M82 60 L100 -10 L118 60 Z" fill={color} />
        <path d="M100 -10 L118 60 Q110 50 100 -10 Z" fill="#00000018" />
        {/* Stars on cone */}
        <text x={94} y={30} fontSize={10} fill="#FFD700" textAnchor="middle">★</text>
        <text x={104} y={48} fontSize={7} fill="#ffffff80" textAnchor="middle">✦</text>
        <text x={88} y={50} fontSize={6} fill="#ffffff60" textAnchor="middle">✦</text>
        {/* Moon */}
        <path d="M104 18 Q110 14 109 20 Q106 26 104 18 Z" fill="#FFD700" opacity={0.9} />
        {/* Brim highlight */}
        <ellipse cx={85} cy={56} rx={18} ry={4} fill="#ffffff20" />
      </g>
    );
  }

  // ── DEVIL HORNS ──────────────────────────────────────────────────────────
  if (variant === "devil-horns") {
    return (
      <g>
        {/* Left horn */}
        <path d="M68 68 Q56 40 72 24 Q74 44 80 60 Z" fill="#CC2200" />
        <path d="M72 24 Q74 44 80 60 Q76 44 72 24 Z" fill="#FF4422" opacity={0.5} />
        {/* Right horn */}
        <path d="M132 68 Q144 40 128 24 Q126 44 120 60 Z" fill="#CC2200" />
        <path d="M128 24 Q126 44 120 60 Q124 44 128 24 Z" fill="#FF4422" opacity={0.5} />
        {/* Horn tips glow */}
        <circle cx={72} cy={24} r={4} fill="#FF6644" opacity={0.7} />
        <circle cx={128} cy={24} r={4} fill="#FF6644" opacity={0.7} />
      </g>
    );
  }

  // ── HALO ──────────────────────────────────────────────────────────────────
  if (variant === "halo") {
    return (
      <g>
        {/* Glow effect */}
        <ellipse cx={100} cy={18} rx={30} ry={9} fill="#FFD700" opacity={0.25} />
        {/* Main halo ring */}
        <ellipse cx={100} cy={18} rx={26} ry={7} fill="none" stroke="#FFD700" strokeWidth={5} />
        <ellipse cx={100} cy={18} rx={26} ry={7} fill="none" stroke="#FFF8DC" strokeWidth={2} opacity={0.7} />
        {/* Inner shine arc */}
        <path d="M80 15 Q100 10 120 15" fill="none" stroke="#ffffff70" strokeWidth={2} strokeLinecap="round" />
      </g>
    );
  }

  // ── LAUREL WREATH ─────────────────────────────────────────────────────────
  if (variant === "laurel-wreath") {
    const leftLeaves = [
      { x: 60, y: 56, r: -40 }, { x: 52, y: 48, r: -55 }, { x: 50, y: 38, r: -70 },
      { x: 54, y: 28, r: -85 }, { x: 62, y: 20, r: -100 },
    ];
    const rightLeaves = leftLeaves.map(l => ({ x: 200 - l.x, y: l.y, r: -l.r }));
    return (
      <g>
        {leftLeaves.map((l, i) => (
          <ellipse key={`ll${i}`} cx={l.x} cy={l.y} rx={9} ry={5} fill="#4CAF50" transform={`rotate(${l.r},${l.x},${l.y})`} opacity={0.9} />
        ))}
        {leftLeaves.map((l, i) => (
          <ellipse key={`lls${i}`} cx={l.x} cy={l.y} rx={9} ry={5} fill="none" stroke="#2E7D32" strokeWidth={0.8} transform={`rotate(${l.r},${l.x},${l.y})`} />
        ))}
        {rightLeaves.map((l, i) => (
          <ellipse key={`rl${i}`} cx={l.x} cy={l.y} rx={9} ry={5} fill="#4CAF50" transform={`rotate(${l.r},${l.x},${l.y})`} opacity={0.9} />
        ))}
        {rightLeaves.map((l, i) => (
          <ellipse key={`rls${i}`} cx={l.x} cy={l.y} rx={9} ry={5} fill="none" stroke="#2E7D32" strokeWidth={0.8} transform={`rotate(${l.r},${l.x},${l.y})`} />
        ))}
        {/* Centre berries */}
        <circle cx={93} cy={18} r={4} fill="#C62828" />
        <circle cx={100} cy={15} r={4.5} fill="#C62828" />
        <circle cx={107} cy={18} r={4} fill="#C62828" />
        <circle cx={93} cy={18} r={2} fill="#EF9A9A" opacity={0.6} />
        <circle cx={100} cy={15} r={2.5} fill="#EF9A9A" opacity={0.6} />
        <circle cx={107} cy={18} r={2} fill="#EF9A9A" opacity={0.6} />
      </g>
    );
  }

  // ── FIRE AURA ─────────────────────────────────────────────────────────────
  if (variant === "fire-aura") {
    return (
      <g opacity={0.9}>
        {/* Left flames */}
        <path d="M38 140 Q30 110 42 88 Q36 104 44 90 Q40 110 50 100 Q44 115 52 108 Q48 122 56 118 Q52 130 42 140 Z" fill="#FF6F00" />
        <path d="M38 140 Q32 115 44 94 Q42 110 50 100 Q46 118 54 112 Q50 126 42 140 Z" fill="#FFCA28" opacity={0.6} />
        {/* Right flames */}
        <path d="M162 140 Q170 110 158 88 Q164 104 156 90 Q160 110 150 100 Q156 115 148 108 Q152 122 144 118 Q148 130 158 140 Z" fill="#FF6F00" />
        <path d="M162 140 Q168 115 156 94 Q158 110 150 100 Q154 118 146 112 Q150 126 158 140 Z" fill="#FFCA28" opacity={0.6} />
      </g>
    );
  }

  // ── ANGEL WINGS ──────────────────────────────────────────────────────────
  if (variant === "angel-wings") {
    return (
      <g opacity={0.92}>
        {/* Left wing */}
        <path d="M58 100 Q20 70 18 110 Q16 140 50 148 Q30 130 38 112 Q44 128 58 130 Q42 118 48 104 Z" fill="white" />
        <path d="M58 100 Q20 70 18 110 Q16 140 50 148 Q30 130 38 112 Q44 128 58 130 Q42 118 48 104 Z" fill="none" stroke="#DDD" strokeWidth={1} />
        {/* Left feather detail */}
        <path d="M30 90 Q36 104 48 104" fill="none" stroke="#EEE" strokeWidth={1.2} strokeLinecap="round" />
        <path d="M24 102 Q32 116 44 116" fill="none" stroke="#EEE" strokeWidth={1.2} strokeLinecap="round" />
        <path d="M22 116 Q30 128 42 128" fill="none" stroke="#EEE" strokeWidth={1.2} strokeLinecap="round" />
        {/* Right wing */}
        <path d="M142 100 Q180 70 182 110 Q184 140 150 148 Q170 130 162 112 Q156 128 142 130 Q158 118 152 104 Z" fill="white" />
        <path d="M142 100 Q180 70 182 110 Q184 140 150 148 Q170 130 162 112 Q156 128 142 130 Q158 118 152 104 Z" fill="none" stroke="#DDD" strokeWidth={1} />
        {/* Right feather detail */}
        <path d="M170 90 Q164 104 152 104" fill="none" stroke="#EEE" strokeWidth={1.2} strokeLinecap="round" />
        <path d="M176 102 Q168 116 156 116" fill="none" stroke="#EEE" strokeWidth={1.2} strokeLinecap="round" />
        <path d="M178 116 Q170 128 158 128" fill="none" stroke="#EEE" strokeWidth={1.2} strokeLinecap="round" />
      </g>
    );
  }

  return null;
};
