import * as React from "react";
import styles from "../../css-modules/main.module.css";

// Interface
import Movie from "../../types/movie.interface";

// Components
import CardMovie from "./CardMovie";

interface Props {
    moviesSelected: Movie[]
}

function ListMovies(props: Props) {
  // Props Extraction
  const { moviesSelected } = props;

  return (
    <section className={styles.moviesContainer}>
      { moviesSelected.length > 0 ? (
        moviesSelected.map((item, i) => (
          <CardMovie key={i} movie={item} />
        ))
      ) : (
        <p className={styles.emptyMessage}>At this moment, doesn't exist movies to view in this category.</p>
      ) }
    </section>
  );
}

export default ListMovies;
