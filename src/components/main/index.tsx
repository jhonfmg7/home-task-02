import * as React from "react";
import styles from "../../css-modules/main.module.css";

// Utils
import sortedBy from "../../utils/sortedBy";
import camelCase from "../../utils/camelCase";

// Components
import NavBar from "./navbar";
import ListMovies from "./ListMovies";

const movies = [
  {
    id: 1, title: "Pulp Fiction", releaseDate: "2004-01-01", genres: ["Action", "Adventure"], image: "/img/pulpFiction.png", rating: 7.8, movieUrl: "", runtime: 0, overview: "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra",
  },
  {
    id: 2, title: "Bohemian Rhapsody", releaseDate: "2003-01-01", genres: ["Drama", "Biography", "Music"], image: "/img/bohemianRhapsody.png", rating: 8, movieUrl: "", runtime: 10, overview: "",
  },
  {
    id: 3, title: "Kill Bill: Vol 2", releaseDate: "1994-01-01", genres: ["Oscar Winning Movie"], image: "/img/killBill.png", rating: 9, movieUrl: "", runtime: 50, overview: "",
  },
  {
    id: 4, title: "Avengers: Infinity War", releaseDate: "2018-01-01", genres: ["Action", "Adventure"], image: "/img/avengers.png", rating: 7, movieUrl: "", runtime: 180, overview: "",
  },
  {
    id: 5, title: "Inception", releaseDate: "2010-01-01", genres: ["Action", "Adventure"], image: "/img/inception.png", rating: 6, movieUrl: "", runtime: 100, overview: "",
  },
  {
    id: 6, title: "Reservoir Dogs", releaseDate: "1997-01-01", genres: ["Oscar Winning Movie"], image: "/img/reservoirDogs.png", rating: 5, movieUrl: "", runtime: 120, overview: "",
  },
];

function Main() {
  // Local State
  const [typeSelected, setTypeSelected] = React.useState("all");
  const [sortBySelected, setSortBySelected] = React.useState("date");

  const getMovies = () => {
    if (typeSelected === "all") return movies;
    const filteredMovies = movies.filter((item) => item.genres.includes(camelCase(typeSelected)));
    return sortedBy(filteredMovies, sortBySelected);
  };

  const moviesSelected = getMovies();

  return (
    <main className={styles.background} data-testid="main">
      <NavBar
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
        sortBySelected={sortBySelected}
        setSortBySelected={setSortBySelected}
      />
      <p className={styles.moviesQuantity}>
        <span className={styles.moviesQuantityComplement}>{ moviesSelected.length }</span>
        {" "}
        movies found
      </p>
      <ListMovies moviesSelected={moviesSelected} />
    </main>
  );
}

export default Main;
