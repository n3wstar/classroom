import type { Plan } from "../../types/plan.types";
import "../plan/styles/planList.css";

import { useState } from "react";

export const PlanList = ({
  plans,
  onSelect,
  onDelete,
  onEdit,
}: {
  plans: Plan[];
  onSelect: (plan: Plan) => void;
  onDelete: (id: string) => void;
  onEdit: (plan: Plan) => void;
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 20,
        padding: 50,
        paddingTop:20
      }}
    >
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => onSelect(plan)}
          style={{
            width: "100%",
            height: 400,
            cursor: "pointer",
            borderRadius: 25,
            border: "1px solid #ccc",
            position: "relative",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(openMenuId === plan.id ? null : plan.id);
            }}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              cursor: "pointer",
              zIndex: 5,
            }}
          >
            ⋮
          </div>

          {openMenuId === plan.id && (
            <div
              style={{
                position: "absolute",
                top: 34,
                right: -110,
                background: "white",
                borderRadius: 25,
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                overflow: "hidden",
                zIndex: 10,


                transformOrigin: "top right",
                animation: "menuPop 0.15s ease-out",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  onEdit(plan);
                  setOpenMenuId(null);
                }}
              >
                Редактировать
              </div>

              <div
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => {
                  onDelete(plan.id);
                  setOpenMenuId(null);
                }}
              >
                Удалить
              </div>
            </div>
          )}

          <img
            src={plan.previewImage}
            style={{
              width: "100%",
              height: 300,  
              objectFit: "cover",
              display: "block",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
          />

          <div
            style={{
              flex: 1,                 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: '#212121',
              background: "#fff",
              fontWeight: 600,
              fontSize: 20,
              borderBottomRightRadius:25,
              borderBottomLeftRadius:25
            }}
          >
            {plan.name}
          </div>
        </div>
      ))}
    </div>
  );
};