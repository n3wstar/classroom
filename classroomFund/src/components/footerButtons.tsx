import "../pages/PlanManagerPage/styles.css";

type Props = {
  mode: "list" | "edit" | "view";

  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onBack?: () => void;
};

export const FooterButtons = ({
  mode,
  onUpload,
  onSave,
  onCancel,
  onBack,
}: Props) => {
  return (
    <div className="plan-footer">
      {mode === "list" && (
        <label className="upload-btn">
          Загрузить схему
          <input type="file" onChange={onUpload} hidden />
        </label>
      )}

      {mode === "edit" && (
        <>
          <button className="save-btn save" onClick={onSave}>
            Сохранить
          </button>
          <button className="cancel-btn cancel" onClick={onCancel}>
            Отмена
          </button>
        </>
      )}

      {mode === "view" && (
        <button className="back-btn" onClick={onBack}>
          Назад
        </button>
      )}
    </div>
  );
};