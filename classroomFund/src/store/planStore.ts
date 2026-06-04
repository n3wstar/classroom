import { create } from "zustand";
import type { Building, RoomData} from "../types/plan.types";

type PlanStore = {
  buildings: Building[];
  rooms: RoomData[];

  activeBuildingId: string | null;

  setBuildings: (b: Building[]) => void;
  setActivePlan: (id: string | null) => void;

  updateRoom: (room: RoomData) => void;
  getRoomById: (id: string) => RoomData | undefined;
};

export const usePlanStore = create<PlanStore>((set, get) => ({
  buildings: [],
  rooms: [],

  activeBuildingId: null,

  setBuildings: (buildings) => set({ buildings }),

  setActivePlan: (id) => set({ activeBuildingId: id }),

  updateRoom: (room) =>
    set((state) => {
      const index = state.rooms.findIndex((r) => r.id === room.id);

      if (index >= 0) {
        state.rooms[index] = room;
      } else {
        state.rooms.push(room);
      }

      return { rooms: [...state.rooms] };
    }),

  getRoomById: (id) => get().rooms.find((r) => r.id === id),
}));