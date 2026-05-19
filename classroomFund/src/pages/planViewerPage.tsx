
import { PlanViewer } from "../features/plan/planViewer";
import { useState } from "react";
import { Header } from "../components/Header";
import { usePlanStore } from "../store/planStore";
import "../features/plan/styles/planManager.css";
import "../pages/styles/planViewerPage.css";
import type { RoomData } from "../types/plan.types";
import { RoomCard } from "../components/modals/roomCard";

export const PlanViewerPage = () => {
  const activePlanId = usePlanStore((s) => s.activePlanId);

  const plan = usePlanStore((s) =>
    s.plans.find((p) => p.id === activePlanId)
  );

  const rooms = usePlanStore((s) => s.rooms);
  const updateRoom = usePlanStore((s) => s.updateRoom);

  const [activeFloor, setActiveFloor] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);

  if (!plan) return <div>План не найден</div>;

  const schema = plan.schemas[activeFloor];

  return (
    <div className="plan-page">
      <Header showSearch />

      <div className="viewer-wrapper">
        <div className="viewer-center">
          <p className="viewer-title">{plan.name}</p>

          {!schema?.image ? (
            <div className="empty-viewer">
              Схема этажа не загружена
            </div>
          ) : (
            <PlanViewer
              plan={plan}
              schema={schema}
              onRoomClick={(area) => {
                const roomId = area.roomId ?? area.id;

                const existingRoom = rooms.find((r) => r.id === roomId);

                setSelectedRoom(
                  existingRoom ?? {
                    id: roomId,
                    number: "",
                    floorId: String(activeFloor),
                    purpose: "",
                    capacity: 0,
                    description: "",
                    features: [],
                    media: [],
                  }
                );
              }}
            />
          )}

          {selectedRoom && (
            <RoomCard
              room={selectedRoom}
              onClose={() => setSelectedRoom(null)}
              onSave={(updated) => {
                updateRoom(updated);
                setSelectedRoom(updated);
              }}
            />
          )}

          <div className="floors-bar">
            {plan.schemas.map((s, i) => (
              <button
                key={s.id}
                className={`floor-btn ${activeFloor === i ? "active" : ""}`}
                onClick={() => setActiveFloor(i)}
              >
                {s.floor}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};