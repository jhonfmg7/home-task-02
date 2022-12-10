import * as React from "react";
import styles from "../../../css-modules/modal.module.css";

// Constantes
import { OPTIONS } from "../../../constants";

// Interfaces
import Input from "../../../types/input.interface";

// const OPTIONS = ["Action", "Adventure", "Science Fiction", "Horror", "Documentary", "Comedy", "Crime"];

function Select(props: Input) {
  // Props Extraction
  const {
    id, title, info, value, errors, touched, handleChange, handleBlur,
  } = props;

  return (
    <div className={styles.inputGroupLarge}>
      <label htmlFor={id} className={styles.label}>{ title }</label>
      <select
        id={id}
        name={value}
        value={info[value]}
        className={errors[value] && touched[value] ? styles.inputWithError : styles.input}
        multiple
        onChange={handleChange}
        onBlur={handleBlur}
      >
        { OPTIONS.map( option => (
          <option key={option} value={option}>{ option }</option>
        ) ) }
      </select>
      <p className={styles.errorInput}>{touched[value] && errors[value]}</p>
    </div>
  );
}

export default Select;
