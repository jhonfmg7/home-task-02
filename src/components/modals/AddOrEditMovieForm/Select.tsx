import { FormikErrors, FormikTouched } from "formik";
import * as React from "react";
import styles from "../../../css-modules/modal.module.css";

// Interfaces
import Movie from "../../../types/movie.interface";

interface Props {
    id: string,
    title: string,
    info: Movie,
    value: keyof Movie,
    errors: FormikErrors<Movie>,
    touched: FormikTouched<Movie>,
    handleChange: React.ChangeEventHandler<HTMLSelectElement>,
    handleBlur: React.FocusEventHandler<HTMLSelectElement>
}

function Select(props: Props) {
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
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Horror">Horror</option>
        <option value="Documentary">Documentary</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
      </select>
      <p className={styles.errorInput}>{errors[value] && touched[value] && errors[value]}</p>
    </div>
  );
}

export default Select;
