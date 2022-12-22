import * as React from "react";
import { useDispatch } from "react-redux";
import styles from "../../css-modules/main.module.css";

// Interface
import Movie from "../../types/movie.interface";
import { AppDispatch } from "../../types/redux.interface";

// Actions
import { changeStateMoreInfoModalAction, setMovieSelectedAction } from "../../redux/actions/moviesAction";

// Components
import MovieMenu from "./MovieMenu";
import DeleteModal from "../modals/DeleteModal";
import AddOrEditModal from "../modals/AddOrEditModal";

// Hooks
import useCustomSearchParams from "../../hooks/useCustomSearchParams";

interface Props {
    movie: Movie
}

function CardMovie(props: Props) {
  // dispatch Instance
  const dispatch = useDispatch<AppDispatch>();

  // Props Extraction
  const { movie } = props;

  // URL Extraction
  const [search, setSearch] = useCustomSearchParams();

  // Local State
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const selectMovie = React.useCallback((movie: Movie) => {
    dispatch(changeStateMoreInfoModalAction(true));
    dispatch(setMovieSelectedAction(movie));
    setSearch({ ...search, movie: movie.id.toString() });
  }, [movie]);

  return (
    <div data-testid="card_movie">
      { isOpenDeleteModal && (
        <DeleteModal title="Delete" id={movie.id} setIsOpen={setIsOpenDeleteModal} setIsOpenMenu={setIsOpenMenu} />
      ) }
      { isOpenEditModal && (
        <AddOrEditModal
          title="Edit"
          setIsOpen={setIsOpenEditModal}
          setIsOpenMenu={setIsOpenMenu}
          movieInfo={movie}
        />
      ) }
      <article className={styles.movieItem}>
        <div className={styles.menuContainer}>
          <div className={styles.menuButton} onClick={() => setIsOpenMenu((prevState) => !prevState)} data-testid="movie_menu_button" data-cy="movie_menu_button">...</div>
          { isOpenMenu && (
            <MovieMenu setIsOpen={setIsOpenMenu} setIsOpenDeleteModal={setIsOpenDeleteModal} setIsOpenEditModal={setIsOpenEditModal} />
          ) }
        </div>
        <img src={movie.poster_path} alt={movie.title} className={styles.movieImage} onClick={() => selectMovie(movie)} data-testid="card_movie_image" />
        <div className={styles.titleContainer}>
          <p className={styles.movieTitle} data-cy="card_movie_title">{ movie.title }</p>
          <p className={styles.movieDate}>{ movie.release_date.split("-")[0] }</p>
        </div>
        <p className={styles.genres}>
          { movie.genres.join(" & ") }
        </p>
      </article>
    </div>
  );
}

export default CardMovie;
