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
