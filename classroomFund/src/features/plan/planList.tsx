import type { Plan } from "../../types/plan.types";

export const PlanList = ({
  plans,
  onSelect,
}: {
  plans: Plan[];
  onSelect: (plan: Plan) => void;
}) => {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {plans.map((plan) => (
        <div
          key={plan.id}
          style={{
            width: 120,
            height: 80,
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={() => onSelect(plan)}
        >
          <img
            src={plan.image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
};