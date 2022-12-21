import * as React from "react";
import styles from "../../css-modules/modal.module.css";
import stylesHeader from "../../css-modules/header.module.css";

// Interface
import Movie from "../../types/movie.interface";

// Components
import Logo from "../logo";

// Utils
import timeConverter from "../../utils/timeConverter";

interface Props {
    movie?: Movie,
    setIsOpen: any
}

const MoreInfoMovie: React.FC<Props> = ({ movie, setIsOpen }) => {
  const handleClose = () => setIsOpen();

  React.useEffect(() => {
    const element = document.querySelector("#header");
    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={styles.modalAlternative} data-testid="more_info_movie_modal">
      <div className={stylesHeader.container}>
        <a href="#" className={stylesHeader.noTextDecoration}>
          <Logo />
        </a>
        <div className={styles.closeIcon}>
          <h2 className={styles.iconAlternative} onClick={handleClose} data-testid="more_info_movie_close_button">
            <span className="material-symbols-outlined">
              search
            </span>
          </h2>
        </div>
      </div>
      <div className={stylesHeader.container}>
        <div className={styles.movieImageContainer}>
          <img src={movie.poster_path} alt={`${movie.title}.png`} className={styles.movieImageAlternative} />
        </div>
        <div className={styles.movieInfoContainer}>
          <div className={styles.alternativeTitleContainer}>
            <h4 className={styles.alternativeTitle}>{ movie.title }</h4>
            <p className={styles.genres}>
              { movie.genres.join(" & ") }
            </p>
          </div>
          <div className={styles.rating}>
            <p className={styles.ratingCircle}>{ movie.vote_average }</p>
          </div>
          <p className={styles.releaseDate}>{ movie.release_date.split("-")[0] }</p>
          <p className={styles.runtime}>{ timeConverter(movie.runtime) }</p>
          <p className={styles.overview}>{ movie.overview }</p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoMovie;
