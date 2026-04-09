import { useState } from "react";
import { PlanEditor} from "../plan/planEditor"
import { PlanViewer } from "./planViewer";
import { PlanList } from "./planList";
import type { Plan } from "../../types/plan.types";
import type { Room } from "../../types/plan.types";
import { Header } from "../../components/Header";
import "../../pages/PlanManagerPage/styles.css";
import "../plan/planManager.css";


export const PlanManager = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [viewPlan, setViewPlan] = useState<Plan | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const image = URL.createObjectURL(file);

    setEditingPlan({
      id: Date.now().toString(),
      name: file.name,
      image,
      rooms: [],
    });

    setViewPlan(null);
  };

  const handleSave = (rooms: Room[]) => {
    if (!editingPlan) return;

    const newPlan = { ...editingPlan, rooms };

    setPlans([...plans, newPlan]);
    setEditingPlan(null);
  };

  return (
    <div className="plan-page">
      <Header />

      {/* основная область */}
      <div className="plan-content">
        {!editingPlan && !viewPlan && (
          <h2 className="empty-text">Схема этажа не загружена</h2>
        )}

        {editingPlan && (
          <PlanEditor image={editingPlan.image} onSave={handleSave} />
        )}

        {viewPlan && <PlanViewer plan={viewPlan} />}
      </div>

      {/* кнопка снизу */}
      <div className="plan-footer">
        <label className="upload-btn">
          Загрузить схему
          <input type="file" onChange={handleUpload} hidden />
        </label>
      </div>

      
      <PlanList plans={plans} onSelect={setViewPlan} />
    </div>
  );
};