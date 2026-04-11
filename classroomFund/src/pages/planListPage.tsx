
import { useNavigate} from "react-router-dom";
import { PlanList } from "../features/plan/planList";
import { FooterButtons } from "../components/footerButtons";
import { Header } from "../components/Header";
import { usePlanStore } from "../store/planStore";


export const PlanListPage = () => {
  
  const navigate = useNavigate();

  const plans = usePlanStore((s) => s.plans);

  const addPlan = usePlanStore((s) => s.addPlan);

  const setActivePlan = usePlanStore((s) => s.setActivePlan);

const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const image = URL.createObjectURL(file);

  const newPlan = {
    id: Date.now().toString(),
    name: file.name,
    image,
    rooms: [],
  };

  addPlan(newPlan);
  setActivePlan(newPlan.id)
  navigate("/editor");   
};


  return (
    <div className="plan-page">
      <Header />

      <div className="plan-content list">
        {plans.length === 0 ? (
          <h2>Схема этажа не загружена</h2>
        ) : (
          <PlanList
            plans={plans}
            onSelect={(p) => {setActivePlan(p.id);
            navigate("/plan")
            }
            }
          />
        )}
      </div>

      <FooterButtons mode="list" onUpload={handleUpload} />
    </div>
  );
};