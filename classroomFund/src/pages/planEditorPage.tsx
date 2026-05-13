import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";
import { PlanEditor } from "../features/plan/planEditor";
import type { Room } from "../types/plan.types";
import { usePlanStore } from "../store/planStore";

import "../pages/styles/planEditor.css";

export const PlanEditorPage = () => {
  const navigate = useNavigate();

  const activePlanId = usePlanStore((s) => s.activePlanId);

  const plan = usePlanStore((s) =>
    s.plans.find((p) => p.id === activePlanId)
  );

  const updatePlanRooms = usePlanStore((s) => s.updatePlanRooms);

  const [rooms, setRooms] = useState<Room[]>(plan?.rooms || []);

  if (!plan) {
    return <div>План не найден</div>;
  }

  const handleSave = () => {
    updatePlanRooms(plan.id, rooms);
    navigate("/plan");
  };

  return (
    <div className="editor-page">
      <Header />

      <div className="editor-content">
        <div className="editor-top">
          <h2>Редактор схем</h2>
          <p>{plan.name}</p>
        </div>

        <PlanEditor
          image={plan.image}
          onChange={setRooms}
          initialRooms={plan.rooms}
        />
      </div>

      <div className="editor-footer">
        <button
          className="footer-btn cancel"
          onClick={() => navigate("/")}
        >
          Отменить
        </button>

        <button
          className="footer-btn save"
          onClick={handleSave}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};