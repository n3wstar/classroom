
import type {
  ClickableArea,
  Plan,
  Schema,
} from "../../types/plan.types";

import "../../pages/styles/planEditor.css";

type Props = {
  plan: Plan;
  schema: Schema;
  onRoomClick: (area: ClickableArea) => void;
};

export const PlanViewer = ({ schema, onRoomClick }: Props) => {
  return (
    <div className="plan-canvas">

      <img
        src={schema.image}
        className="plan-image"
      />

      <svg
        className="plan-overlay"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
      >
        {schema.areas?.map((area) => (
          <polygon
            key={area.id}
            points={area.points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="#FFE082"
            opacity="0.5"
            style={{ cursor: "pointer" }}
            onClick={() => onRoomClick(area)}
          />
        ))}
      </svg>

    </div>
  );
};