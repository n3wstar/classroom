export type Room = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Plan = {
  id: string;
  name: string;
  previewImage: string;
  previewImageName: string; 
  schemas: Schema[]; 
};

export type Schema = {
  id: string;
  floor: number;
  image: string;
  imageName?: string;
  areas: ClickableArea[]
};

export type ClickableArea = {
  id: string;
  points: Point[];
  roomId?: string;
};

export type Point = {
  x: number;
  y: number;
};

export type RoomFeature = {
  featureName: string;
  featureValue: string;
  quantity: number;
  technicalSpecs: string;
};

export type RoomMedia = {
  mediaType: "photo" | "panorama";
  url: string;
  thumbnailUrl?: string;
  sortOrder: number;
};

export type RoomData = {
  id: string;

  number: string;

  floorId: string;

  purpose: string;

  capacity: number;

  description: string;

  features: RoomFeature[];

  media: RoomMedia[];
};

export type RoomType = "Лекционная" | "Лабораторная" | "Мультимедийная" | "Склад" | "Компьютерный класс";