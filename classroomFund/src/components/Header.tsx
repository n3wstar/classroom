import "../../src/pages/PlanManagerPage/styles.css";
import searchIcon from "../assets/search-icon.svg";
import rtfIcon from "../assets/urfu-logo.png";
import { useNavigate } from "react-router-dom";


export const Header = () => {

  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={rtfIcon} className="urfu-logo"/>
      </div>
      <div className="search">
        <input placeholder="поиск..." className="search-input" />
        <img src={searchIcon} alt="Поиск" className="search-icon" />
      </div>

      <div className="user">Иванов Иван Иванович ▾</div>
    </header>
  );
};