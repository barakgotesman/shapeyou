import { useRef, useState, useCallback, useId } from "react";
import type { AvatarConfig, EyeColor } from "../../lib/avatar";
import { Background } from "./Background";
import { Face } from "./Face";
import { Eyes } from "./Eyes";
import { Mouth } from "./Mouth";
import { Accessory } from "./Accessory";
import { Beard } from "./Beard";

const HAT_VARIANTS = new Set(["hat", "cowboy-hat", "beanie", "crown", "party-hat"]);

type Props = {
  config: AvatarConfig;
  className?: string;
  size?: number;
  // When true, disables all SVG animations — used in carousel for performance
  static?: boolean;
  // Owner-chosen accessory overrides — null = use auto, [] = none, [...] = render all
  chosenAccessory?: string[] | null;
};

export const AvatarDisplay = ({ config, className = "w-48 h-48", size, static: isStatic = false, chosenAccessory }: Props) => {
  // Normalize: null/undefined → auto (trait-generated), string (legacy) → wrap in array, array → use as-is
  const effectiveAccessories: string[] =
    chosenAccessory === null || chosenAccessory === undefined
      ? [config.accessory]
      : Array.isArray(chosenAccessory)
      ? chosenAccessory
      : [chosenAccessory as unknown as string];
  const svgRef = useRef<SVGSVGElement>(null);
  // Unique ID per instance — prevents SVG defs (gradients, clips) from colliding
  // when multiple avatars render on the same page (e.g. carousel)
  const uid = useId().replace(/:/g, "");

  // Eye gaze offset in SVG units — capped so pupils stay inside whites
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [hatAnim, setHatAnim] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();

    // Map mouse position relative to SVG center (100,100 in viewBox)
    const svgX = ((e.clientX - rect.left) / rect.width) * 200;
    const svgY = ((e.clientY - rect.top) / rect.height) * 200;
    const dx = svgX - 100;
    const dy = svgY - 100;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxGaze = 4; // max pupil travel in SVG units
    const scale = Math.min(dist, 60) / 60;
    setGaze({ x: (dx / dist || 0) * maxGaze * scale, y: (dy / dist || 0) * maxGaze * scale });
  }, []);

  const handleMouseLeave = useCallback(() => setGaze({ x: 0, y: 0 }), []);

  const handleHatClick = useCallback(() => {
    if (hatAnim) return;
    setHatAnim(true);
    setTimeout(() => setHatAnim(false), 700);
  }, [hatAnim]);

  return (
    <div
      className={className}
      onMouseMove={isStatic ? undefined : handleMouseMove}
      onMouseLeave={isStatic ? undefined : handleMouseLeave}
      style={size ? { width: size, height: size, pointerEvents: isStatic ? "none" : undefined } : isStatic ? { pointerEvents: "none" } : undefined}
    >
      <svg
        ref={svgRef}
        width={size ?? "100%"}
        height={size ?? "100%"}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <Background config={config} static={isStatic} uid={uid} />

        {/* Ground shadow — hidden in static mode */}
        {!isStatic && (
          <ellipse cx={100} cy={190} rx={48} ry={5} fill="#00000020">
            <animate attributeName="rx" values="48;34;48" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
            <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
          </ellipse>
        )}

        {/* Floating face group — static mode skips the float animateTransform */}
        <g>
          {!isStatic && <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-11; 0,0"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          />}

          <Face variant={config.faceShape} color={config.primaryColor} />

          {/* Eyes with gaze offset applied to iris+pupil layers only */}
          <EyesWithGaze variant={config.eyeType} eyeColor={config.eyeColor} gaze={gaze} />

          <Mouth variant={config.mouthType} />

          {/* Beard — drawn after mouth so it sits on top of chin */}
          {config.beard && (
            <Beard style={config.beardStyle} faceShape={config.faceShape} color={config.beardColor} />
          )}

          {/* Eyelashes — drawn over eyes, under accessories */}
          {config.eyelashes && (
            <g stroke="#1a1a2e" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.85">
              {/* Left eye */}
              <path d="M66 88 Q63 82 61 77" />
              <path d="M71 86 Q70 79 69 74" />
              <path d="M77 85 Q77 78 78 73" />
              <path d="M83 86 Q85 79 87 75" />
              <path d="M88 89 Q92 83 95 80" />
              {/* Right eye */}
              <path d="M110 89 Q107 83 105 80" />
              <path d="M116 86 Q115 79 113 75" />
              <path d="M122 85 Q122 78 122 73" />
              <path d="M128 86 Q130 79 132 75" />
              <path d="M133 88 Q137 82 139 77" />
            </g>
          )}

          {/* Non-hat accessories rendered inside the float group */}
          {effectiveAccessories.filter(a => !HAT_VARIANTS.has(a)).map(a => (
            <Accessory key={a} variant={a} color={config.accentColor} faceShape={config.faceShape} />
          ))}

          {/* Eyelid blink overlay — suppressed in static mode */}
          {!isStatic && <>
            <rect x={63} y={84} width={30} height={0} rx={8} fill={config.primaryColor}>
              <animate attributeName="height" values="0;0;0;0;0;32;0;0;0;0;0" keyTimes="0;0.1;0.2;0.3;0.55;0.6;0.65;0.75;0.85;0.95;1" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0.2 0 0.2 1;0.2 0 0.2 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1" />
            </rect>
            <rect x={107} y={84} width={30} height={0} rx={8} fill={config.primaryColor}>
              <animate attributeName="height" values="0;0;0;0;0;32;0;0;0;0;0" keyTimes="0;0.1;0.2;0.3;0.55;0.6;0.65;0.75;0.85;0.95;1" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0.2 0 0.2 1;0.2 0 0.2 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1" />
            </rect>
          </>}
        </g>

        {/* Hat-family accessories rendered outside float group for independent animation */}
        {effectiveAccessories.filter(a => HAT_VARIANTS.has(a)).map((a, i) => (
          <g
            key={a}
            onClick={isStatic ? undefined : handleHatClick}
            style={isStatic ? undefined : { cursor: "pointer" }}
          >
            {!isStatic && <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-11; 0,0"
              dur="3s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
            />}
            <g
              style={{
                transformOrigin: "100px 35px",
                transformBox: "fill-box",
                animation: hatAnim && i === 0
                  ? "hatJump 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards"
                  : "none",
              }}
            >
              <Accessory variant={a} color={config.hatColor} />
            </g>
          </g>
        ))}
      </svg>

      <style>{`
        @keyframes hatJump {
          0%   { transform: translateY(0px)   rotate(0deg);   }
          30%  { transform: translateY(-55px) rotate(180deg); }
          60%  { transform: translateY(-70px) rotate(360deg); }
          80%  { transform: translateY(-10px) rotate(360deg); }
          90%  { transform: translateY(-18px) rotate(360deg); }
          100% { transform: translateY(0px)   rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Pupil sizes per variant: [rx, ry, catchlight-r, catchlight-offset-x, catchlight-offset-y]
const PUPIL: Record<string, [number, number, number, number, number]> = {
  big:    [5,   6,   2.5, 4,  -5],
  wide:   [5.5, 6.5, 2.8, 4,  -6],
  small:  [4,   4.5, 1.8, 2,  -4],
  almond: [4,   5,   2,   3,  -4],
  sleepy: [4,   4,   1.8, 2,  -3],
  sharp:  [3.5, 4.5, 1.8, 3,  -4],
};
const EYE_CX = [78, 122] as const;
const EYE_CY: Record<string, number> = {
  big: 102, wide: 100, small: 103, almond: 100, sleepy: 104, sharp: 100,
};

const EyesWithGaze = ({
  variant,
  eyeColor,
  gaze,
}: {
  variant: string;
  eyeColor: EyeColor;
  gaze: { x: number; y: number };
}) => {
  const [rx, ry, clR, clDx, clDy] = PUPIL[variant] ?? PUPIL.small;
  const cy = EYE_CY[variant] ?? 101;

  return (
    <g>
      <Eyes variant={variant} eyeColor={eyeColor} />
      <g transform={`translate(${gaze.x}, ${gaze.y})`}>
        {EYE_CX.map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#0d0d1a" />
            <circle cx={cx + clDx} cy={cy + clDy} r={clR}   fill="white" opacity={0.9} />
            <circle cx={cx + 1}    cy={cy + ry - 2} r={clR * 0.5} fill="white" opacity={0.35} />
          </g>
        ))}
      </g>
    </g>
  );
};
