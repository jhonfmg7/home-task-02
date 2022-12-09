import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css-modules/main.module.css";

// Interfaces
import Movie from "../../types/movie.interface";
import { AppDispatch, RootState } from "../../types/redux.interface";

// Actions
import { getAllMoviesAction, getAllMoviesByGenreAction } from "../../redux/actions/moviesAction";

// Components
import NavBar from "./navbar";
import ListMovies from "./ListMovies";
import Loader from "../loader";

type State = {
  movies: Movie[],
  moviesQuantity: number,
  reload: boolean,
  loading: boolean,
  typeSelected: string,
  sortBySelected: string
}

const NUM_PAGE: string = "0";
const CATEGORIES: string[] = ["all", "action", "documentary", "comedy", "horror", "crime"];

function Main() {
  // Dispatch Instance
  const dispatch = useDispatch<AppDispatch>();

  // Redux State Extraction
  const {
    movies, moviesQuantity, reload, loading, typeSelected, sortBySelected,
  } = useSelector<RootState, State>((state) => state.movies);

  React.useEffect(() => {
    if (reload) {
      if (typeSelected === CATEGORIES[0]) {
        dispatch(getAllMoviesAction(NUM_PAGE, sortBySelected));
      } else {
        dispatch(getAllMoviesByGenreAction(NUM_PAGE, typeSelected, sortBySelected));
      }
    }
  }, [typeSelected, sortBySelected, reload]);

  return (
    <main className={styles.background} data-testid="main">
      <NavBar />
      { loading ? (
        <Loader />
      ) : (
        <>
          <p className={styles.moviesQuantity}>
            <span className={styles.moviesQuantityComplement}>{ moviesQuantity }</span>
            {" "}
            movies found
          </p>
          <ListMovies moviesSelected={movies} />
        </>
      ) }
    </main>
  );
}

export default Main;
