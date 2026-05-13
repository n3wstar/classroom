import { useState } from "react";

import "./createBuildingModal.css";

type Props = {
    onClose: () => void;

    onSave: (data: {
        name: string;
        image: string;
        imageName : string;
        floors: number;
    }) => void;
};

export const CreateBuildingModal = ({
    onClose,
    onSave,
}: Props) => {
    const [name, setName] = useState("");
    const [floors, setFloors] = useState(1);

    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");

    const handleUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImage(URL.createObjectURL(file));
        setImageName(file.name)
    };

    return (
        <div className="modal-backdrop">
            <div className="building-modal">
                <div className="modal-header">
                    <h2>Новое здание</h2>

                    <button onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="field-row">
                        <label className="field-label">
                            Название
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введите название..."
                        />
                    </div>

                    <div className="field-row">
                        <label className="field-label">
                            Изображение
                        </label>

                        <label className="upload-image-btn">
                            Загрузить

                            <input
                                hidden
                                type="file"
                                onChange={handleUpload}
                            />
                        </label>

                        {imageName && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 14, color: "#555" }}>
                                    {imageName}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage("");
                                        setImageName("");
                                    }}
                                    style={{
                                        border: "none",
                                        background: "none",
                                        cursor: "pointer",
                                        fontSize: 18,
                                        lineHeight: 1,
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="field-row">
                        <label className="field-label">
                            Количество этажей
                        </label>

                        <div className="floor-control">
                            <button
                                type="button"
                                onClick={() =>
                                    setFloors((prev) => Math.max(1, prev - 1))
                                }
                            >
                                {"<"}
                            </button>

                            <span>{floors}</span>

                            <button
                                type="button"
                                onClick={() => setFloors((prev) => prev + 1)}
                            >
                                {">"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        className="save-btn"
                        onClick={() =>
                            onSave({
                                name,
                                image,
                                imageName,
                                floors,
                            })
                        }
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};