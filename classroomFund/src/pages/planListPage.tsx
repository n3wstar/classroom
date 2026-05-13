
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header";
import { PlanList } from "../features/plan/planList";
import { CreateBuildingModal } from "../components/modals/CreateBuildingModal";

import { usePlanStore } from "../store/planStore";

import "../pages/styles/planListPage.css";
import type { Plan } from "../types/plan.types";
import { EditBuildingModal } from "../components/modals/EditBuildingModal";

export const PlanListPage = () => {
  const navigate = useNavigate();

  const plans = usePlanStore((s) => s.plans);
  const addPlan = usePlanStore((s) => s.addPlan);
  const deletePlan = usePlanStore((s) => s.deletePlan);
  const setActivePlan = usePlanStore((s) => s.setActivePlan);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);


  const [open, setOpen] = useState(false);

  const handleCreate = (data: {
    name: string;
    image: string;
    imageName: string;
    floors: number;
  }) => {
    const newPlan = {
      id: Date.now().toString(),

      name: data.name,

      previewImage: data.image,
      previewImageName: data.imageName,

      schemas: Array.from(
        { length: data.floors },
        (_, i) => ({
          id: `${Date.now()}-${i}`,
          floor: i + 1,
          image: "",
          rooms: [],
        })
      ),
    };

    addPlan(newPlan);
    setOpen(false);

  };

  return (
    <div className="plan-page">
      <Header />


      <h1 className="page-title">Все здания</h1>

      <button className="add-btn" onClick={() => setOpen(true)}>
        + Добавить здание
      </button>

      <PlanList
        plans={plans}
        onSelect={(plan) => {
          setActivePlan(plan.id);
          navigate("viewer");
        }}
        onEdit={(plan) => {
          setEditingPlan(plan);
        }}
        onDelete={(id) => {
          deletePlan(id);
        }}
      />
      {open && (
        <CreateBuildingModal
          onClose={() => setOpen(false)}
          onSave={handleCreate}
        />
      )}
      {editingPlan && (
        <EditBuildingModal
          plan={editingPlan}
          onClose={() =>
            setEditingPlan(null)
          }
        />
      )}
    </div>
  );
};