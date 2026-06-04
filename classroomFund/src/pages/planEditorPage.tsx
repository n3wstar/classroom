
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { usePlanStore } from "../store/planStore";
import type { ClickableArea } from "../types/plan.types";
import { PlanEditor } from "../features/plan/planEditor";
import plusIcon from "../assets/plus.png";
import xIcon from "../assets/x-icon.png";
import saveIcon from "../assets/galochka.png";
import trashIcon from "../assets/Icon.png";
import downloadIcon from "../assets/download-icon.png";
import "../pages/styles/planEditor.css";


export const PlanEditorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { buildingId, floorId } = location.state as {
    buildingId: string;
    floorId: string;
  };

  const building = usePlanStore((s) =>
    s.buildings.find((b) => b.id === buildingId)
  );

  const floor = building?.floors.find((f) => f.id === floorId);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState(floor?.image || "");
  
  const [areas, setAreas] = useState<ClickableArea[]>([]);

  const [drawingMode, setDrawingMode] = useState(false);

  if (!building || !floor) return <div>Здание или этаж не найден</div>;

  const clearSchema = () => {
    setImage("");
    setAreas([]);
  };

  return (
    <div className="editor-page">
      <Header />

      <div className="editor-content">
        <div className="editor-top">
          <h2 className="editor-scheme">Редактор этажа</h2>
          <p className="editor-title">
            {building.name} — этаж {floor.number}
          </p>
        </div>

        {!image ? (
          <div className="empty-editor">
            Схема этажа не загружена
          </div>
        ) : (
          <div className="plan-canvas">
            <PlanEditor
              image={image}
              areas={areas}
              onChange={setAreas}
              drawingMode={drawingMode}
            />
          </div>
        )}
      </div>

      <div className="editor-footer">
        <button
          className="footer-btn upload-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          <img src={downloadIcon} alt="" />
          Загрузить схему
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setImage(URL.createObjectURL(file));
          }}
        />

        <button className="footer-btn delete-btn" onClick={clearSchema}>
          <img src={trashIcon} alt="" />
          Удалить схему
        </button>

        <button
          className={`footer-btn add-button ${drawingMode ? "active" : ""}`}
          onClick={() => setDrawingMode((p) => !p)}
        >
          <img src={plusIcon} alt="" />
          Добавить область
        </button>

        <button className="footer-btn save-button">
          <img src={saveIcon} alt="" />
          Сохранить
        </button>

        <button className="footer-btn cancel-btn" onClick={() => navigate(-1)}>
          <img src={xIcon} alt="" />
          Отменить
        </button>
      </div>
    </div>
  );
};