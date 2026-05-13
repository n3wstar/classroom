import { useState } from "react";

import type {
    Plan,
    Schema,
} from "../../types/plan.types";

import { usePlanStore } from "../../store/planStore";
import "../modals/EditBuildingModal.css";
import editIcon from "../../assets/edit-icon.png";

type Props = {
    plan: Plan;

    onClose: () => void;
};

export const EditBuildingModal = ({ plan, onClose }: Props) => {
    const updatePlan = usePlanStore((s) => s.updatePlan);

    const [name, setName] = useState(plan.name);

    const [previewImage, setPreviewImage] = useState(plan.previewImage);
    const [imageName, setImageName] = useState(plan.previewImageName || "");

    const [schemas, setSchemas] = useState<Schema[]>(plan.schemas);

    const handleSave = () => {
        updatePlan({
            ...plan,
            name,
            previewImage,
            previewImageName: imageName,
            schemas,
        });

        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="building-modal">

                <div className="modal-header">
                    <h2>Редактировать здание</h2>
                    <button onClick={onClose}>×</button>
                </div>
                <div className="modal-body">

                    <div className="field-row">
                        <label className="field-label">Название</label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="field-row">
                        <label className="field-label">Изображение</label>

                        {!previewImage ? (
                            <label className="upload-link">
                                Загрузить
                                <input
                                    hidden
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        setPreviewImage(URL.createObjectURL(file));
                                        setImageName(file.name);
                                    }}
                                />
                            </label>
                        ) : (
                            <div className="file-chip">
                                <span>{imageName}</span>

                                <button
                                    type="button"
                                    className="file-remove"
                                    onClick={() => {
                                        setPreviewImage("");
                                        setImageName("");
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="field-row">
                        <label className="field-label">Этажи</label>

                        <div className="floor-control">
                            <button
                                type="button"
                                onClick={() => {
                                    if (schemas.length <= 1) return;
                                    setSchemas((prev) => prev.slice(0, -1));
                                }}
                            >
                                {"<"}
                            </button>

                            <span>{schemas.length}</span>

                            <button
                                type="button"
                                onClick={() => {
                                    setSchemas((prev) => [
                                        ...prev,
                                        {
                                            id: crypto.randomUUID(),
                                            floor: prev.length + 1,
                                            image: "",
                                            rooms: [],
                                        },
                                    ]);
                                }}
                            >
                                {">"}
                            </button>
                        </div>
                    </div>

                    {schemas.map((schema) => (
                        <div key={schema.id} className="schema-row">

                            <div className="floor-box">
                                <span>Этаж</span>

                                <div className="floor-circle">
                                    <input
                                        value={schema.floor}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);

                                            setSchemas((prev) =>
                                                prev.map((s) =>
                                                    s.id === schema.id
                                                        ? { ...s, floor: value }
                                                        : s
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            {!schema.image ? (
                                <label className="upload-link">
                                    <img
                                        src={editIcon}
                                        style={{
                                            width: 16,
                                            height: 16,
                                            objectFit: "contain",
                                        }}
                                    />
                                    Редактировать схему
                                    <input
                                        hidden
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const image = URL.createObjectURL(file);

                                            setSchemas((prev) =>
                                                prev.map((s) =>
                                                    s.id === schema.id
                                                        ? { ...s, image }
                                                        : s
                                                )
                                            );
                                        }}
                                    />
                                </label>
                            ) : (
                                <div className="file-chip">
                                    <span>Схема загружена</span>

                                    <button
                                        className="file-remove"
                                        onClick={() => {
                                            setSchemas((prev) =>
                                                prev.map((s) =>
                                                    s.id === schema.id
                                                        ? { ...s, image: "" }
                                                        : s
                                                )
                                            );
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                </div>

                <div className="modal-footer">
                    <button className="save-btn" onClick={handleSave}>
                        Сохранить
                    </button>
                </div>

            </div>
        </div>
    );
};