import * as React from "react";
import styles from "../../../css-modules/modal.module.css";

// Interface
import InputInterface from "../../../types/input.interface";

function Input(props: InputInterface) {
  // Props Extraction
  const {
    isLarge, id, title, info, value, type, placeholder, errors, touched, handleChange, handleBlur,
  } = props;

  return (
    <div className={isLarge ? styles.inputGroupLarge : styles.inputGroupShort}>
      <label htmlFor={id} className={styles.label}>{ title }</label>
      <input
        id={id}
        name={value}
        type={type}
        placeholder={placeholder}
        className={errors[value] && touched[value] ? styles.inputWithError : styles.input}
        value={info[value]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p className={styles.errorInput}>{errors[value] && touched[value] && errors[value]}</p>
    </div>
  );
}

export default Input;
