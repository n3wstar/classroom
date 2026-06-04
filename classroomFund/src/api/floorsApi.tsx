import { request } from "./client";

export type FloorDto = {
  id: string;
  number: number;
  image: string;
};

export type UpdateFloorDto = {
  name?: string;
  image?: string;
};

export const floorsApi = {
  getByBuilding: (buildingId: string) =>
    request<FloorDto[]>(`/floors/building/${buildingId}`),

  getNumbers: (buildingId: string) =>
    request<number[]>(`/floors/building/${buildingId}/numbers`),

  update: (id: string, data: UpdateFloorDto) =>
    request<FloorDto>(`/floors/${id}`, "PATCH", data),
};