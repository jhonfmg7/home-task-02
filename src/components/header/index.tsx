import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../css-modules/header.module.css";

// Context
import AppContext from "../../context/AppContext";

// Components
import Logo from "../logo";
import ErrorBoundary from "../ErrorBoundary";
import AddOrEditModal from "../modals/AddOrEditModal";
import MoreInfoMovie from "../modals/MoreInfoMovie";

// Hooks
import useThrowError from "../../hooks/useThrowError";

function Header() {
  // Navigate Instance
  const navigate = useNavigate();

  // URL Extraction
  const { searchQuery } = useParams();

  // Context Extraction
  const { movieSelected, isOpenMoreInfoModal, setIsOpenMoreInfoModal } = React.useContext(AppContext);

  // Local State
  const [inputValue, setInputValue] = React.useState(searchQuery || "");
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== "") navigate(`/search/${inputValue}?genre=all&sortBy=release_date`);
  };

  useThrowError();

  return (
    <header id="header" className={styles.hero} style={{ backgroundImage: "url(/img/hero.svg)" }} data-testid="header">
      { isOpenModal && (
        <AddOrEditModal title="add" setIsOpen={setIsOpenModal} />
      ) }
      { isOpenMoreInfoModal && (
        <MoreInfoMovie movie={movieSelected} setIsOpen={setIsOpenMoreInfoModal} />
      ) }
      <div className={styles.container}>
        <Link to="/" className={styles.noTextDecoration}>
          <Logo />
        </Link>
        <button className={styles.mainButton} onClick={() => setIsOpenModal((prevState) => !prevState)}>
          <span>+ </span>
          ADD MOVIE
        </button>
      </div>
      <div className={styles.finder}>
        <h1 className={styles.mainTitle}>FIND YOUR MOVIE</h1>
        <form onSubmit={handleSearch} className={styles.secondaryContainer}>
          <ErrorBoundary>
            <input className={styles.searchInput} type="text" placeholder="What do you want to watch?" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </ErrorBoundary>
          <button className={styles.secondaryButton} disabled={inputValue === ""} type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
