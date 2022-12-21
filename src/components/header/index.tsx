import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css-modules/header.module.css";

// Interface
import Movie from "../../types/movie.interface";
import { AppDispatch, RootState } from "../../types/redux.interface";

// Actions
import { changeStateMoreInfoModalAction } from "../../redux/actions/moviesAction";

// Components
import Logo from "../logo";
import ErrorBoundary from "../ErrorBoundary";
import AddOrEditModal from "../modals/AddOrEditModal";
import MoreInfoMovie from "../modals/MoreInfoMovie";

// Hooks
import useThrowError from "../../hooks/useThrowError";

interface State {
  movieSelected: Movie,
  isOpenMoreInfoModal: boolean
}

function Header() {
  // Dispatch Instance
  const dispatch = useDispatch<AppDispatch>();

  // Context Extraction
  const { movieSelected, isOpenMoreInfoModal } = useSelector<RootState, State>((state) => state.movies);

  // Local State
  const [inputValue, setInputValue] = React.useState("");
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  // useThrowError();

  const handleClose = () => {
    dispatch(changeStateMoreInfoModalAction(false));
  };

  return (
    <header id="header" className={styles.hero} style={{ backgroundImage: "url(/img/hero.svg)" }} data-testid="header">
      { isOpenModal ? (
        <AddOrEditModal title="add" setIsOpen={setIsOpenModal} />
      ) : null }
      { isOpenMoreInfoModal && (
        <MoreInfoMovie movie={movieSelected} setIsOpen={handleClose} />
      ) }
      <div className={styles.container}>
        <a href="#" className={styles.noTextDecoration}>
          <Logo />
        </a>
        <button className={styles.mainButton} data-testid="add_movie_button" onClick={() => setIsOpenModal((prevState) => !prevState)}>
          <span>+ </span>
          ADD MOVIE
        </button>
      </div>
      <div className={styles.finder}>
        <h1 className={styles.mainTitle} data-testid="header_title">FIND YOUR MOVIE</h1>
        <div className={styles.secondaryContainer}>
          <ErrorBoundary>
            <input className={styles.searchInput} type="text" placeholder="What do you want to watch?" data-testid="header_search_input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </ErrorBoundary>
          <button className={styles.secondaryButton} data-testid="header_search_button">Search</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
