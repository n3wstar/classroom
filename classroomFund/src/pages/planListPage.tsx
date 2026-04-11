
import { useNavigate, useLocation } from "react-router-dom";
import { PlanList } from "../features/plan/planList";
import { FooterButtons } from "../components/footerButtons";
import { Header } from "../components/Header";
import type { Plan } from "../types/plan.types";

export const PlanListPage = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const plans = location.state ? [location.state as Plan] : [];

 
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const image = URL.createObjectURL(file);

    const newPlan: Plan = {
      id: Date.now().toString(),
      name: file.name,
      image,
      rooms: [],
    };

    navigate("/editor", { state: newPlan });
  };

  return (
    <div className="plan-page">
      <Header />

      <div className="plan-content">
        {plans.length === 0 ? (
          <h2>Схема этажа не загружена</h2>
        ) : (
          <PlanList
            plans={plans}
            onSelect={(p) => navigate("/plan", { state: p })}
          />
        )}
      </div>

      <FooterButtons mode="list" onUpload={handleUpload} />
    </div>
  );
};