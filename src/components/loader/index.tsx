import * as React from "react";
import styles from "../../css-modules/loader.module.css";

function Loader() {
  return (
    <div className={styles.spinner} data-testid="loader" />
  );
}

export default Loader;
