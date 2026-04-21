import type { EyeColor } from "../../lib/avatar";

type Props = { variant: string; eyeColor: EyeColor };

// Renders whites + iris only. Pupils/catchlights are overlaid by AvatarDisplay for mouse tracking.
export const Eyes = ({ variant, eyeColor: c }: Props) => {
  const { base, mid, deep, highlight } = c;

  // Shared iris layers reused across variants — cx/cy injected per eye
  const Iris = ({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) => (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx}       ry={ry}       fill={base} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.8} ry={ry * 0.8} fill={mid} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.6} ry={ry * 0.6} fill={deep} />
      {/* Texture ring */}
      <ellipse cx={cx} cy={cy} rx={rx}       ry={ry}       fill="none" stroke={highlight} strokeWidth={0.8} opacity={0.45} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.7} ry={ry * 0.7} fill="none" stroke={deep}      strokeWidth={0.6} opacity={0.3}  />
    </g>
  );

  // ── BIG — large round, wide-open ─────────────────────────────────────────
  if (variant === "big") {
    return (
      <g>
        <ellipse cx={78}  cy={100} rx={15} ry={17} fill="white" />
        <Iris cx={78} cy={101} rx={11} ry={12} />
        <ellipse cx={78}  cy={100} rx={15} ry={17} fill="none" stroke="#00000028" strokeWidth={1.5} />
        <path d="M63 96 Q78 87 93 96"   fill="#00000018" />
        <path d="M64 106 Q78 112 92 106" fill="#0000000e" />

        <ellipse cx={122} cy={100} rx={15} ry={17} fill="white" />
        <Iris cx={122} cy={101} rx={11} ry={12} />
        <ellipse cx={122} cy={100} rx={15} ry={17} fill="none" stroke="#00000028" strokeWidth={1.5} />
        <path d="M107 96 Q122 87 137 96"   fill="#00000018" />
        <path d="M108 106 Q122 112 136 106" fill="#0000000e" />
      </g>
    );
  }

  // ── WIDE — surprised / excited, very large whites ─────────────────────────
  if (variant === "wide") {
    return (
      <g>
        <ellipse cx={78}  cy={99} rx={17} ry={19} fill="white" />
        <Iris cx={78} cy={100} rx={12} ry={13} />
        <ellipse cx={78}  cy={99} rx={17} ry={19} fill="none" stroke="#00000022" strokeWidth={1.5} />
        {/* Raised brow shadow */}
        <path d="M60 90 Q78 80 96 90" fill="none" stroke="#1a1a2e" strokeWidth={1.8} strokeLinecap="round" opacity={0.6} />

        <ellipse cx={122} cy={99} rx={17} ry={19} fill="white" />
        <Iris cx={122} cy={100} rx={12} ry={13} />
        <ellipse cx={122} cy={99} rx={17} ry={19} fill="none" stroke="#00000022" strokeWidth={1.5} />
        <path d="M104 90 Q122 80 140 90" fill="none" stroke="#1a1a2e" strokeWidth={1.8} strokeLinecap="round" opacity={0.6} />
      </g>
    );
  }

  // ── ALMOND — elegant, slightly upturned ──────────────────────────────────
  if (variant === "almond") {
    return (
      <g>
        <path d="M61 100 Q78 84 95 100 Q78 116 61 100Z" fill="white" />
        <Iris cx={78} cy={100} rx={9} ry={10} />
        <path d="M61 100 Q78 84 95 100"  fill="none" stroke="#1a1a2e" strokeWidth={1.8} />
        <line x1={67} y1={93} x2={63} y2={88} stroke="#1a1a2e" strokeWidth={1.3} strokeLinecap="round" />
        <line x1={75} y1={87} x2={74} y2={82} stroke="#1a1a2e" strokeWidth={1.3} strokeLinecap="round" />
        <line x1={84} y1={87} x2={85} y2={82} stroke="#1a1a2e" strokeWidth={1.3} strokeLinecap="round" />
        <line x1={91} y1={92} x2={95} y2={88} stroke="#1a1a2e" strokeWidth={1.3} strokeLinecap="round" />
        <path d="M61 100 Q78 116 95 100" fill="none" stroke="#1a1a2e55" strokeWidth={0.8} />

        <path d="M105 100 Q122 84 139 100 Q122 116 105 100Z" fill="white" />
        <Iris cx={122} cy={100} rx={9} ry={10} />
        <path d="M105 100 Q122 84 139 100" fill="none" stroke="#1a1a2e" strokeWidth={1.8} />
        <line x1={109} y1={93} x2={105} y2={88} stroke="#1a1a2e" strokeWidth={1.3} strokeLinecap="round" />
        <line x1={117} y1={87} x2={116} y2={82} stroke="#1a1a2e" strokeWidth={1.3} strokeLinecap="round" />
        <line x1={126} y1={87} x2={127} y2={82} stroke="#1a1a2e" strokeWidth={1.3} strokeLinecap="round" />
        <line x1={133} y1={92} x2={137} y2={88} stroke="#1a1a2e" strokeWidth={1.3} strokeLinecap="round" />
        <path d="M105 100 Q122 116 139 100" fill="none" stroke="#1a1a2e55" strokeWidth={0.8} />
      </g>
    );
  }

  // ── SLEEPY — half-closed, heavy drooping lid ──────────────────────────────
  if (variant === "sleepy") {
    return (
      <g>
        <ellipse cx={78}  cy={103} rx={13} ry={14} fill="white" />
        <Iris cx={78} cy={104} rx={9} ry={10} />
        {/* Heavy drooping lid covers top half */}
        <path d="M65 103 Q78 91 91 103" fill="#00000022" />
        <path d="M65 103 Q78 93 91 103" fill="none" stroke="#1a1a2e" strokeWidth={2} strokeLinecap="round" />
        <ellipse cx={78}  cy={103} rx={13} ry={14} fill="none" stroke="#00000018" strokeWidth={1} />

        <ellipse cx={122} cy={103} rx={13} ry={14} fill="white" />
        <Iris cx={122} cy={104} rx={9} ry={10} />
        <path d="M109 103 Q122 91 135 103" fill="#00000022" />
        <path d="M109 103 Q122 93 135 103" fill="none" stroke="#1a1a2e" strokeWidth={2} strokeLinecap="round" />
        <ellipse cx={122} cy={103} rx={13} ry={14} fill="none" stroke="#00000018" strokeWidth={1} />
      </g>
    );
  }

  // ── SHARP — angular, intense, slightly narrowed ───────────────────────────
  if (variant === "sharp") {
    return (
      <g>
        {/* Angular white — diamond-ish */}
        <path d="M62 100 Q70 90 78 90 Q86 90 94 100 Q86 110 78 110 Q70 110 62 100Z" fill="white" />
        <Iris cx={78} cy={100} rx={8} ry={9} />
        {/* Sharp upper lid line */}
        <path d="M62 100 Q70 89 78 89 Q86 89 94 100" fill="none" stroke="#1a1a2e" strokeWidth={2} strokeLinecap="round" />
        {/* Inner corner accent */}
        <path d="M62 100 Q65 103 68 104" fill="none" stroke="#1a1a2e50" strokeWidth={1} />

        <path d="M106 100 Q114 90 122 90 Q130 90 138 100 Q130 110 122 110 Q114 110 106 100Z" fill="white" />
        <Iris cx={122} cy={100} rx={8} ry={9} />
        <path d="M106 100 Q114 89 122 89 Q130 89 138 100" fill="none" stroke="#1a1a2e" strokeWidth={2} strokeLinecap="round" />
        <path d="M138 100 Q135 103 132 104" fill="none" stroke="#1a1a2e50" strokeWidth={1} />
      </g>
    );
  }

  // ── SMALL — calm, heavy-lidded (default) ─────────────────────────────────
  return (
    <g>
      <ellipse cx={78}  cy={101} rx={12} ry={13} fill="white" />
      <Iris cx={78} cy={102} rx={8} ry={9} />
      <path d="M66 98 Q78 90 90 98" fill="#00000022" />
      <path d="M66 98 Q78 92 90 98" fill="none" stroke="#1a1a2e" strokeWidth={1.5} strokeLinecap="round" />

      <ellipse cx={122} cy={101} rx={12} ry={13} fill="white" />
      <Iris cx={122} cy={102} rx={8} ry={9} />
      <path d="M110 98 Q122 90 134 98" fill="#00000022" />
      <path d="M110 98 Q122 92 134 98" fill="none" stroke="#1a1a2e" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
};
