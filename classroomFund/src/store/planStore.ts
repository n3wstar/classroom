import { create } from "zustand";
import type { Plan, RoomData, Schema } from "../types/plan.types";

type PlanStore = {
  plans: Plan[];

  rooms: RoomData[];

  activePlanId: string | null;
  editingPlanId: string | null;

  addPlan: (plan: Plan) => void;
  updatePlan: (plan: Plan) => void;
  deletePlan: (id: string) => void;

  setActivePlan: (id: string | null) => void;
  setEditingPlan: (id: string | null) => void;

  updateSchema: (
    planId: string,
    schemaId: string,
    patch: Partial<Schema>
  ) => void;

  // 🔥 ВАЖНОЕ ДОБАВЛЕНИЕ
  updateRoom: (room: RoomData) => void;

  getRoomById: (id: string) => RoomData | undefined;
};

export const usePlanStore = create<PlanStore>((set, get) => ({
  plans: [],
  rooms: [],

  activePlanId: null,
  editingPlanId: null,

  // ======================
  // PLANS
  // ======================
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

  deletePlan: (id) =>
    set((state) => ({
      plans: state.plans.filter((p) => p.id !== id),
    })),

  // ======================
  // ACTIVE / EDITING
  // ======================
  setActivePlan: (id) =>
    set(() => ({
      activePlanId: id,
    })),

  setEditingPlan: (id) =>
    set({
      editingPlanId: id,
    }),

  // ======================
  // SCHEMAS
  // ======================
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

  // ======================
  // ROOMS 🔥
  // ======================
  updateRoom: (room) =>
    set((state) => {
      const index = state.rooms.findIndex((r) => r.id === room.id);

      if (index >= 0) {
        state.rooms[index] = room;
      } else {
        state.rooms.push(room);
      }

      return {
        rooms: [...state.rooms],
      };
    }),

  getRoomById: (id) => {
    return get().rooms.find((r) => r.id === id);
  },
}));