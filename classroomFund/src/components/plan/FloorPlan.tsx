import { useState } from "react";
import rtfPlan from "../../assets/RI-RTFplan/RI-RTFfirstFloor.svg";
import "./floorPlan.css";


type Room = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const rooms: Room[] = [
  { id: "100", x: 0, y: 0, w: 0, h: 0 },
  { id: "101", x: 0, y: 0, w: 0, h: 0 },
  { id: "102", x: 0, y: 0, w: 0, h: 0 },
  { id: "103", x: 0, y: 0, w: 0, h: 0},

  { id: "104", x: 0, y: 0, w: 0, h: 0 },
  { id: "105", x: 0, y: 0, w: 0, h: 0 },
  { id: "106", x: 0, y: 0, w: 0, h: 0 },
  { id: "107", x: 0, y: 0, w: 0, h: 0 },
];

export const FloorPlan = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="plan-container">
      <img src={rtfPlan} className="plan-img" />

      {rooms.map((room) => (
        <div
          key={room.id}
          className="room"
          style={{
            left: `${room.x * 100}%`,
            top: `${room.y * 100}%`,
            width: `${room.w * 100}%`,
            height: `${room.h * 100}%`,
          }}
          onClick={() => setSelected(room.id)}
        />
      ))}

      {selected && (
        <div className="modal">
          Аудитория {selected}
        </div>
      )}
    </div>
  );
};