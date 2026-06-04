
import type { Building } from "../../types/plan.types";
import "../plan/styles/planList.css";
import { useState } from "react";

export const PlanList = ({
  plans,
  onSelect,
  onDelete,
  onEdit,
}: {
  plans: Building[];
  onSelect: (plan: Building) => void;
  onDelete: (id: string) => void;
  onEdit: (plan: Building) => void;
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deletePlan, setDeletePlan] = useState<Building | null>(null);

  const closeModal = () => setDeletePlan(null);

  const confirmDelete = () => {
    if (deletePlan) {
      onDelete(deletePlan.id);
      setDeletePlan(null);
    }
  };

  return (
    <>
      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
          padding: 50,
          paddingTop: 20,
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
              flexDirection: "column",
            }}
          >
            {/* MENU BUTTON */}
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

            {/* MENU */}
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
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{ padding: "8px 12px", cursor: "pointer" }}
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
                    setDeletePlan(plan);
                    setOpenMenuId(null);
                  }}
                >
                  Удалить
                </div>
              </div>
            )}

            {/* IMAGE */}
            <img
              src={plan.photoUrl}
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                display: "block",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }}
            />

            {/* TITLE */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#212121",
                background: "#fff",
                fontWeight: 600,
                fontSize: 20,
                borderBottomRightRadius: 25,
                borderBottomLeftRadius: 25,
              }}
            >
              {plan.name}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {deletePlan && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 420,
              background: "#fff",
              borderRadius: 25,
              padding: 20,
              position: "relative",
              textAlign: "center",
            }}
          >
            {/* CLOSE */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                border: "none",
                background: "transparent",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h3
              style={{
                margin: "0 0 20px 0",
                textAlign: "left",
                paddingLeft: "6px",
              }}
            >
              Удалить здание
            </h3>

            <p style={{ margin: "6px 0" }}>
              Вы действительно хотите удалить
            </p>

            <p style={{ margin: "6px 0", fontWeight: 600 }}>
              {deletePlan.name}?
            </p>

            <p style={{ fontSize: 16, color: "#666", marginBottom: "20px" }}>
              Это действие удалит все этажи, схемы и аудитории здания
            </p>

            {/* ACTIONS */}
            <button
              onClick={confirmDelete}
              style={{
                padding: "10px 20px",
                borderRadius: 25,
                border: "1px solid #dc3545",
                background: "transparent",
                color: "#dc3545",
                cursor: "pointer",
                width: "120px",
                fontWeight: 600,
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </>
  );
};