import * as React from "react";
import styles from "../../css-modules/header.module.css";

// Context
import AppContext from "../../context/AppContext";

// Components
import Logo from "../logo";
import ErrorBoundary from "../ErrorBoundary";
import AddOrEditModal from "../modals/AddOrEditModal";
import MoreInfoMovie from "../modals/MoreInfoMovie";
import useThrowError from "../../hooks/useThrowError";

function Header() {
  // Context Extraction
  const { movieSelected, isOpenMoreInfoModal, setIsOpenMoreInfoModal } = React.useContext(AppContext);

  // Local State
  const [inputValue, setInputValue] = React.useState("");
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  useThrowError({ inputValue });

  return (
    <header id="header" className={styles.hero} style={{ backgroundImage: "url(/img/hero.svg)" }} data-testid="header">
      { isOpenModal && (
        <AddOrEditModal title="add" setIsOpen={setIsOpenModal} />
      ) }
      { isOpenMoreInfoModal && (
        <MoreInfoMovie movie={movieSelected} setIsOpen={setIsOpenMoreInfoModal} />
      ) }
      <div className={styles.container}>
        <a href="#" className={styles.noTextDecoration}>
          <Logo />
        </a>
        <button className={styles.mainButton} onClick={() => setIsOpenModal((prevState) => !prevState)}>
          <span>+ </span>
          ADD MOVIE
        </button>
      </div>
      <div className={styles.finder}>
        <h1 className={styles.mainTitle}>FIND YOUR MOVIE</h1>
        <div className={styles.secondaryContainer}>
          <ErrorBoundary>
            <input className={styles.searchInput} type="text" placeholder="What do you want to watch?" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </ErrorBoundary>
          <button className={styles.secondaryButton}>Search</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
