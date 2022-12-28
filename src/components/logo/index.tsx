import * as React from "react";
import styles from "../../css-modules/global.module.css";

function Logo() {
  return (
    <p className={styles.text} data-testid="header_logo">
      netflix
      <span className={styles.textComplement}>roulette</span>
    </p>
  );
}

export default Logo;
