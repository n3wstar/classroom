import { create } from "zustand";
import type { Plan, Schema } from "../types/plan.types";

type PlanStore = {
  plans: Plan[];

  activePlanId: string | null;
  editingPlanId: string | null;

  addPlan: (plan: Plan) => void;
  updatePlan: (plan: Plan) => void;
  deletePlan: (id: string) => void;

  updateSchema: (
  planId: string,
  schemaId: string,
  patch: Partial<Schema>
) => void;

  setActivePlan: (id: string | null) => void;
  setEditingPlan: (id: string | null) => void;
};

export const usePlanStore = create<PlanStore>((set) => ({
  plans: [],

  activePlanId: null,
  editingPlanId: null,

  addPlan: (plan) =>
    set((state) => ({
      plans: [...state.plans, plan],
    })),

    updatePlan: (plan) =>
    set((state) => ({
      plans: state.plans.map((p) =>
        p.id === plan.id ? plan : p
      ),
    })),

  setActivePlan: (id) =>
    set(() => ({
      activePlanId: id,
    })),

  setEditingPlan: (id) =>
    set({
      editingPlanId: id
    }),

  deletePlan: (id) =>
    set((state) => ({
      plans: state.plans.filter((p) => p.id !== id),
    })),

    updateSchema: (planId, schemaId, patch) =>
  set((state) => ({
    plans: state.plans.map((plan) =>
      plan.id !== planId
        ? plan
        : {
            ...plan,
            schemas: plan.schemas.map((schema) =>
              schema.id === schemaId
                ? { ...schema, ...patch }
                : schema
            ),
          }
    ),
  })),

}));