import type { Plan, Room } from "../../types/plan.types";
import "../plan/styles/planCard.css";

type Props = {
  plan: Plan;
  onRoomClick: (room: Room) => void;
};

export const PlanViewer = ({ plan, onRoomClick }: Props) => {
  return (
    <div>
      <h3>{plan.name}</h3>

      <div className="plan-canvas">
        <img src={plan.image} style={{ width: "100%" }} />

        {plan.rooms.map((r) => (
          <div
            key={r.id}
            className="room"
            style={{
              position: "absolute",
              left: `${r.x * 100}%`,
              top: `${r.y * 100}%`,
              width: `${r.w * 100}%`,
              height: `${r.h * 100}%`,
              background: "rgba(164, 162, 162, 0.3)",
              cursor: "pointer",
            }}
            onClick={() => onRoomClick(r)}
          />
        ))}
      </div>
    </div>
  );
};
