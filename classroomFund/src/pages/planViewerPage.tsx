import {useNavigate } from "react-router-dom";
import { PlanViewer } from "../features/plan/planViewer";
import { FooterButtons } from "../components/footerButtons";
import { useState } from "react";
import type { Room } from "../types/plan.types";
import { Header } from "../components/Header";
import { usePlanStore } from "../store/planStore";
import cancelIcon from "../assets/cancel-icon.png";
import editIcon from "../assets/edit-icon.png";

export const PlanViewerPage = () => {
  const navigate = useNavigate();

  const activePlanId = usePlanStore((s) => s.activePlanId);
  const plan = usePlanStore((s) =>
    s.plans.find((p) => p.id === activePlanId)
  );

  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [activeTab, setActiveTab] = useState<"main" | "requests">("main");

  if (!activePlanId) return <div>Нет выбранного плана</div>;
  if (!plan) return <div>План не найден</div>;

  return (
    <div className="plan-page">
      <Header />

      <div className="plan-layout">
        
        {/* 🔹 центр */}
        <div className="plan-content viewer-center">
          <PlanViewer plan={plan} onRoomClick={setActiveRoom} />
        </div>

        {/* 🔹 правая панель */}
        {activeRoom && (
          <div className="viewer-sidebar">
            <article className="room-card">

  {/* HEADER */}
  <header className="card-header">
    <h3>Аудитория {activeRoom.id}</h3>

    <nav className="icons">
      <button className="icon-btn">
        <img src={editIcon} alt="Редактировать" />
      </button>

      <button className="icon-btn" onClick={() => setActiveRoom(null)}>
        <img src={cancelIcon} alt="Закрыть" />
      </button>
    </nav>
  </header>

  {/* ACTIONS */}
  <section className="card-actions">
    <button className={`action-btn ${activeTab==='main' ? "active" : ""}`}
    onClick={() => setActiveTab("main")}
    >основное</button>
    <button className={`action-btn ${activeTab==='requests' ? "active" : ""}`}
    onClick={() => setActiveTab("requests")}>
      заявки
    </button>
  </section>

  {/* INFO */}
  <section className="card-info">
  <div className="info-row">
    <span className="label">Этаж:</span>
    <span className="value">1</span>
  </div>

  <div className="info-row">
    <span className="label">Тип:</span>
    <span className="value">мультимедийная аудитория</span>
  </div>

  <div className="info-row">
    <span className="label">Вместимость:</span>
    <span className="value">30</span>
  </div>
</section>

  {/* PANORAMA */}
  <section className="upload-block">
    <h4>Панорама</h4>
    <input type="file" />
  </section>

  {/* PHOTOS */}
  <section className="upload-block">
    <h4>Фотографии</h4>
    <input type="file" multiple />
  </section>

</article>
          </div>
        )}
      </div>

      <FooterButtons mode="view" onBack={() => navigate("/")} />
    </div>
  );
};