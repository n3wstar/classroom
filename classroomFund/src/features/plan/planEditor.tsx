import { useRef, useState } from "react";
import type { Room } from "../../types/plan.types";
import "../plan/planManager.css";



type Props = {
  image: string;
  onSave: (rooms: Room[]) => void;
};

export const PlanEditor = ({ image, onSave }: Props) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [current, setCurrent] = useState<Room | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // 🔹 перевод координат мыши в %
  const getCoords = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();

    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  // 🔹 начало рисования
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

  // 🔹 процесс рисования
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

  // 🔹 завершение
  const handleMouseUp = () => {
    if (current) {
      setRooms([...rooms, normalizeRect(current)]);
    }

    setDrawing(false);
    setCurrent(null);
  };

  // 🔥 фикс отрицательных размеров (очень важно)
  const normalizeRect = (r: Room): Room => {
    return {
      ...r,
      x: r.w < 0 ? r.x + r.w : r.x,
      y: r.h < 0 ? r.y + r.h : r.y,
      w: Math.abs(r.w),
      h: Math.abs(r.h),
    };
  };

  // 🔹 удалить последнюю зону
  const undo = () => {
    setRooms(rooms.slice(0, -1));
  };

  return (
    <div>
      <h3>Разметка плана</h3>


      {/* контейнер */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: 800,
          border: "1px solid #ccc",
          cursor: "crosshair",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* картинка */}
        <img src={image} style={{ width: "100%", display: "block" }} />

        {/* сохранённые зоны */}
        {rooms.map((room) => (
          <div
            key={room.id}
            className="room edit"
            style={{
              position: "absolute",
              left: `${room.x * 100}%`,
              top: `${room.y * 100}%`,
              width: `${room.w * 100}%`,
              height: `${room.h * 100}%`,
              background: "rgba(0,123,255,0.3)",
              border: "1px solid blue",
            }}
          />
        ))}

        {/* текущая зона */}
        {current && (
          <div
            style={{
              position: "absolute",
              left: `${current.x * 100}%`,
              top: `${current.y * 100}%`,
              width: `${current.w * 100}%`,
              height: `${current.h * 100}%`,
              border: "2px dashed blue",
            }}
          />
        )}
      </div>
      {/* кнопки */}
      <div className="plan-footer">
        <label className="save-btn">
          Сохранить план
          <button onClick={() => onSave(rooms)}  hidden/>
        </label>
        <label className="cancel-btn">
         Отменить   
        <button onClick={undo} hidden/>
        </label>
      </div>
    </div>
  );
};