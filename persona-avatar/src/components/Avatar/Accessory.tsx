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

  return null;
};
