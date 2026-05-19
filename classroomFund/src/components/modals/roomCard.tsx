import "./roomCard.css";

import { useRef, useState } from "react";
import type { RoomData, RoomType, RoomMedia } from "../../types/plan.types";

import editIcon from "../../assets/edit-icon.png";
import saveIcon from "../../assets/galochka.png";

type Props = {
    room: RoomData;
    onClose: () => void;
    onSave?: (updated: RoomData) => void;
};

const ROOM_TYPES: RoomType[] = [
    "Лекционная",
    "Лабораторная",
    "Мультимедийная",
    "Склад",
    "Компьютерный класс"
];

const defaultFeatures = [
    { featureName: "Стол", quantity: 30, featureValue: "", technicalSpecs: "" },
    { featureName: "Стул", quantity: 60, featureValue: "", technicalSpecs: "" },
];

export const RoomCard = ({ room, onClose, onSave }: Props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [activeTab, setActiveTab] = useState<"main" | "requests">("main");
    const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

    const photoInputRef = useRef<HTMLInputElement | null>(null);
    const panoInputRef = useRef<HTMLInputElement | null>(null);

    const [form, setForm] = useState<RoomData>({
        ...room,
        features: room.features?.length ? room.features : defaultFeatures,
        media: room.media ?? [],
    });

    const photos = form.media.filter(m => m.mediaType === "photo");
    const panoramas = form.media.filter(m => m.mediaType === "panorama");

    const toggleEdit = () => {
        if (isEdit && onSave) onSave(form);
        setIsEdit(p => !p);
    };

    const addMedia = (file: File, type: "photo" | "panorama") => {
        const url = URL.createObjectURL(file);

        const newMedia: RoomMedia = {
            mediaType: type,
            url,
            thumbnailUrl: url,
            sortOrder: form.media.length,
        };

        setForm(p => ({
            ...p,
            media: [...p.media, newMedia],
        }));
    };

    return (
        <div className="room-card">

            {/* FULLSCREEN */}

            {fullscreenImg && (
                <div
                    className="image-overlay"
                    onClick={() => setFullscreenImg(null)}
                >
                    <img
                        src={fullscreenImg}
                        className="fullscreen-img"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* HEADER */}
            <div className="room-card-header">
                <h2>{form.number || ""}</h2>

                <div className="room-actions">
                    <button onClick={toggleEdit} className="icon-btn">
                        {isEdit ? <img src={saveIcon} /> : <img src={editIcon} />}
                    </button>

                    <button className="icon-btn close" onClick={onClose}>
                        ✕
                    </button>
                </div>
            </div>

            {/* TABS */}
            <div className="room-tabs">
                <div className="room-tabs-inner">
                    <button
                        className={activeTab === "main" ? "tab active" : "tab"}
                        onClick={() => setActiveTab("main")}
                    >
                        Основное
                    </button>

                    <button
                        className={activeTab === "requests" ? "tab active" : "tab"}
                        onClick={() => setActiveTab("requests")}
                    >
                        Заявки
                    </button>
                </div>
            </div>

            {/* MAIN */}
            {activeTab === "main" && (
                <>
                    {/* INFO */}
                    <div className="room-info">
                        <div className="room-row">
                            <span>Тип помещения</span>

                            {isEdit ? (
                                <select
                                    value={form.purpose}
                                    onChange={(e) =>
                                        setForm(p => ({
                                            ...p,
                                            purpose: e.target.value as RoomType,
                                        }))
                                    }
                                >
                                    {ROOM_TYPES.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            ) : (
                                <span>{form.purpose}</span>
                            )}
                        </div>

                        <div className="room-row">
                            <span>Вместимость</span>

                            {isEdit ? (
                                <input
                                    type="number"
                                    value={form.capacity}
                                    onChange={(e) =>
                                        setForm(p => ({
                                            ...p,
                                            capacity: Number(e.target.value),
                                        }))
                                    }
                                />
                            ) : (
                                <span>{form.capacity}</span>
                            )}
                        </div>
                    </div>

                    {/* ОСНАЩЕНИЕ */}
                    <div className="room-equipment">
                        <div className="equipment-header">
                            <span>Оснащение</span>
                        </div>

                        <div className="table-wrapper">
                            <table className="equipment-table">
                                <thead>
                                    <tr>
                                        <th>Тип</th>
                                        <th>Количество</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {form.features.map((f, i) => (
                                        <tr key={i}>
                                            <td>{f.featureName}</td>
                                            <td>{f.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* МУЛЬТИМЕДИА */}
                    {(form.media.length > 0 || isEdit) && (
                        <div className="room-media">

                            <div className="media-header">
                                <span className="media-title">Мультимедиа</span>

                                {isEdit && (
                                    <div className="media-actions">
                                        <button onClick={() => photoInputRef.current?.click()}>
                                            Добавить фото
                                        </button>

                                        <button onClick={() => panoInputRef.current?.click()}>
                                            Загрузить панораму
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* PANORAMA (1 колонка) */}
                            {panoramas.length > 0 && (
                                <div className="media-grid panorama-grid">
                                    {panoramas.map((m, i) => (
                                        <img
                                            key={i}
                                            src={m.thumbnailUrl || m.url}
                                            className="media-big"
                                            onClick={() => setFullscreenImg(m.url)}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* PHOTOS (2 колонки) */}
                            {photos.length > 0 && (
                                <div className="media-grid photo-grid">
                                    {photos.map((m, i) => (
                                        <img
                                            key={i}
                                            src={m.thumbnailUrl || m.url}
                                            className="media-big"
                                            onClick={() => setFullscreenImg(m.url)}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* inputs */}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                ref={photoInputRef}
                                onChange={(e) =>
                                    e.target.files?.[0] &&
                                    addMedia(e.target.files[0], "photo")
                                }
                            />

                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                ref={panoInputRef}
                                onChange={(e) =>
                                    e.target.files?.[0] &&
                                    addMedia(e.target.files[0], "panorama")
                                }
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};