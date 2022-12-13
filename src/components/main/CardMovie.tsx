import * as React from "react";
import styles from "../../css-modules/main.module.css";

// Interface
import Movie from "../../types/movie.interface";

// Context
import AppContext from "../../context/AppContext";

// Components
import MovieMenu from "./MovieMenu";
import DeleteModal from "../modals/DeleteModal";
import AddOrEditModal from "../modals/AddOrEditModal";

interface Props {
    movie: Movie
}

function CardMovie(props: Props) {
  // Props Extraction
  const { movie } = props;

  // Context Extraction
  const { setMovieSelected, setIsOpenMoreInfoModal } = React.useContext(AppContext);

  // Local State
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const selectMovie = React.useCallback((movie: Movie) => {
    setIsOpenMoreInfoModal(true);
    setMovieSelected(movie);
  }, [movie]);

  return (
    <>
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
          <div className={styles.menuButton} onClick={() => setIsOpenMenu((prevState) => !prevState)}>...</div>
          { isOpenMenu && (
            <MovieMenu setIsOpen={setIsOpenMenu} setIsOpenDeleteModal={setIsOpenDeleteModal} setIsOpenEditModal={setIsOpenEditModal} />
          ) }
        </div>
        <img src={movie.poster_path} alt={movie.title} className={styles.movieImage} onClick={() => selectMovie(movie)} />
        <div className={styles.titleContainer}>
          <p className={styles.movieTitle}>{ movie.title }</p>
          <p className={styles.movieDate}>{ movie.release_date.split("-")[0] }</p>
        </div>
        <p className={styles.genres}>
          { movie.genres.join(" & ") }
        </p>
      </article>
    </>
  );
}

export default CardMovie;
