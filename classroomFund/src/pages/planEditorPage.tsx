import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlanEditor } from "../features/plan/planEditor";
import { FooterButtons } from "../components/footerButtons";
import type { Plan, Room } from "../types/plan.types";
import { Header } from "../components/Header";

export const PlanEditorPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const plan = state as Plan;
  const [rooms, setRooms] = useState<Room[]>(plan.rooms || []);

  const handleSave = () => {
  const updatedPlan = {
    ...plan,
    rooms,
  };

  navigate("/plan", { state: updatedPlan });
};

  return (
    <div className="plan-page">
      <Header/>
      <div className="plan-content">
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