

import { request } from "./client";

export type CreateBuildingDto = {
  name: string;
  photoUrl: string;
  floorsCount: number;
};

export type UpdateBuildingDto = Partial<CreateBuildingDto>;

export type BuildingDto = {
  id: string;
  name: string;
  photoUrl: string;
  previewImageName?: string;
  floorsCount: number;
};

export const buildingsApi = {
  getAll: () =>
    request<BuildingDto[]>("/buildings"),

  getOne: (id: string) =>
    request<BuildingDto>(`/buildings/${id}`),

  create: (data: CreateBuildingDto) =>
    request<BuildingDto>("/buildings", "POST", data),

  update: (id: string, data: UpdateBuildingDto) =>
    request<BuildingDto>(`/buildings/${id}`, "PATCH", data),

  remove: (id: string) =>
    request<void>(`/buildings/${id}`, "DELETE"),
};