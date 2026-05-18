
import "../../pages/styles/planEditor.css";

import { useRef, useState } from "react";
import type { ClickableArea, Point } from "../../types/plan.types";
import trashIcon from "../../assets/Icon.png";

type Props = {
  image: string;
  areas: ClickableArea[];
  onChange: (areas: ClickableArea[]) => void;
  drawingMode: boolean;
};

export const PlanEditor = ({
  image,
  areas,
  onChange,
  drawingMode,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<ClickableArea | null>(null);


  const getPoint = (e: React.MouseEvent): Point => {
    if (!ref.current) return { x: 0, y: 0 };

    const rect = ref.current.getBoundingClientRect();

    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const isNearFirst = (p: Point, first: Point) => {
    return Math.abs(first.x - p.x) < 0.02 && Math.abs(first.y - p.y) < 0.02;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!drawingMode) return;

    const p = getPoint(e);

    setCurrent((prev) => {
      if (!prev) {
        return {
          id: Date.now().toString(),
          points: [p],
        };
      }

      const first = prev.points[0];

      // замыкание
      if (prev.points.length >= 3 && isNearFirst(p, first)) {
        const closed: ClickableArea = {
          ...prev,
          points: [...prev.points, first],
        };

        const updated = [...areas, closed];

        setTimeout(() => onChange(updated), 0);

        return null;
      }

      return {
        ...prev,
        points: [...prev.points, p],
      };
    });
  };


  return (
    <div className="editor-wrapper">
      <div className="plan-canvas" ref={ref} onClick={handleClick}>
        <img src={image} className="plan-image" />

        <svg
          className="plan-overlay"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
        >
          {/* AREAS */}
          {areas.map((area) => {

            const centerX =
              area.points.reduce((sum, p) => sum + p.x, 0) / area.points.length;

            const centerY =
              area.points.reduce((sum, p) => sum + p.y, 0) / area.points.length;

            const size = 0.015;

            return (
              <g key={area.id}>
                <polygon
                  points={area.points.map((p) => `${p.x},${p.y}`).join(" ")}
                  fill="#FFE082"
                  opacity="0.5"
                  stroke="#FFC107"
                  strokeWidth="0.003"
                  cursor="pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(areas.filter((a) => a.id !== area.id));
                  }}
                />

                <image
                  href={trashIcon}
                  x={centerX - size / 2}
                  y={centerY - size / 2}
                  width={size}
                  height={size}
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(areas.filter((a) => a.id !== area.id));
                  }}
                />
              </g>
            );
          })}

          {/* текущая линия */}
          {current && (
            <polyline
              points={current.points.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#FFC107"
              strokeWidth="0.003"
            />
          )}

          {/* первая точка */}
          {current?.points?.[0] && (
            <circle
              cx={current.points[0].x}
              cy={current.points[0].y}
              r={0.002}
              fill="rgba(0,255,0,0.2)"
            />
          )}
        </svg>
      </div>
    </div>
  );
};