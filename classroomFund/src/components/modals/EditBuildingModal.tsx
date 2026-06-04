import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Building } from "../../types/plan.types";

import editIcon from "../../assets/edit-icon.png";
import "../modals/EditBuildingModal.css";

type Props = {
  building: Building;
  onClose: () => void;
  onSave: (data: {
    name: string;
    photoUrl: string;
    floorsCount: number;
  }) => void;
};

export const EditBuildingModal = ({ building, onClose, onSave }: Props) => {
  const navigate = useNavigate();

  const [name, setName] = useState(building.name);
  const [photoUrl, setPhotoUrl] = useState(building.photoUrl);
  const [floorsCount, setFloorsCount] = useState(building.floors.length);

  const handleSave = () => {
    onSave({
      name,
      photoUrl,
      floorsCount,
    });

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="building-modal">

        {/* HEADER */}
        <div className="modal-header">
          <h2>Редактировать здание</h2>
          <button onClick={onClose}>×</button>
        </div>

        {/* NAME */}
        <div className="field-row">
          <label className="field-label">Название</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* IMAGE */}
        <div className="field-row">
          <label className="field-label">Изображение</label>

          {!photoUrl ? (
            <label className="upload-link">
              Загрузить
              <input
                hidden
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setPhotoUrl(URL.createObjectURL(file));
                }}
              />
            </label>
          ) : (
            <div className="file-chip">
              <span>image</span>

              <button
                className="file-remove"
                onClick={() => setPhotoUrl("")}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* FLOORS */}
        <div className="field-row">
          <label className="field-label">Этажи</label>

          <div className="floor-control">
            <button onClick={() => setFloorsCount((p) => Math.max(1, p - 1))}>
              {"<"}
            </button>

            <span>{floorsCount}</span>

            <button onClick={() => setFloorsCount((p) => p + 1)}>
              {">"}
            </button>
          </div>
        </div>

        {/* SCHEMAS / EDIT FLOORS */}
        <div className="field-row">
          <label className="field-label">Этажи и схемы</label>

          {Array.from({ length: floorsCount }, (_, i) => ({
            id: `${building.id}-${i}`,
            number: i + 1,
          })).map((floor) => (
            <div key={floor.id} className="schema-row">

              <div className="floor-box">
                <div className="floor-circle">
                  {floor.number}
                </div>
              </div>

              <button
                className="upload-link"
                onClick={() => {
                  navigate("/editor", {
                    state: {
                      buildingId: building.id,
                      floorId: floor.id,
                    },
                  });
                }}
              >
                <img src={editIcon} style={{ width: 16, height: 16 }} />
                Редактировать схему
              </button>

            </div>
          ))}
        </div>

        {/* SAVE */}
        <div className="modal-footer">
          <button className="save-btn" onClick={handleSave}>
            Сохранить
          </button>
        </div>

      </div>
    </div>
  );
};