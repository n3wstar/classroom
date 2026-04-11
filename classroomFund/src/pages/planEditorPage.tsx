import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlanEditor } from "../features/plan/planEditor";
import { FooterButtons } from "../components/footerButtons";
import type { Room } from "../types/plan.types";
import { Header } from "../components/Header";
import { usePlanStore } from "../store/planStore";

export const PlanEditorPage = () => {
  
  const navigate = useNavigate();

  const updatePlanRooms = usePlanStore((s) => s.updatePlanRooms);

  const activePlanId = usePlanStore((s) => s.activePlanId);

  const plan = usePlanStore((s) =>
  s.plans.find((p) => p.id === activePlanId)
);


  const [rooms, setRooms] = useState<Room[]>([]);

  if (!plan) return <div>Нет плана</div>;

  const handleSave = () => {
  updatePlanRooms(plan.id, rooms); // 🔥 сохраняем комнаты
  navigate("/plan");
  };


  return (
    <div className="plan-page">
      <Header/>
      <div className="plan-content editor">
        <PlanEditor image={plan.image} onChange={setRooms} />
      </div>

      <FooterButtons
        mode="edit"
        onSave={handleSave}
        onCancel={() => navigate("/")}
      />
    </div>
  );
};