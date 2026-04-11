import { create } from "zustand";
import type { Plan, Room } from "../types/plan.types";

type PlanStore = {
  plans: Plan[];

  addPlan: (plan: Plan) => void;
  updatePlanRooms: (planId: string, rooms: Room[]) => void;
  activePlanId: string | null;
  setActivePlan : (id:string) => void; 
};

export const usePlanStore = create<PlanStore>((set) => ({
  plans: [],

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
    activePlanId: null,
    setActivePlan: (id) =>
    set(() => ({
      activePlanId: id,
    })),
}));