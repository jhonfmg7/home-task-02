import { FormikErrors, FormikTouched } from "formik";

// Interface
import Movie from "./movie.interface";

interface InputInterface {
    isLarge?: boolean,
    id: string,
    title: string,
    info: Movie,
    value: keyof Movie,
    type?: string,
    placeholder?: string,
    errors: FormikErrors<Movie>,
    touched: FormikTouched<Movie>,
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>,
    handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>
}

export default InputInterface;