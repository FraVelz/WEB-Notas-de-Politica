"use client";

import { useGlobeStore } from "@/features/estadisticas-mundiales/interactive-globe/store/globeStore";

const CX = 40;
const CY = 40;

export function GlobeCompass() {
  const showGraticule = useGlobeStore((s) => s.showGraticule);
  const heading = useGlobeStore((s) => s.compassHeading);

  if (!showGraticule) return null;

  const needleDeg = (heading * 180) / Math.PI;

  return (
    <div
      className="pointer-events-none absolute right-4 top-[5.5rem] z-10 md:right-6 md:top-24"
      aria-label="Brújula de orientación"
      role="img"
    >
      <div className="rounded-full border border-border bg-elevated/90 p-1.5 shadow-[var(--shadow-theme)] backdrop-blur-md">
        <svg
          viewBox="0 0 80 80"
          className="size-[4.25rem] md:size-[4.75rem]"
          aria-hidden
        >
          <circle
            cx={CX}
            cy={CY}
            r="36"
            fill="var(--bg-muted)"
            fillOpacity="0.45"
          />
          <circle
            cx={CX}
            cy={CY}
            r="36"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle
            cx={CX}
            cy={CY}
            r="28"
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.5"
            strokeOpacity="0.6"
          />

          {[0, 90, 180, 270].map((deg) => (
            <line
              key={deg}
              x1={CX}
              y1={CY}
              x2={CX + Math.sin((deg * Math.PI) / 180) * 32}
              y2={CY - Math.cos((deg * Math.PI) / 180) * 32}
              stroke="var(--border)"
              strokeWidth="0.75"
              strokeOpacity="0.55"
            />
          ))}

          <text
            x={CX}
            y="11"
            textAnchor="middle"
            fill="var(--link)"
            fontSize="8.5"
            fontWeight="600"
            letterSpacing="0.06em"
          >
            N
          </text>
          <text
            x={CX}
            y="74"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="7.5"
            fontWeight="500"
            letterSpacing="0.04em"
          >
            S
          </text>
          <text
            x="8"
            y={CY + 3}
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="7.5"
            fontWeight="500"
            letterSpacing="0.04em"
          >
            O
          </text>
          <text
            x="72"
            y={CY + 3}
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="7.5"
            fontWeight="500"
            letterSpacing="0.04em"
          >
            E
          </text>

          <g transform={`rotate(${needleDeg} ${CX} ${CY})`}>
            <path
              d={`M ${CX} 14 L ${CX - 3.5} ${CY - 1} L ${CX} ${CY - 3} L ${CX + 3.5} ${CY - 1} Z`}
              fill="var(--link)"
            />
            <path
              d={`M ${CX} 66 L ${CX - 2.5} ${CY + 1} L ${CX} ${CY + 3} L ${CX + 2.5} ${CY + 1} Z`}
              fill="var(--text-muted)"
              fillOpacity="0.45"
            />
            <circle
              cx={CX}
              cy={CY}
              r="2.25"
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
