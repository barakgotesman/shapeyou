import type { AvatarConfig } from "../../lib/avatar";

type Props = {
  config: AvatarConfig;
  static?: boolean;
  // Unique prefix for all SVG IDs — prevents collisions when multiple avatars render on the same page
  uid?: string;
};

export const Background = ({ config, static: isStatic = false, uid = "av" }: Props) => {
  const { backgroundColor, bgGradientEnd, primaryColor, accentColor, personality } = config;
  const { warm, creative, calm, funny, social } = personality;
  // Prefix every defs ID with uid so multiple avatars on the same page don't share gradients/clips
  const id = (name: string) => `${uid}-${name}`;

  return (
    <g>
      <defs>
        <clipPath id={id("card-clip")}>
          <rect x={0} y={0} width={200} height={200} rx={20} />
        </clipPath>

        <linearGradient id={id("bg-grad")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={backgroundColor} />
          <stop offset="100%" stopColor={bgGradientEnd} />
        </linearGradient>

        <radialGradient id={id("orb-a")} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={primaryColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0"   />
        </radialGradient>
        <radialGradient id={id("orb-b")} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={accentColor} stopOpacity="0.38" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0"   />
        </radialGradient>

        <mask id={id("face-mask")}>
          <rect x={0} y={0} width={200} height={200} fill="white" />
          <ellipse cx={100} cy={112} rx={68} ry={72} fill="black" />
        </mask>
      </defs>

      {/* ── Gradient base ── */}
      <rect x={0} y={0} width={200} height={200} rx={20} fill={`url(#${id("bg-grad")})`} />

      {/* ── Drifting colour orbs ── */}
      <g clipPath={`url(#${id("card-clip")})`}>
        <ellipse cx={20} cy={30} rx={70} ry={60} fill={`url(#${id("orb-a")})`}>
          {!isStatic && <animateTransform attributeName="transform" type="translate"
            values="0,0; 18,14; 0,0" dur="9s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />}
        </ellipse>
        <ellipse cx={185} cy={175} rx={75} ry={65} fill={`url(#${id("orb-b")})`}>
          {!isStatic && <animateTransform attributeName="transform" type="translate"
            values="0,0; -16,-18; 0,0" dur="12s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />}
        </ellipse>
        <ellipse cx={100} cy={10} rx={50} ry={35} fill={`url(#${id("orb-b")})`} opacity={0.6}>
          {!isStatic && <animateTransform attributeName="transform" type="translate"
            values="0,0; 8,6; 0,0" dur="7s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />}
        </ellipse>
      </g>

      {/* ── WARM: sunburst behind face ── */}
      {warm && (
        <g clipPath={`url(#${id("card-clip")})`} mask={`url(#${id("face-mask")})`} opacity={0.12}>
          {[0,22,44,66,88,110,132,154,176,198,220,242,264,286,308,330].map(a => (
            <line key={a}
              x1={100} y1={100}
              x2={100 + Math.cos(a * Math.PI / 180) * 160}
              y2={100 + Math.sin(a * Math.PI / 180) * 160}
              stroke={primaryColor} strokeWidth={8} strokeLinecap="round" />
          ))}
        </g>
      )}

      {/* ── WARM: bouncing corner dots ── */}
      {warm && (
        <g clipPath={`url(#${id("card-clip")})`}>
          {([
            { cx:18,  cy:26,  r:11, dur:"3.2s", v:"0,0;6,9;0,0"   },
            { cx:180, cy:18,  r:8,  dur:"2.8s", v:"0,0;-6,11;0,0" },
            { cx:184, cy:176, r:13, dur:"4.1s", v:"0,0;-9,-8;0,0" },
            { cx:14,  cy:174, r:9,  dur:"3.6s", v:"0,0;8,-9;0,0"  },
            { cx:100, cy:8,   r:6,  dur:"2.5s", v:"0,0;4,7;0,0"   },
            { cx:192, cy:98,  r:6,  dur:"3.8s", v:"0,0;-6,5;0,0"  },
            { cx:8,   cy:105, r:5,  dur:"4.4s", v:"0,0;5,-6;0,0"  },
          ] as const).map(({ cx, cy, r, dur, v }) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={accentColor} opacity={0.45}>
              {!isStatic && <animateTransform attributeName="transform" type="translate"
                values={v} dur={dur} repeatCount="indefinite"
                calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />}
            </circle>
          ))}
        </g>
      )}

      {/* ── COOL: concentric ripple rings ── */}
      {!warm && (
        <g clipPath={`url(#${id("card-clip")})`}>
          {[24, 46, 68, 90, 112, 134, 156].map((r, i) => (
            <ellipse key={r} cx={100} cy={115} rx={r} ry={r * 0.72}
              fill="none" stroke={primaryColor} strokeWidth={1.6}
              opacity={0.22 - i * 0.025}>
              {!isStatic && <>
                <animate attributeName="rx"
                  values={`${r};${r + 12};${r}`} dur={`${6 + i * 0.9}s`}
                  repeatCount="indefinite" calcMode="spline"
                  keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                <animate attributeName="ry"
                  values={`${r * 0.72};${(r + 12) * 0.72};${r * 0.72}`}
                  dur={`${6 + i * 0.9}s`} repeatCount="indefinite"
                  calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
              </>}
            </ellipse>
          ))}
        </g>
      )}

      {/* ── CREATIVE: spinning geometric shapes ── */}
      {creative && (
        <g clipPath={`url(#${id("card-clip")})`} opacity={0.3}>
          <polygon points="164,6 192,52 136,52" fill={accentColor}>
            {!isStatic && <animateTransform attributeName="transform" type="rotate"
              values="0 164 29;360 164 29" dur="11s" repeatCount="indefinite" />}
          </polygon>
          <rect x={4} y={148} width={28} height={28} rx={5} fill={primaryColor} opacity={0.6}>
            {!isStatic && <animateTransform attributeName="transform" type="rotate"
              values="0 18 162;-360 18 162" dur="8s" repeatCount="indefinite" />}
          </rect>
          <polygon points="186,84 198,100 186,116 174,100" fill={accentColor} opacity={0.6}>
            {!isStatic && <animateTransform attributeName="transform" type="rotate"
              values="0 186 100;360 186 100" dur="6s" repeatCount="indefinite" />}
          </polygon>
          <circle cx={12} cy={78} r={9} fill={primaryColor} opacity={0.45}>
            {!isStatic && <animate attributeName="r" values="9;14;9" dur="4s"
              repeatCount="indefinite" calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />}
          </circle>
          <polygon points="186,148 194,156 186,164 178,156" fill={primaryColor} opacity={0.35}>
            {!isStatic && <animateTransform attributeName="transform" type="rotate"
              values="0 186 156;-360 186 156" dur="9s" repeatCount="indefinite" />}
          </polygon>
        </g>
      )}

      {/* ── FUNNY: twinkling stars ── */}
      {funny && (
        <g clipPath={`url(#${id("card-clip")})`} opacity={0.35}>
          {([
            { x:24,  y:158, s:1.2, dur:"2.2s" },
            { x:174, y:38,  s:1.0, dur:"2.8s" },
            { x:10,  y:52,  s:0.8, dur:"3.1s" },
            { x:187, y:158, s:1.1, dur:"2.5s" },
            { x:88,  y:6,   s:0.9, dur:"3.4s" },
            { x:6,   y:130, s:0.7, dur:"2.0s" },
            { x:190, y:60,  s:0.8, dur:"2.6s" },
          ] as const).map(({ x, y, s, dur }) => (
            <g key={`${x}-${y}`} transform={`translate(${x},${y}) scale(${s})`}>
              <path d="M0-9 L2-3 L8.5-2.8 L3.5 1 L5.3 8.5 L0 4.5 L-5.3 8.5 L-3.5 1 L-8.5-2.8 L-2-3 Z"
                fill={accentColor}>
                {!isStatic && <>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={dur} repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="rotate"
                    values="0;25;0" dur={dur} repeatCount="indefinite"
                    calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                </>}
              </path>
            </g>
          ))}
        </g>
      )}

      {/* ── CALM: large drifting soft blobs ── */}
      {calm && (
        <g clipPath={`url(#${id("card-clip")})`}>
          <ellipse cx={28} cy={38} rx={52} ry={42} fill={primaryColor} opacity={0.13}>
            {!isStatic && <animateTransform attributeName="transform" type="translate"
              values="0,0;14,10;0,0" dur="10s" repeatCount="indefinite"
              calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />}
          </ellipse>
          <ellipse cx={172} cy={168} rx={58} ry={48} fill={accentColor} opacity={0.11}>
            {!isStatic && <animateTransform attributeName="transform" type="translate"
              values="0,0;-12,-14;0,0" dur="13s" repeatCount="indefinite"
              calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />}
          </ellipse>
          <ellipse cx={10} cy={120} rx={35} ry={28} fill={primaryColor} opacity={0.1}>
            {!isStatic && <animateTransform attributeName="transform" type="translate"
              values="0,0;10,0;0,0" dur="8s" repeatCount="indefinite"
              calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />}
          </ellipse>
        </g>
      )}

      {/* ── SOCIAL: pulsing node graph ── */}
      {social && (
        <g clipPath={`url(#${id("card-clip")})`} opacity={0.22}>
          {([
            [16,16,48,40],[48,40,26,70],[48,40,80,26],[26,70,58,88],[80,26,108,16],[108,16,136,36],
          ] as const).map(([x1,y1,x2,y2]) => (
            <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={primaryColor} strokeWidth={1.6}>
              {!isStatic && <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />}
            </line>
          ))}
          {([
            {cx:16, cy:16, r:4},{cx:48,cy:40,r:6},{cx:26,cy:70,r:3.5},
            {cx:80, cy:26, r:4},{cx:108,cy:16,r:3},{cx:58,cy:88,r:3},{cx:136,cy:36,r:3.5},
          ] as const).map(({cx,cy,r}) => (
            <circle key={`n${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={accentColor}>
              {!isStatic && <animate attributeName="r" values={`${r};${r+2.5};${r}`} dur="2.5s" repeatCount="indefinite" />}
            </circle>
          ))}
        </g>
      )}

      {/* ── Always: dot grid ── */}
      <g clipPath={`url(#${id("card-clip")})`}>
        {[20,55,90,125,160,195].map(x =>
          [20,55,90,125,160,195].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={1.4} fill="white" opacity={0.14} />
          ))
        )}
      </g>

      {/* ── Always: corner arc accents ── */}
      <g clipPath={`url(#${id("card-clip")})`}>
        <path d="M0 65 Q0 0 65 0" fill="none" stroke="white"
          strokeWidth={20} opacity={0.1} strokeLinecap="round" />
        <path d="M200 135 Q200 200 135 200" fill="none" stroke="white"
          strokeWidth={20} opacity={0.1} strokeLinecap="round" />
      </g>

      {/* ── Border glow ── */}
      <rect x={0} y={0} width={200} height={200} rx={20}
        fill="none" stroke="white" strokeWidth={2.5} opacity={0.22} />
    </g>
  );
};
