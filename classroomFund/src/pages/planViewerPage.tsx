
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { usePlanStore } from "../store/planStore";
import "../features/plan/styles/planManager.css";
import "../pages/styles/planViewerPage.css";

import type { RoomData } from "../types/plan.types";
import { RoomCard } from "../components/modals/roomCard";
import { PlanViewer } from "../features/plan/planViewer";

export const PlanViewerPage = () => {
  const activeBuildingId = usePlanStore((s) => s.activeBuildingId);

  const building = usePlanStore((s) =>
    s.buildings.find((b) => b.id === activeBuildingId)
  );

  const rooms = usePlanStore((s) => s.rooms);
  const updateRoom = usePlanStore((s) => s.updateRoom);

  const [activeFloor, setActiveFloor] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);

  useEffect(() => {
    if (!selectedRoom) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedRoom(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedRoom]);

  if (!building) return <div>Здание не найдено</div>;

  const floor = building.floors?.[activeFloor];

  if (!floor) {
    return (
      <div className="plan-page">
        <Header showSearch />
        <div className="empty-viewer">Этаж не найден</div>
      </div>
    );
  }

  return (
    <div className="plan-page">
      <Header showSearch />

      <div className="viewer-wrapper">
        <div className="viewer-center">
          <p className="viewer-title">{building.name}</p>

          {/* VIEWER */}
          {!floor.image ? (
            <div className="empty-viewer">
              Схема этажа не загружена
            </div>
          ) : (
            <PlanViewer
              schemaId={floor.id}
              image={floor.image}
              onRoomClick={(area) => {
                const roomId = area.roomId ?? area.id;

                const existingRoom = rooms.find((r) => r.id === roomId);

                setSelectedRoom(
                  existingRoom ?? {
                    id: roomId,
                    number: "",
                    floorId: floor.id,
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

          {/* MODAL */}
          {selectedRoom && (
            <div
              className="modal-overlay"
              onClick={() => setSelectedRoom(null)}
            >
              <div
                className="modal-content1"
                onClick={(e) => e.stopPropagation()}
              >
                <RoomCard
                  room={selectedRoom}
                  onClose={() => setSelectedRoom(null)}
                  onSave={(updated) => {
                    updateRoom(updated);
                    setSelectedRoom(updated);
                  }}
                />
              </div>
            </div>
          )}

          {/* FLOORS */}
          <div className="floors-bar">
            {building.floors.map((f, i) => (
              <button
                key={f.id}
                className={`floor-btn ${activeFloor === i ? "active" : ""}`}
                onClick={() => setActiveFloor(i)}
              >
                {f.number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};