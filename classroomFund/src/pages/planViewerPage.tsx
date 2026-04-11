import {useNavigate } from "react-router-dom";
import { PlanViewer } from "../features/plan/planViewer";
import { FooterButtons } from "../components/footerButtons";

import { Header } from "../components/Header";
import { usePlanStore } from "../store/planStore";

export const PlanViewerPage = () => {
  const navigate = useNavigate();

  const activePlanId = usePlanStore((s) => s.activePlanId);
  const plan = usePlanStore((s) =>
  s.plans.find((p) => p.id === activePlanId)
);

  if (!activePlanId) return <div>Нет выбранного плана</div>;

  if (!plan) return <div>План не найден</div>;

  return (
    <div className="plan-page">
      <Header />

      <div className="plan-content center">
        <PlanViewer plan={plan} />
      </div>

      <FooterButtons
        mode="view"
        onBack={() => navigate("/")}
      />
    </div>
  );
};