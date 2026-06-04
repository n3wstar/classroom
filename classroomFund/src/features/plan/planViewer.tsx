
import { useEffect, useState } from "react";
import type { ClickableArea, Point } from "../../types/plan.types";
import { clickableAreasApi } from "../../api/lickableAreasApi";

import "../../pages/styles/planEditor.css";

type Props = {
  schemaId: string;
  image: string;
  onRoomClick: (area: ClickableArea) => void;
};

export const PlanViewer = ({ schemaId, image, onRoomClick }: Props) => {
  const [areas, setAreas] = useState<ClickableArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await clickableAreasApi.getBySchema(schemaId);
        setAreas(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [schemaId]);

  if (loading) {
    return <div>Загрузка схемы...</div>;
  }

  return (
    <div className="plan-canvas">
      <img src={image} className="plan-image" />

      <svg
        className="plan-overlay"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
      >
        {areas.map((area) => (
          <polygon
            key={area.id}
            points={area.points
              .map((p: Point) => `${p.x},${p.y}`)
              .join(" ")}
            fill="#94A3B8"
            opacity="0.3"
            style={{ cursor: "pointer" }}
            onClick={() => onRoomClick(area)}
          />
        ))}
      </svg>
    </div>
  );
};