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
    id: 1, title: "Pulp Fiction", releaseDate: "2004-01-01", genres: ["Action", "Adventure"], image: "/img/pulpFiction.png", rating: 7.8, movieUrl: "", runtime: 100, overview: "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra",
  },
  {
    id: 2, title: "Bohemian Rhapsody", releaseDate: "2003-01-01", genres: ["Drama", "Biography", "Music"], image: "/img/bohemianRhapsody.png", rating: 8, movieUrl: "", runtime: 200, overview: "Bohemian Rhapsody is a 2018 biographical musical drama film directed by Bryan Singer[a] from a screenplay by Anthony McCarten, and produced by Graham King and Queen manager Jim Beach. It focuses on the life of Freddie Mercury, the lead singer of the British rock band Queen, from the formation of the band in 1970 to their 1985 Live Aid performance at the original Wembley Stadium. It stars Rami Malek as Mercury, with Lucy Boynton, Gwilym Lee, Ben Hardy, Joe Mazzello, Aidan Gillen, Tom Hollander, and Mike Myers in supporting roles. Queen members Brian May and Roger Taylor also served as consultants. A British-American venture, it was produced by Regency Enterprises, GK Films and Queen Films, and was distributed by 20th Century Fox.",
  },
  {
    id: 3, title: "Kill Bill: Vol 2", releaseDate: "1994-01-01", genres: ["Oscar Winning Movie"], image: "/img/killBill.png", rating: 9, movieUrl: "", runtime: 500, overview: "Kill Bill: Volume 2 is a 2004 American neo-Western martial arts film written and directed by Quentin Tarantino. It stars Uma Thurman as the Bride, who continues her campaign of revenge against the Deadly Viper Assassination Squad (Lucy Liu, Michael Madsen, Daryl Hannah, and Vivica A. Fox) and their leader Bill (David Carradine), who tried to kill her and her unborn child.",
  },
  {
    id: 4, title: "Avengers: Infinity War", releaseDate: "2018-01-01", genres: ["Action", "Adventure"], image: "/img/avengers.png", rating: 7, movieUrl: "", runtime: 180, overview: "Avengers: Infinity War is a 2018 American superhero film based on the Marvel Comics superhero team the Avengers. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the sequel to The Avengers (2012) and Avengers: Age of Ultron (2015), and the 19th film in the Marvel Cinematic Universe (MCU). Directed by Anthony and Joe Russo and written by Christopher Markus and Stephen McFeely, the film features an ensemble cast including Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson, Benedict Cumberbatch, Don Cheadle, Tom Holland, Chadwick Boseman, Paul Bettany, Elizabeth Olsen, Anthony Mackie, Sebastian Stan, Danai Gurira, Letitia Wright, Dave Bautista, Zoe Saldaña, Josh Brolin, and Chris Pratt. In the film, the Avengers and the Guardians of the Galaxy attempt to prevent Thanos from collecting the six all-powerful Infinity Stones as part of his quest to kill half of all life in the universe.",
  },
  {
    id: 5, title: "Inception", releaseDate: "2010-01-01", genres: ["Action", "Adventure"], image: "/img/inception.png", rating: 6, movieUrl: "", runtime: 100, overview: "Inception is a 2010 science fiction action film[4][5][6] written and directed by Christopher Nolan, who also produced the film with Emma Thomas, his wife. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets. He is offered a chance to have his criminal history erased as payment for the implantation of another person's idea into a target's subconscious.[7] The ensemble cast includes Ken Watanabe, Joseph Gordon-Levitt, Marion Cotillard, Elliot Page,[a] Tom Hardy, Dileep Rao, Cillian Murphy, Tom Berenger, and Michael Caine.",
  },
  {
    id: 6, title: "Reservoir Dogs", releaseDate: "1997-01-01", genres: ["Oscar Winning Movie"], image: "/img/reservoirDogs.png", rating: 5, movieUrl: "", runtime: 120, overview: "Reservoir Dogs is a 1992 American crime film written and directed by Quentin Tarantino in his feature-length debut. It stars Harvey Keitel, Tim Roth, Chris Penn, Steve Buscemi, Lawrence Tierney, Michael Madsen, Tarantino, and Edward Bunker as diamond thieves whose heist of a jewelry store goes terribly wrong. Kirk Baltz, Randy Brooks, and Steven Wright also play supporting roles. It incorporates many motifs that have become Tarantino's hallmarks: violent crime, pop culture references, profanity, and nonlinear storytelling.",
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
