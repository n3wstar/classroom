
import { PlanViewer } from "../features/plan/planViewer";
import { useState } from "react";
import { Header } from "../components/Header";
import { usePlanStore } from "../store/planStore";

export const PlanViewerPage = () => {
  const activePlanId = usePlanStore((s) => s.activePlanId);

  const plan = usePlanStore((s) =>
    s.plans.find((p) => p.id === activePlanId)
  );

  const [activeFloor, setActiveFloor] = useState(0);

  if (!plan) {
    return <div>План не найден</div>;
  }

  const currentSchema = plan.schemas[activeFloor];

  return (
    <div className="plan-page">
      <Header />

      <div className="viewer-wrapper">

        {/* SCHEMA */}
        <div className="viewer-center">

          <PlanViewer
            plan={plan}
            schema={currentSchema}
            onRoomClick={(room) => {
              console.log(room);
            }}
          />

          {/* FLOORS */}
          <div className="floors-bar">
            {plan.schemas.map((schema, index) => (
              <button
                key={schema.id}
                className={`floor-btn ${activeFloor === index ? "active" : ""
                  }`}
                onClick={() => setActiveFloor(index)}
              >
                {schema.floor}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};