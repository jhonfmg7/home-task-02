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
  loading: boolean
}

function Main() {
  // Dispatch Instance
  const dispatch = useDispatch<AppDispatch>();

  // Redux State Extraction
  const { movies, moviesQuantity, loading } = useSelector<RootState, State>((state) => state.movies);

  // Local State
  const [typeSelected, setTypeSelected] = React.useState("all");
  const [sortBySelected, setSortBySelected] = React.useState("release_date");

  React.useEffect(() => {
    if (typeSelected === "all") {
      dispatch(getAllMoviesAction(0, sortBySelected));
    } else {
      dispatch(getAllMoviesByGenreAction(0, typeSelected, sortBySelected));
    }
  }, [typeSelected, sortBySelected]);

  return (
    <main className={styles.background} data-testid="main">
      <NavBar
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
        sortBySelected={sortBySelected}
        setSortBySelected={setSortBySelected}
      />
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
