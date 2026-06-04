
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header";
import { PlanList } from "../features/plan/planList";
import { CreateBuildingModal } from "../components/modals/CreateBuildingModal";
import { EditBuildingModal } from "../components/modals/EditBuildingModal";

import { usePlanStore } from "../store/planStore";
import "../pages/styles/planListPage.css";

import type { Building } from "../types/plan.types";
import { buildingsApi, type BuildingDto } from "../api/buildingsApi";

export const PlanListPage = () => {
  const navigate = useNavigate();
  const setActivePlan = usePlanStore((s) => s.setActivePlan);

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [open, setOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);

  // LOAD
  useEffect(() => {
    const load = async () => {
      const data = await buildingsApi.getAll(); // BuildingDto[]

      const mapped: Building[] = data.map((b: BuildingDto) => ({
        id: b.id,
        name: b.name,
        photoUrl: b.photoUrl,
        previewImageName: b.previewImageName || "",
        floors: Array.from({ length: b.floorsCount }, (_, i) => ({
          id: `${b.id}-${i}`,
          number: i + 1,
          image: "",
        })),
      }));

      setBuildings(mapped);
    };

    load();
  }, []);

  // CREATE
  const handleCreate = async (data: {
    name: string;
    image: string;
    imageName: string;
    floors: number;
  }) => {
    const created = await buildingsApi.create({
      name: data.name,
      photoUrl: data.image,
      floorsCount: Number(data.floors),
    });

    const newBuilding: Building = {
      id: created.id,
      name: created.name,
      photoUrl: created.photoUrl || "",
      previewImageName: created.previewImageName || "",
      floors: Array.from({ length: created.floorsCount }, (_, i) => ({
        id: `${created.id}-${i}`,
        number: i + 1,
      })),
    };

    setBuildings((prev) => [...prev, newBuilding]);
    setOpen(false);
  };

  // DELETE
  const handleDelete = async (id: string) => {
    await buildingsApi.remove(id);
    setBuildings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="plan-page">
      <Header />

      <h1 className="page-title">Все здания</h1>

      <button className="add-btn" onClick={() => setOpen(true)}>
        + Добавить здание
      </button>

      <PlanList
        plans={buildings}
        onSelect={(building) => {
          setActivePlan(building.id);
          navigate("viewer");
        }}
        onEdit={(building) => setEditingBuilding(building)}
        onDelete={handleDelete}
      />

      {open && (
        <CreateBuildingModal
          onClose={() => setOpen(false)}
          onSave={handleCreate}
        />
      )}

      {editingBuilding && (
        <EditBuildingModal
          building={editingBuilding}
          onClose={() => setEditingBuilding(null)}
          onSave={async (data) => {
            await buildingsApi.update(editingBuilding.id, data);

            setBuildings((prev) =>
              prev.map((b) =>
                b.id === editingBuilding.id
                  ? { ...b, ...data }
                  : b
              )
            );
          }}
        />
      )}
    </div>
  );
};