import "../../src/pages/PlanManagerPage/styles.css";
import searchIcon from "../assets/search-icon.svg";
import rtfIcon from "../assets/urfu-logo.png";


export const Header = () => {
  return (
    <header className="header">
      <div className="logo">
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