import * as React from "react";
import styles from "../../css-modules/main.module.css";

// Context
import AppContext from "../../context/AppContext";

// Components
import MovieMenu from "./MovieMenu";
import DeleteModal from "../modals/DeleteModal";
import AddOrEditModal from "../modals/AddOrEditModal";

interface Movie {
    image: string,
    title: string,
    rating: number,
    genres: string[],
    releaseDate: string,
    runtime: number,
    overview: string,
    movieUrl: string,
}

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

  const selectAMovie = React.useCallback((movie: Movie) => {
    setIsOpenMoreInfoModal(true);
    setMovieSelected(movie);
  }, [movie]);

  return (
    <>
      { isOpenDeleteModal && (
        <DeleteModal title="Delete" setIsOpen={setIsOpenDeleteModal} setIsOpenMenu={setIsOpenMenu} />
      ) }
      { isOpenEditModal && (
        <AddOrEditModal
          title="Edit"
          setIsOpen={setIsOpenEditModal}
          setIsOpenMenu={setIsOpenMenu}
          movieInfo={{
            title: movie.title,
            date: movie.releaseDate,
            url: movie.movieUrl,
            rating: movie.rating,
            genre: movie.genres,
            runtime: movie.runtime,
            overview: movie.overview,
          }}
        />
      ) }
      <article className={styles.movieItem}>
        <div className={styles.menuContainer}>
          <div className={styles.menuButton} onClick={() => setIsOpenMenu((prevState) => !prevState)}>...</div>
          { isOpenMenu && (
            <MovieMenu setIsOpen={setIsOpenMenu} setIsOpenDeleteModal={setIsOpenDeleteModal} setIsOpenEditModal={setIsOpenEditModal} />
          ) }
        </div>
        <img src={movie.image} alt={`${movie.title}.png`} className={styles.movieImage} onClick={() => selectAMovie(movie)} />
        <div className={styles.titleContainer}>
          <p className={styles.movieTitle}>{ movie.title }</p>
          <p className={styles.movieDate}>{ movie.releaseDate.split("-")[0] }</p>
        </div>
        <p className={styles.genres}>
          { movie.genres.join(" & ") }
        </p>
      </article>
    </>
  );
}

export default CardMovie;
