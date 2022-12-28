import * as React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

// Styles
import styles from "../../../css-modules/modal.module.css";
import stylesHeader from "../../../css-modules/header.module.css";

// Interface
import Movie from "../../../types/movie.interface";
import { AppDispatch } from "../../../types/redux.interface";

// Actions
import { createNewMovieAction, editMovieAction } from "../../../redux/actions/moviesAction";

// Components
import Input from "./Input";
import Select from "./Select";

interface Props {
  movie?: Movie,
  setIsOpen: (newState: boolean) => void
}

function AddOrEditForm(props: Props) {
  // Dispatch Instance
  const dispatch = useDispatch<AppDispatch>();

  // Props Extraction
  const { movie, setIsOpen } = props;

  const initialState: Movie = {
    title: "",
    genres: [],
    runtime: 0,
    overview: "",
    poster_path: "",
    tagline: "testing",
    vote_average: 0,
    vote_count: 0,
    release_date: "",
    budget: 0,
    revenue: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    genres: Yup.array().min(1, "Should select at least 1 genre"),
    runtime: Yup.number().moreThan(0, "Should be more than 0 minutes"),
    overview: Yup.string().required("Brief description is necessary"),
    poster_path: Yup.string().url().required("The URL image is required"),
    vote_average: Yup.number().moreThan(0, "Should be more than 0"),
    release_date: Yup.date().required("Date of release is required"),
  });

  const handleReset = (setValues: (newState: Movie) => void) => setValues(initialState);

  return (
    <Formik
      initialValues={movie ?? initialState}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        if (movie) return dispatch(editMovieAction(values, setIsOpen));
        return dispatch(createNewMovieAction(values, setIsOpen));
      }}
    >
      {({
        values,
        errors,
        touched,
        setValues,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form className={styles.form} onSubmit={handleSubmit} data-testid="add_or_edit_form">
          <Input isLarge id="title" title="Title" info={values} value="title" type="text" placeholder="Title" errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
          <Input isLarge={false} id="date" title="Release Date" info={values} value="release_date" type="date" placeholder="Select Date" errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
          <Input isLarge id="url" title="Movie URL Image" info={values} value="poster_path" type="text" placeholder="https://" errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
          <Input isLarge={false} id="rating" title="Rating" info={values} value="vote_average" type="number" placeholder="7.8" errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
          <Select id="genres" title="Genres" info={values} value="genres" errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
          <Input isLarge={false} id="runtime" title="Runtime" info={values} value="runtime" type="number" placeholder="minutes" errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
          <div className={styles.inputGroupExtraLarge}>
            <label htmlFor="overview" className={styles.label}>Overview</label>
            <textarea id="overview" data-cy="new_movie_input_overview" cols={30} rows={10} name="overview" placeholder="Movie Description" className={errors.overview && touched.overview ? styles.inputWithError : styles.input} value={values.overview} onChange={handleChange} />
            <p className={styles.errorInput}>{touched.overview && errors.overview}</p>
          </div>
          <div className={styles.textEnd}>
            <button className={styles.secondaryButton} type="button" data-testid="new_movie_reset_form_button" onClick={() => handleReset(setValues)}>Reset</button>
            <button className={stylesHeader.secondaryButton} type="submit" data-testid="new_movie_submit_button" data-cy="new_movie_submit_button">Submit</button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default AddOrEditForm;
