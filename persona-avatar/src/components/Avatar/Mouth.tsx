type Props = { variant: string };

export const Mouth = ({ variant }: Props) => {
  if (variant === "grin") {
    return (
      <g>
        {/* Outer lip path */}
        <path d="M76 126 Q100 146 124 126 Q100 134 76 126Z" fill="#c0706090" />
        {/* Teeth as one clean white shape, no dividers */}
        <path d="M80 127 Q100 140 120 127 Q100 133 80 127Z" fill="white" />
        {/* Smile arc on top */}
        <path d="M76 126 Q100 146 124 126" fill="none" stroke="#7a3020" strokeWidth={1.5} strokeLinecap="round" />
        {/* Dimples */}
        <circle cx={73} cy={126} r={3} fill="#00000014" />
        <circle cx={127} cy={126} r={3} fill="#00000014" />
      </g>
    );
  }
  if (variant === "smirk") {
    return (
      <g>
        <path d="M82 128 Q100 138 120 123" fill="none" stroke="#7a3020" strokeWidth={2.5} strokeLinecap="round" />
        {/* Upper lip hint */}
        <path d="M82 128 Q91 125 100 127 Q110 123 120 123" fill="none" stroke="#a0504060" strokeWidth={1.5} strokeLinecap="round" />
        {/* Single dimple on raised side */}
        <circle cx={122} cy={125} r={2.5} fill="#00000012" />
      </g>
    );
  }
  if (variant === "smile") {
    return (
      <g>
        {/* Lip fill */}
        <path d="M78 126 Q100 142 122 126 Q100 133 78 126Z" fill="#c0706070" />
        {/* Smile arc */}
        <path d="M78 126 Q100 142 122 126" fill="none" stroke="#7a3020" strokeWidth={2} strokeLinecap="round" />
        {/* Upper lip */}
        <path d="M82 125 Q91 121 100 123 Q109 121 118 125" fill="none" stroke="#a0504060" strokeWidth={1.5} strokeLinecap="round" />
        {/* Dimples */}
        <circle cx={74} cy={126} r={3} fill="#00000012" />
        <circle cx={126} cy={126} r={3} fill="#00000012" />
      </g>
    );
  }
  // neutral
  return (
    <g>
      <path d="M84 128 Q100 131 116 128" fill="none" stroke="#7a3020" strokeWidth={2} strokeLinecap="round" />
      <path d="M87 126 Q93 123 100 125 Q107 123 113 126" fill="none" stroke="#a0504050" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
};
