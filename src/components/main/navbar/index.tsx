import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
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

  // Redux State Extraction
  const { typeSelected, sortBySelected } = useSelector<RootState, State>((state) => state.movies);

  const changeItemSelected = (type: string) => dispatch(setTypeSelectedAction(type));

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarItems}>
        { CATEGORIES.map((category, index) => (
          <li key={index} className={typeSelected === category ? styles.navbarItemActive : styles.navbarItem} onClick={() => changeItemSelected(category)}>{ camelCase(category) }</li>
        )) }
      </ul>
      <div className={styles.sortBySelect}>
        <p className={styles.secondaryText}>Sort by</p>
        <div className={styles.selectContainer}>
          <select className={styles.selectInput} value={sortBySelected} onChange={(e) => dispatch(setSortBySelectedAction(e.target.value))}>
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
