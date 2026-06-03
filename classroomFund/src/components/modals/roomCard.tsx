import "./roomCard.css";

import { useRef, useState } from "react";
import type { RoomData, RoomType, RoomMedia } from "../../types/plan.types";

import editIcon from "../../assets/edit-icon.png";
import saveIcon from "../../assets/saveIcon.png";
import trashIcon from "../../assets/trashIcon.png";
import uploadIcon from "../../assets/uploadIcon.png";
import addIcon from "../../assets/plus.png";

type Props = {
    room: RoomData;
    onClose: () => void;
    onSave?: (updated: RoomData) => void;
};

const ROOM_TYPES: RoomType[] = [
    "Лекционная аудитория",
    "Лаборатория",
    "Мультимедийная аудитория",
    "Административный кабинет",
    "Компьютерный класс",
    "Склад",
    "Техническое помещение",
];

const defaultFeatures = [
    { featureName: "Стол", quantity: 30, featureValue: "", technicalSpecs: "" },
    { featureName: "Стул", quantity: 60, featureValue: "", technicalSpecs: "" },
];

export const RoomCard = ({ room, onClose, onSave }: Props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [activeTab, setActiveTab] = useState<"main" | "requests">("main");
    const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);
    const [openSelect, setOpenSelect] = useState(false);

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

        setForm((prev) => ({
            ...prev,
            media:
                type === "panorama"
                    ? [
                        ...prev.media.filter(
                            (m) => m.mediaType !== "panorama"
                        ),
                        newMedia,
                    ]
                    : [...prev.media, newMedia],
        }));
    };

    const deleteMedia = (url: string) => {
        setForm((prev) => ({
            ...prev,
            media: prev.media.filter((m) => m.url !== url),
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
                {isEdit ? (
                    <input
                        className="room-number-input"
                        value={form.number ?? ""}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                number: e.target.value,
                            }))
                        }
                    />
                ) : (
                    <h2>{form.number || ""}</h2>
                )}

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
                                <div className="custom-select">
                                    <div
                                        className="selected"
                                        onClick={() => setOpenSelect(p => !p)}
                                    >
                                        {form.purpose || "Выберите тип"}
                                    </div>

                                    {openSelect && (
                                        <div className="dropdown">
                                            {ROOM_TYPES.map((t) => (
                                                <div
                                                    key={t}
                                                    className="option"
                                                    onClick={() => {
                                                        setForm((p) => ({
                                                            ...p,
                                                            purpose: t as RoomType,
                                                        }));
                                                        setOpenSelect(false);
                                                    }}
                                                >
                                                    {t}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
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

                            {isEdit && (<div className="equipment-actions">
                                <button className="edit-btn">
                                    <img src={editIcon} />
                                    Редактировать
                                </button>
                            </div>)}
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
                                        <img src={uploadIcon}></img>
                                        <button onClick={() => panoInputRef.current?.click()}>
                                            Загрузить панораму
                                        </button>
                                        <img src={addIcon}></img>
                                        <button onClick={() => photoInputRef.current?.click()}>
                                            Добавить фото
                                        </button>
                                    </div>
                                )}
                            </div>

                            {panoramas.length > 0 && (
                                <div className="media-grid panorama-grid">
                                    {panoramas.map((m, i) => (
                                        <div className="media-item" key={i}>
                                            {isEdit && (
                                                <button
                                                    className="delete-media-btn"
                                                    onClick={() => deleteMedia(m.url)}
                                                >
                                                    <img src={trashIcon}></img>
                                                </button>
                                            )}

                                            <img
                                                src={m.thumbnailUrl || m.url}
                                                className="media-big"
                                                onClick={() => setFullscreenImg(m.url)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {photos.length > 0 && (
                                <div className="media-grid photo-grid">
                                    {photos.map((m, i) => (
                                        <div className="media-item" key={i}>
                                            {isEdit && (
                                                <button
                                                    className="delete-media-btn"
                                                    onClick={() => deleteMedia(m.url)}
                                                >
                                                    <img src={trashIcon}></img>
                                                </button>
                                            )}

                                            <img
                                                src={m.thumbnailUrl || m.url}
                                                className="media-big"
                                                onClick={() => setFullscreenImg(m.url)}
                                            />
                                        </div>
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
            )
            }
        </div >
    );
};