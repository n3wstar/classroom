
import { PlanViewer } from "../features/plan/planViewer";
import { useState } from "react";
import { Header } from "../components/Header";
import { usePlanStore } from "../store/planStore";
import "../features/plan/styles/planManager.css";
import "../pages/styles/planViewerPage.css";

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
  const isSchemaEmpty = !currentSchema?.image;

  return (
    <div className="plan-page">
      <Header showSearch />

      <div className="viewer-wrapper">

        <div className="viewer-center">
        <p className="viewer-title">{plan.name}</p>

          {isSchemaEmpty ? (
            <div className="empty-viewer">
              Схема этажа не загружена
            </div>
          ) : (
            <PlanViewer
              plan={plan}
              schema={currentSchema}
              onRoomClick={(room) => {
                console.log(room);
              }}
            />
          )}

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