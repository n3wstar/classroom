import { useState } from "react";
import type { Category, EquipmentItem } from "../../types/plan.types";
import "../../components/modals/roomCard.css";
import "../modals/equipmentModal.css";

type Props = {
    initialItems: EquipmentItem[];
    onClose: () => void;
    onSave: (items: EquipmentItem[]) => void;
};

// -------------------- helpers --------------------

const getNumber = (value: unknown): number =>
    typeof value === "number" ? value : 0;

const getString = (value: unknown): string =>
    typeof value === "string" ? value : "";

// -------------------- component --------------------

export const EquipmentModal = ({
    initialItems,
    onClose,
    onSave,
}: Props) => {
    const [tab, setTab] = useState<Category>("furniture");

    const [items, setItems] = useState<EquipmentItem[]>(() => initialItems ?? []);

    const visible = items.filter((i) => i.category === tab);

    // -------------------- update item field --------------------

    const updateItem = (
        id: string,
        field: keyof EquipmentItem,
        value: EquipmentItem[keyof EquipmentItem]
    ) => {
        setItems((prev) =>
            prev.map((i) =>
                i.id === id
                    ? {
                        ...i,
                        [field]: value,
                    }
                    : i
            )
        );
    };

    // -------------------- update properties --------------------

    const updateProperties = (
        id: string,
        patch: Record<string, unknown>
    ) => {
        setItems((prev) =>
            prev.map((i) =>
                i.id === id
                    ? {
                        ...i,
                        properties: {
                            ...i.properties,
                            ...patch,
                        },
                    }
                    : i
            )
        );
    };

    // -------------------- add row --------------------

    const addRow = () => {
        setItems((prev) => [
            ...prev,
            tab === "furniture"
                ? {
                    id: crypto.randomUUID(),
                    category: "furniture",
                    name: "",
                    quantity: 1,
                    roomId: "",
                    properties: {
                        type: "",
                        length: 0,
                        width: 0,
                        height: 0,
                    },
                }
                : {
                    id: crypto.randomUUID(),
                    category: "tech",
                    name: "",
                    quantity: 1,
                    roomId: "",
                    properties: {
                        specs: "",
                    },
                },
        ]);
    };

    // -------------------- save --------------------

    const save = () => {
        onSave(items);
        onClose();
    };

    // -------------------- UI --------------------

    return (
        <div className="equipment-modal">
            <div className="equipment-modal__header">
                <div className="equipment-title">Оснащение</div>

                <div className="equipment-actions">
                    <button className="equipment-icon-btn" onClick={save}>
                        ✔
                    </button>

                    <button className="equipment-icon-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>
            </div>

            <div className="equipment-header-block">
                <div className="equipment-tabs">
                    <button
                        className={`equipment-tab ${tab === "furniture" ? "active" : ""}`}
                        onClick={() => setTab("furniture")}
                    >
                        Мебель
                    </button>

                    <button
                        className={`equipment-tab ${tab === "tech" ? "active" : ""}`}
                        onClick={() => setTab("tech")}
                    >
                        Техника
                    </button>
                </div>
            </div>

            <table className="equipment-table">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Тип</th>

                        {tab === "furniture" ? (
                            <>
                                <th>Длина</th>
                                <th>Ширина</th>
                                <th>Высота</th>
                            </>
                        ) : (
                            <th>Характеристики</th>
                        )}

                        <th>Кол-во</th>
                    </tr>
                </thead>

                <tbody>
                    {visible.map((item) => (
                        <tr key={item.id}>
                            {/* NAME */}
                            <td>
                                <input
                                    value={item.name}
                                    onChange={(e) =>
                                        updateItem(
                                            item.id,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>

                            {/* TYPE */}
                            <td>
                                <input
                                    value={getString(
                                        item.properties.type
                                    )}
                                    onChange={(e) =>
                                        updateProperties(item.id, {
                                            type: e.target.value,
                                        })
                                    }
                                />
                            </td>

                            {/* FURNITURE FIELDS */}
                            {tab === "furniture" ? (
                                <>
                                    <td>
                                        <input
                                            type="number"
                                            value={getNumber(
                                                item.properties.length
                                            )}
                                            onChange={(e) =>
                                                updateProperties(item.id, {
                                                    length: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            value={getNumber(
                                                item.properties.width
                                            )}
                                            onChange={(e) =>
                                                updateProperties(item.id, {
                                                    width: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            value={getNumber(
                                                item.properties.height
                                            )}
                                            onChange={(e) =>
                                                updateProperties(item.id, {
                                                    height: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </td>
                                </>
                            ) : (
                                /* TECH FIELDS */
                                <td>
                                    <input
                                        value={getString(
                                            item.properties.specs
                                        )}
                                        onChange={(e) =>
                                            updateProperties(item.id, {
                                                specs: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                            )}

                            {/* QUANTITY */}
                            <td>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateItem(
                                            item.id,
                                            "quantity",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* FOOTER */}
            <div className="equipment-footer">
                <button className="equipment-add-btn" onClick={addRow}>+ Добавить</button>
            </div>
        </div>
    );
};