
import "../plan/styles/planCard.css";

import type {
  Plan,
  Room,
  Schema,
} from "../../types/plan.types";

import "../plan/styles/planCard.css";

type Props = {
  plan: Plan;

  schema: Schema;

  onRoomClick: (room: Room) => void;
};

export const PlanViewer = ({
  plan,
  schema,
  onRoomClick,
}: Props) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        {plan.name}
      </h2>

      <div
        className="plan-canvas"
        style={{
          position: "relative",
          width: "100%",
        }}
      >

        {/* СХЕМА */}
        {schema.image ? (
          <img
            src={schema.image}
            style={{
              width: "100%",
              display: "block",
              borderRadius: 16,
            }}
          />
        ) : (
          <div
            style={{
              height: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f5",
              borderRadius: 16,
              color: "#999",
              fontSize: 18,
            }}
          >
            Схема не загружена
          </div>
        )}

        {/* КОМНАТЫ */}
        {schema.rooms.map((room) => (
          <div
            key={room.id}
            className="room"
            onClick={() => onRoomClick(room)}
            style={{
              position: "absolute",

              left: `${room.x * 100}%`,
              top: `${room.y * 100}%`,

              width: `${room.w * 100}%`,
              height: `${room.h * 100}%`,

              background:
                "rgba(37, 99, 235, 0.25)",

              border:
                "2px solid rgba(37, 99, 235, 0.8)",

              borderRadius: 8,

              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};