import "../../src/pages/PlanManagerPage/styles.css";
import searchIcon from "../assets/search-icon.svg";
import { useNavigate } from "react-router-dom";


type Props = {
  showSearch?: boolean;
};

export const Header = ({
  showSearch = false,
}: Props) => {
  const navigate = useNavigate();

  return (
    <header className="header">

      <div
        className="header-title"
        onClick={() => navigate("/plans")}
      >
        Аудитория.УРФУ
      </div>

      {showSearch && (
        <div className="search">
          <input
            placeholder="Введите текст..."
            className="search-input"
          />

          <img
            src={searchIcon}
            alt="Поиск"
            className="search-icon"
          />
        </div>
      )}

      <div className="user">
        Иванов Иван Иванович ▾
      </div>

    </header>
  );
};