import { request } from "./client";
import type {
  ClickableArea,
  CreateClickableAreaDto,
  UpdateClickableAreaDto,
} from "../types/plan.types";

export const clickableAreasApi = {
  // GET all areas for schema
  getBySchema: (schemaId: string) =>
    request<ClickableArea[]>(`/clickable-areas/schema/${schemaId}`),

  // GET one
  getOne: (id: string) =>
    request<ClickableArea>(`/clickable-areas/${id}`),

  // CREATE
  create: (schemaId: string, data: CreateClickableAreaDto) =>
    request<ClickableArea>(
      `/clickable-areas/schema/${schemaId}`,
      "POST",
      data
    ),

  // UPDATE
  update: (id: string, data: UpdateClickableAreaDto) =>
    request<ClickableArea>(
      `/clickable-areas/${id}`,
      "PATCH",
      data
    ),

  // LINK TO ROOM
  linkToRoom: (id: string, roomId: string) =>
    request<ClickableArea>(
      `/clickable-areas/${id}/link/${roomId}`,
      "PATCH"
    ),

  // DELETE
  remove: (id: string) =>
    request<void>(`/clickable-areas/${id}`, "DELETE"),
};