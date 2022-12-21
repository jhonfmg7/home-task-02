import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css-modules/header.module.css";

// Interface
import Movie from "../../types/movie.interface";
import { AppDispatch, RootState } from "../../types/redux.interface";

// Actions
import { changeStateMoreInfoModalAction } from "../../redux/actions/moviesAction";

// constants
import { OPTIONS } from "../../constants";

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

  // Navigate Instance
  const navigate = useNavigate();

  // URL Extraction
  const { searchQuery } = useParams();

  // Context Extraction
  const { movieSelected, isOpenMoreInfoModal } = useSelector<RootState, State>((state) => state.movies);

  // Local State
  const [inputValue, setInputValue] = React.useState(searchQuery || "");
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  // useThrowError();

  const handleClose = () => {
    dispatch(changeStateMoreInfoModalAction(false));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== "") navigate(`/search/${inputValue}?genre=${OPTIONS[0]}&sortBy=release_date`);
  };

  useThrowError();

  return (
    <header id="header" className={styles.hero} style={{ backgroundImage: "url(/img/hero.svg)" }} data-testid="header">
      { isOpenModal ? (
        <AddOrEditModal title="add" setIsOpen={setIsOpenModal} />
      ) : null }
      { isOpenMoreInfoModal && (
        <MoreInfoMovie movie={movieSelected} setIsOpen={handleClose} />
      ) }
      <div className={styles.container}>
        <Link to="/" className={styles.noTextDecoration}>
          <Logo />
        </Link>
        <button className={styles.mainButton} data-testid="add_movie_button" onClick={() => setIsOpenModal((prevState) => !prevState)}>
          <span>+ </span>
          ADD MOVIE
        </button>
      </div>
      <div className={styles.finder}>
        <h1 className={styles.mainTitle} data-testid="header_title">FIND YOUR MOVIE</h1>
        <form onSubmit={handleSearch} className={styles.secondaryContainer}>
          <ErrorBoundary>
            <input className={styles.searchInput} type="text" placeholder="What do you want to watch?" data-testid="header_search_input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </ErrorBoundary>
          <button className={styles.secondaryButton} disabled={!inputValue} type="submit" data-testid="header_search_button">Search</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
