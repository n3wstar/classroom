import { useLocation, useNavigate } from "react-router-dom";
import { PlanViewer } from "../features/plan/planViewer";
import { FooterButtons } from "../components/footerButtons";
import type { Plan } from "../types/plan.types";
import { Header } from "../components/Header";

export const PlanViewerPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const plan = state as Plan;

  return (
    <div className="plan-page">
      <Header/>
      <div className="plan-content">
        <PlanViewer plan={plan} />
      </div>

      <FooterButtons
        mode="view"
        onBack={() => navigate("/")}
      />
    </div>
  );
};