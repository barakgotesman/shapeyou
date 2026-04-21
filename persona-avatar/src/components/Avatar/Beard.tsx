type Props = { style: "full" | "stubble" | "goatee"; faceShape: string; color: string };

export const Beard = ({ style, faceShape, color }: Props) => {
  // Chin bottom Y varies by face shape
  const chinY  = faceShape === "oval" ? 180 : faceShape === "square" ? 170 : 176;
  const jawL   = faceShape === "oval" ?  56 : faceShape === "square" ?  44 :  40;
  const jawR   = faceShape === "oval" ? 144 : faceShape === "square" ? 156 : 160;
  const midY   = (chinY + 148) / 2;  // midpoint between mouth-base and chin

  // ── FULL BEARD ────────────────────────────────────────────────────────────
  if (style === "full") {
    return (
      <g>
        {/* Main beard body */}
        <path
          d={`M ${jawL} 145 Q ${jawL - 4} ${midY} ${jawL + 2} ${chinY - 4}
              Q 100 ${chinY + 4} ${jawR - 2} ${chinY - 4}
              Q ${jawR + 4} ${midY} ${jawR} 145
              Q 130 148 100 150 Q 70 148 ${jawL} 145 Z`}
          fill={color}
          opacity={0.88}
        />
        {/* Shading on sides */}
        <path
          d={`M ${jawL} 145 Q ${jawL - 4} ${midY} ${jawL + 2} ${chinY - 4} Q ${jawL + 16} ${chinY - 2} ${jawL + 14} 148 Z`}
          fill="#00000018"
        />
        <path
          d={`M ${jawR} 145 Q ${jawR + 4} ${midY} ${jawR - 2} ${chinY - 4} Q ${jawR - 16} ${chinY - 2} ${jawR - 14} 148 Z`}
          fill="#00000018"
        />
        {/* Chin highlight */}
        <ellipse cx={100} cy={chinY - 8} rx={18} ry={7} fill="white" opacity={0.08} />
        {/* Moustache */}
        <path d="M 82 140 Q 88 136 100 138 Q 112 136 118 140 Q 110 143 100 142 Q 90 143 82 140 Z"
          fill={color} opacity={0.9} />
        {/* Hair texture lines */}
        <g stroke="white" strokeWidth="0.7" strokeLinecap="round" opacity={0.2}>
          <path d={`M ${jawL + 6} 150 Q ${jawL + 4} ${midY + 4} ${jawL + 8} ${chinY - 10}`} fill="none" />
          <path d={`M 88 150 Q 86 ${midY + 6} 86 ${chinY - 8}`} fill="none" />
          <path d={`M 100 151 Q 100 ${midY + 8} 100 ${chinY - 4}`} fill="none" />
          <path d={`M 112 150 Q 114 ${midY + 6} 114 ${chinY - 8}`} fill="none" />
          <path d={`M ${jawR - 6} 150 Q ${jawR - 4} ${midY + 4} ${jawR - 8} ${chinY - 10}`} fill="none" />
        </g>
        {/* Dark edge for depth */}
        <path
          d={`M ${jawL} 145 Q ${jawL - 4} ${midY} ${jawL + 2} ${chinY - 4}
              Q 100 ${chinY + 4} ${jawR - 2} ${chinY - 4}
              Q ${jawR + 4} ${midY} ${jawR} 145`}
          fill="none" stroke="#00000025" strokeWidth={1.5} strokeLinejoin="round"
        />
      </g>
    );
  }

  // ── STUBBLE ───────────────────────────────────────────────────────────────
  if (style === "stubble") {
    const dots: [number, number, number][] = [];
    // Distribute dots across jaw/chin area using a deterministic grid
    for (let xi = 0; xi < 9; xi++) {
      for (let yi = 0; yi < 5; yi++) {
        const x = jawL + 8 + xi * ((jawR - jawL - 16) / 8);
        const y = 148 + yi * ((chinY - 148) / 4);
        // Slight organic offset using xi+yi pattern
        const ox = ((xi * 3 + yi * 7) % 7) - 3;
        const oy = ((xi * 5 + yi * 3) % 5) - 2;
        // Skip dots that fall outside the oval chin shape
        const dx = (x - 100) / (jawR - 100 + 10);
        const dy = (y - 162) / (chinY - 162 + 10);
        if (dx * dx + dy * dy < 1.3) dots.push([x + ox, y + oy, 1.1 + (xi % 3) * 0.3]);
      }
    }
    return (
      <g opacity={0.7}>
        {dots.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={0.6 + (i % 4) * 0.1} />
        ))}
        {/* Upper lip stubble */}
        {[84,90,96,102,108,114].map((x, i) => (
          <circle key={`ul${i}`} cx={x} cy={140} r={0.9} fill={color} opacity={0.5} />
        ))}
      </g>
    );
  }

  // ── GOATEE ────────────────────────────────────────────────────────────────
  return (
    <g>
      {/* Chin patch */}
      <path
        d={`M 86 152 Q 84 ${chinY - 2} 100 ${chinY + 2} Q 116 ${chinY - 2} 114 152 Q 107 155 100 155 Q 93 155 86 152 Z`}
        fill={color} opacity={0.9}
      />
      {/* Shading */}
      <path
        d={`M 86 152 Q 84 ${chinY - 2} 100 ${chinY + 2} Q 116 ${chinY - 2} 114 152`}
        fill="none" stroke="#00000022" strokeWidth={1.2}
      />
      {/* Highlight */}
      <ellipse cx={100} cy={chinY - 6} rx={10} ry={5} fill="white" opacity={0.1} />
      {/* Moustache */}
      <path d="M 84 140 Q 90 136 100 138 Q 110 136 116 140 Q 108 144 100 143 Q 92 144 84 140 Z"
        fill={color} opacity={0.88}
      />
      {/* Hair lines */}
      <g stroke="white" strokeWidth="0.7" strokeLinecap="round" opacity={0.22}>
        <path d={`M 92 154 Q 91 ${chinY - 6} 92 ${chinY}`} fill="none" />
        <path d={`M 100 156 Q 100 ${chinY - 4} 100 ${chinY + 2}`} fill="none" />
        <path d={`M 108 154 Q 109 ${chinY - 6} 108 ${chinY}`} fill="none" />
      </g>
    </g>
  );
};
