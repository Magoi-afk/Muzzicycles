import { useId } from "react";
import { cn } from "../../lib/utils";

interface HexagonPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  hexagons?: [x: number, y: number][];
  className?: string;
  [key: string]: any;
}

/**
 * HexagonPattern component.
 * Tiling hexagons is tricky; this is a simplified version that follows the Magic UI style.
 */
export function HexagonPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  hexagons,
  className,
  ...props
}: HexagonPatternProps) {
  const id = useId();

  // Points for a regular hexagon centered in width x height
  const w = width;
  const h = height;
  const p1 = `${w / 2} 0`;
  const p2 = `${w * 0.933} ${h * 0.25}`;
  const p3 = `${w * 0.933} ${h * 0.75}`;
  const p4 = `${w / 2} ${h}`;
  const p5 = `${w * 0.067} ${h * 0.75}`;
  const p6 = `${w * 0.067} ${h * 0.25}`;
  const hexagonPath = `M${p1}L${p2}V${p3}L${p4}L${p5}V${p6}L${p1}Z`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/30 stroke-neutral-400/30",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={hexagonPath}
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {hexagons && (
        <svg x={x} y={y} className="overflow-visible">
          {hexagons.map(([x, y], i) => (
            <path
              key={`${x}-${y}-${i}`}
              d={hexagonPath}
              strokeWidth="0"
              transform={`translate(${x * width}, ${y * height})`}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
