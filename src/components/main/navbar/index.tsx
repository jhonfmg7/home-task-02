import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styles from "../../../css-modules/main.module.css";

// Actions
import { setSortBySelectedAction, setTypeSelectedAction } from "../../../redux/actions/moviesAction";

// Interface
import { AppDispatch, RootState } from "../../../types/redux.interface";

// Utils
import camelCase from "../../../utils/camelCase";

type State = {
  typeSelected: string,
  sortBySelected: string
}

const CATEGORIES: string[] = ["all", "action", "documentary", "comedy", "horror", "crime"];

function NavBar() {
  // Dispatch Instance
  const dispatch = useDispatch<AppDispatch>();

  // URL Extraction
  const [searchParams, setSearchParams] = useSearchParams();

  // Redux State Extraction
  const { typeSelected, sortBySelected } = useSelector<RootState, State>((state) => state.movies);

  React.useEffect(() => {
    const searchParamsGenre = searchParams.get("genre");
    const searchParamsSortBy = searchParams.get("sortBy");
    dispatch(setTypeSelectedAction(searchParamsGenre));
    dispatch(setSortBySelectedAction(searchParamsSortBy));
  }, [searchParams]);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarItems}>
        { CATEGORIES.map((category, index) => (
          <li key={index} data-testid={`genre_option_${category}`} className={searchParams.get("genre") === category ? styles.navbarItemActive : styles.navbarItem} onClick={() => setSearchParams({ genre: category, sortBy: sortBySelected })}>{ camelCase(category) }</li>
        )) }
      </ul>
      <div className={styles.sortBySelect}>
        <p className={styles.secondaryText}>Sort by</p>
        <div className={styles.selectContainer}>
          <select className={styles.selectInput} value={searchParams.get("sortBy") ?? ""} data-testid="sortby_select" onChange={(e) => setSearchParams({ genre: typeSelected, sortBy: e.target.value })}>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Rating</option>
            <option value="runtime">Runtime</option>
          </select>
          <div className={styles.selectInputRow} />
        </div>
      </div>
      <div className={styles.grayStrike} />
    </nav>
  );
}

export default NavBar;
