import { create } from "zustand";
import type { Plan, Room } from "../types/plan.types";

type PlanStore = {
  plans: Plan[];

  activePlanId: string | null;
  editingPlanId: string | null;

  addPlan: (plan: Plan) => void;
  updatePlanRooms: (planId: string, rooms: Room[]) => void;
  updatePlan: (plan: Plan) => void;
  deletePlan: (id: string) => void;

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

  updatePlanRooms: (planId, rooms) =>
    set((state) => ({
      plans: state.plans.map((p) =>
        p.id === planId ? { ...p, rooms } : p
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

  updatePlan: (updatedPlan) =>
    set((state) => ({
      plans: state.plans.map((p) =>
        p.id === updatedPlan.id
          ? updatedPlan
          : p
      ),
    })),

  deletePlan: (id) =>
    set((state) => ({
      plans: state.plans.filter((p) => p.id !== id),
    })),

}));