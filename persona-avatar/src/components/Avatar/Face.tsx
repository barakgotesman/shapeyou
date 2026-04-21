type Props = { variant: string; color: string };

// Faces use multiple layers: base shape, jaw shadow, cheekbone highlight, temple shadow, blush
export const Face = ({ variant, color }: Props) => {
  if (variant === "round") {
    return (
      <g>
        {/* Base */}
        <ellipse cx={100} cy={112} rx={65} ry={66} fill={color} />
        {/* Jaw/chin shadow */}
        <ellipse cx={100} cy={158} rx={50} ry={22} fill="#00000018" />
        {/* Temple shadow left */}
        <ellipse cx={46} cy={100} rx={18} ry={28} fill="#00000010" />
        {/* Temple shadow right */}
        <ellipse cx={154} cy={100} rx={18} ry={28} fill="#00000010" />
        {/* Forehead highlight */}
        <ellipse cx={86} cy={74} rx={30} ry={20} fill="#ffffff22" />
        {/* Cheek highlight left */}
        <ellipse cx={60} cy={122} rx={16} ry={12} fill="#ffffff14" />
        {/* Blush left */}
        <ellipse cx={62} cy={130} rx={14} ry={9} fill="#ff6b6b1a" />
        {/* Blush right */}
        <ellipse cx={138} cy={130} rx={14} ry={9} fill="#ff6b6b1a" />
        {/* Ear left */}
        <ellipse cx={36} cy={112} rx={8} ry={12} fill={color} />
        <ellipse cx={36} cy={112} rx={5} ry={8}  fill="#00000018" />
        <ellipse cx={36} cy={112} rx={3} ry={5}  fill="#00000025" />
        {/* Ear right */}
        <ellipse cx={164} cy={112} rx={8} ry={12} fill={color} />
        <ellipse cx={164} cy={112} rx={5} ry={8}  fill="#00000018" />
        <ellipse cx={164} cy={112} rx={3} ry={5}  fill="#00000025" />
      </g>
    );
  }

  if (variant === "square") {
    return (
      <g>
        {/* Base — strong jaw with slight rounding */}
        <path d="M42 72 Q42 50 100 50 Q158 50 158 72 L158 148 Q158 172 100 172 Q42 172 42 148 Z" fill={color} />
        {/* Jaw shadow */}
        <path d="M55 155 Q100 175 145 155 Q145 170 100 172 Q55 170 55 155Z" fill="#00000018" />
        {/* Cheekbone highlight */}
        <ellipse cx={80} cy={78} rx={28} ry={16} fill="#ffffff20" />
        {/* Temple shadow */}
        <rect x={42} y={80} width={14} height={50} rx={7} fill="#00000012" />
        <rect x={144} y={80} width={14} height={50} rx={7} fill="#00000012" />
        {/* Jaw angle shadow left */}
        <path d="M42 140 Q50 165 68 170 Q52 168 42 148Z" fill="#00000018" />
        {/* Jaw angle shadow right */}
        <path d="M158 140 Q150 165 132 170 Q148 168 158 148Z" fill="#00000018" />
        {/* Blush */}
        <ellipse cx={64} cy={132} rx={14} ry={9} fill="#ff6b6b1a" />
        <ellipse cx={136} cy={132} rx={14} ry={9} fill="#ff6b6b1a" />
        {/* Ear left */}
        <ellipse cx={36} cy={112} rx={8} ry={13} fill={color} />
        <ellipse cx={36} cy={112} rx={5} ry={8}  fill="#00000018" />
        <ellipse cx={36} cy={112} rx={3} ry={5}  fill="#00000025" />
        {/* Ear right */}
        <ellipse cx={164} cy={112} rx={8} ry={13} fill={color} />
        <ellipse cx={164} cy={112} rx={5} ry={8}  fill="#00000018" />
        <ellipse cx={164} cy={112} rx={3} ry={5}  fill="#00000025" />
      </g>
    );
  }

  // oval — narrow, elegant, introverted
  return (
    <g>
      {/* Base */}
      <ellipse cx={100} cy={112} rx={52} ry={70} fill={color} />
      {/* Jaw shadow */}
      <ellipse cx={100} cy={162} rx={38} ry={18} fill="#00000018" />
      {/* Temple shadow */}
      <ellipse cx={54} cy={104} rx={12} ry={30} fill="#00000012" />
      <ellipse cx={146} cy={104} rx={12} ry={30} fill="#00000012" />
      {/* Forehead highlight */}
      <ellipse cx={88} cy={72} rx={22} ry={16} fill="#ffffff22" />
      {/* Cheekbone shadow — gives a sharper look */}
      <path d="M52 118 Q62 108 72 118 Q64 128 52 118Z" fill="#00000015" />
      <path d="M148 118 Q138 108 128 118 Q136 128 148 118Z" fill="#00000015" />
      {/* Blush — subtle on narrow face */}
      <ellipse cx={68} cy={128} rx={11} ry={7} fill="#ff6b6b18" />
      <ellipse cx={132} cy={128} rx={11} ry={7} fill="#ff6b6b18" />
      {/* Ear left */}
      <ellipse cx={50} cy={112} rx={7} ry={11} fill={color} />
      <ellipse cx={50} cy={112} rx={4} ry={7}  fill="#00000018" />
      <ellipse cx={50} cy={112} rx={2.5} ry={4} fill="#00000025" />
      {/* Ear right */}
      <ellipse cx={150} cy={112} rx={7} ry={11} fill={color} />
      <ellipse cx={150} cy={112} rx={4} ry={7}  fill="#00000018" />
      <ellipse cx={150} cy={112} rx={2.5} ry={4} fill="#00000025" />
    </g>
  );
};
