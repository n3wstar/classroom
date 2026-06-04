import "./roomCard.css";

import { useRef, useState } from "react";
import type { RoomData, RoomType, RoomMedia, EquipmentItem } from "../../types/plan.types";

import editIcon from "../../assets/edit-icon.png";
import saveIcon from "../../assets/saveIcon.png";
import trashIcon from "../../assets/trashIcon.png";
import uploadIcon from "../../assets/uploadIcon.png";
import addIcon from "../../assets/plus.png";
import { EquipmentModal } from "./EquipmentModal";



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

const defaultEquipment: EquipmentItem[] = [
    {
        id: crypto.randomUUID(),
        category: "furniture",
        name: "Стул ученический",
        quantity: 30,
        roomId: "",
        properties: {
            type: "Стул",
            length: 45,
            width: 45,
            height: 85,
        },
    },
    {
        id: crypto.randomUUID(),
        category: "tech",
        name: "Проектор Epson",
        quantity: 1,
        roomId: "",
        properties: {
            specs: "4K, 3500 lm",
        },
    },
];

export const RoomCard = ({ room, onClose, onSave }: Props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [activeTab, setActiveTab] = useState<"main" | "requests">("main");
    const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);
    const [openSelect, setOpenSelect] = useState(false);
    const [openEquipment, setOpenEquipment] = useState(false);

    const photoInputRef = useRef<HTMLInputElement | null>(null);
    const panoInputRef = useRef<HTMLInputElement | null>(null);


    const initialFeatures =
        room.features && room.features.length > 0
            ? room.features
            : defaultEquipment;

    const [form, setForm] = useState<RoomData>({
        ...room,
        media: room.media ?? [],
        features: initialFeatures,
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

        setForm(prev => ({
            ...prev,
            media:
                type === "panorama"
                    ? [
                        ...prev.media.filter(m => m.mediaType !== "panorama"),
                        newMedia,
                    ]
                    : [...prev.media, newMedia],
        }));
    };

    const deleteMedia = (url: string) => {
        setForm(prev => ({
            ...prev,
            media: prev.media.filter(m => m.url !== url),
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
                            setForm(prev => ({
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

            <div className="room-card-body">
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
                                                        setForm(prev => ({
                                                            ...prev,
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
                                    className="capacity-input"
                                    type="number"
                                    value={form.capacity}
                                    onChange={(e) =>
                                        setForm(prev => ({
                                            ...prev,
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

                            {isEdit && (
                                <div className="equipment-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => setOpenEquipment(true)}
                                    >
                                        <img src={editIcon} />
                                        Редактировать
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="table-wrapper">
                            <table className="equipment-table">
                                <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Количество</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {form.features.map((f) => (
                                        <tr key={f.id}>
                                            <td>{f.name}</td>
                                            <td>{f.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* MODAL */}
                    {openEquipment && (
                        <div
                            className="equipment-modal-overlay"
                            onClick={() => setOpenEquipment(false)}
                        >
                            <div
                                className="modal-content"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <EquipmentModal
                                    initialItems={form.features}
                                    onClose={() => setOpenEquipment(false)}
                                    onSave={(items) => {
                                        setForm(prev => ({
                                            ...prev,
                                            features: items,
                                        }));

                                        setOpenEquipment(false);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* MEDIA */}
                    {(form.media.length > 0 || isEdit) && (
                        <div className="room-media">
                            <div className="media-header">
                                <span className="media-title">Мультимедиа</span>

                                {isEdit && (
                                    <div className="media-actions">
                                        <img src={uploadIcon} />
                                        <button onClick={() => panoInputRef.current?.click()}>
                                            Загрузить панораму
                                        </button>
                                        <img src={addIcon} />
                                        <button onClick={() => photoInputRef.current?.click()}>
                                            Добавить фото
                                        </button>
                                    </div>
                                )}
                            </div>

                            {panoramas.length > 0 && (
                                <div className="panorama-grid">
                                    {panoramas.slice(0, 1).map((m) => (
                                        <div className="media-item" key={m.url}>
                                            {isEdit && (
                                                <button
                                                    className="delete-media-btn"
                                                    onClick={() => deleteMedia(m.url)}
                                                >
                                                    <img src={trashIcon} />
                                                </button>
                                            )}

                                            <img
                                                src={m.thumbnailUrl || m.url}
                                                className="media-img media-panorama"
                                                onClick={() => setFullscreenImg(m.url)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="photo-section">
                                {photos.length === 1 && (
                                    <div className="media-item full">
                                        {isEdit && (
                                            <button
                                                className="delete-media-btn"
                                                onClick={() => deleteMedia(photos[0].url)}
                                            >
                                                <img src={trashIcon} />
                                            </button>
                                        )}

                                        <img
                                            src={photos[0].thumbnailUrl || photos[0].url}
                                            className="media-big"
                                            onClick={() => setFullscreenImg(photos[0].url)}
                                        />
                                    </div>
                                )}

                                {photos.length === 2 && (
                                    <div className="photo-grid">
                                        {photos.map((m) => (
                                            <div className="media-item" key={m.url}>
                                                {isEdit && (
                                                    <button
                                                        className="delete-media-btn"
                                                        onClick={() => deleteMedia(m.url)}
                                                    >
                                                        <img src={trashIcon} />
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

                                {photos.length >= 3 && (
                                    <div className="photo-carousel">
                                        <div className="photo-scroll">
                                            {photos.map((m) => (
                                                <div className="carousel-item" key={m.url}>
                                                    {isEdit && (
                                                        <button
                                                            className="delete-media-btn"
                                                            onClick={() => deleteMedia(m.url)}
                                                        >
                                                            <img src={trashIcon} />
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
                                    </div>
                                )}
                            </div>

                            <input
                                hidden
                                type="file"
                                ref={photoInputRef}
                                onChange={(e) =>
                                    e.target.files?.[0] &&
                                    addMedia(e.target.files[0], "photo")
                                }
                            />

                            <input
                                hidden
                                type="file"
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
        </div>
    );
};