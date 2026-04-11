import type { Plan } from "../../types/plan.types";

export const PlanList = ({
  plans,
  onSelect,
}: {
  plans: Plan[];
  onSelect: (plan: Plan) => void;
}) => {
  return (
    <div style={{ display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: 10, }}>
      {plans.map((plan) => (
        <div
          key={plan.id}
          style={{
            width: 160,
            height: 100,
            border: "1px solid #ccc",
            cursor: "pointer",
            backgroundColor: "#CCCCCC"
          }}
          onClick={() => onSelect(plan)}
        >
          <img
            src={plan.image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="plan-title">
            {plan.name}
          </div>
        </div>
      ))}
    </div>
  );
};