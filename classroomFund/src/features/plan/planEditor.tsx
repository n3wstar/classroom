import { useRef, useState } from "react";
import type { Room } from "../../types/plan.types";

import "../plan/styles/planManager.css";
import trashIcon from "../../assets/Icon.png";

type Props = {
  image: string;
  onChange: (rooms: Room[]) => void;
  initialRooms?: Room[];
};

export const PlanEditor = ({
  image,
  onChange,
  initialRooms = [],
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // уже сохранённые комнаты
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  // рисуем ли сейчас
  const [drawing, setDrawing] = useState(false);

  // точка начала
  const [start, setStart] = useState({
    x: 0,
    y: 0,
  });

  // текущий прямоугольник
  const [current, setCurrent] = useState<Room | null>(null);

  // перевод координат мыши в %
  const getCoords = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();

    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  // начало рисования
  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getCoords(e);

    setDrawing(true);

    setStart({ x, y });

    setCurrent({
      id: Date.now().toString(),
      x,
      y,
      w: 0,
      h: 0,
    });
  };

  // процесс рисования
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;

    const { x, y } = getCoords(e);

    setCurrent((prev) =>
      prev
        ? {
            ...prev,
            w: x - start.x,
            h: y - start.y,
          }
        : null
    );
  };

  // исправление отрицательных размеров
  const normalizeRect = (r: Room): Room => {
    return {
      ...r,
      x: r.w < 0 ? r.x + r.w : r.x,
      y: r.h < 0 ? r.y + r.h : r.y,
      w: Math.abs(r.w),
      h: Math.abs(r.h),
    };
  };

  // завершение рисования
  const handleMouseUp = () => {
    if (!current) return;

    const normalized = normalizeRect(current);

    const updated = [...rooms, normalized];

    setRooms(updated);

    onChange(updated);

    setDrawing(false);

    setCurrent(null);
  };

  // удаление области
  const deleteRoom = (id: string) => {
    const updated = rooms.filter((r) => r.id !== id);

    setRooms(updated);

    onChange(updated);
  };

  return (
    <div className="editor-wrapper">
      <div
        ref={containerRef}
        className="editor-plan"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* схема */}
        <img
          src={image}
          alt="plan"
          className="editor-image"
        />

        {/* сохранённые зоны */}
        {rooms.map((room) => (
          <div
            key={room.id}
            className="editor-room"
            onClick={() => deleteRoom(room.id)}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              left: `${room.x * 100}%`,
              top: `${room.y * 100}%`,
              width: `${room.w * 100}%`,
              height: `${room.h * 100}%`,
            }}
          >
            <img
              src={trashIcon}
              alt="delete"
              className="delete-icon"
            />
          </div>
        ))}

        {/* текущая рисуемая зона */}
        {current && (
          <div
            className="current-room"
            style={{
              left: `${current.x * 100}%`,
              top: `${current.y * 100}%`,
              width: `${current.w * 100}%`,
              height: `${current.h * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
};