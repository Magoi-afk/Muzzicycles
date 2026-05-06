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

  // Hexagon path for a 40x40 area (approx)
  // points: (20,0), (37.32, 10), (37.32, 30), (20, 40), (2.68, 30), (2.68, 10)
  const hexagonPath = "M20 0L37.3205 10V30L20 40L2.67949 30V10L20 0Z";

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
