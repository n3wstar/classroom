import type { Plan, Room } from "../../types/plan.types";

type Props = {
  plan: Plan;
};

export const PlanViewer = ({ plan }: Props) => {
  return (
    <div>
      <h3>{plan.name}</h3>

      <div style={{ position: "relative", width: 800 }}>
        <img src={plan.image} style={{ width: "100%" }} />

        {plan.rooms.map((r: Room) => (
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
              zIndex: 10,
            }}
            onClick={() => alert("Аудитория " + r.id)}
          />
        ))}
      </div>
    </div>
  );
};