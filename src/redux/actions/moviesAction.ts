import { AppDispatch } from "../../types/redux.interface";
import Movie from "../../types/movie.interface";
import { GET_MOVIES_ERROR, GET_MOVIES_START, GET_MOVIES_SUCCESS } from "../types";

const BACKEND_URL = "http://localhost:4000/movies?";

export function getAllMoviesAction(numPage: number, sortBy: string) {
    return async(dispatch: AppDispatch) => {
        dispatch(getAllMoviesStart());

        try {
            const response = await fetch(`${ BACKEND_URL }limit=9&offset=${ numPage }&sortBy=${ sortBy }&sortOrder=desc`);
            const data = await response.json();

            if (response.status === 200) {
                dispatch(getAllMoviesSuccess(data.data, data.totalAmount));
            }
        } catch (error) {
            dispatch(getAllMoviesError(error))
        }
    }
}

export function getAllMoviesByGenreAction(numPage: number, genre: string, sortBy: string) {
    return async(dispatch: AppDispatch) => {
        dispatch(getAllMoviesStart());

        try {
            const response = await fetch(`${ BACKEND_URL }limit=9&offset=${ numPage }&sortBy=${ sortBy }&sortOrder=desc&filter=${ genre }`);
            const data = await response.json();

            if (response.status === 200) {
                dispatch(getAllMoviesSuccess(data.data, data.totalAmount));
            }
        } catch (error) {
            dispatch(getAllMoviesError(error))
        }
    }
}

const getAllMoviesStart = () => ({
    type: GET_MOVIES_START
});

const getAllMoviesSuccess = (movies: Movie[], quantity: number) => ({
    type: GET_MOVIES_SUCCESS,
    payload: {movies, quantity}
});

const getAllMoviesError = (error: Error) => ({
    type: GET_MOVIES_ERROR,
    payload: error
});
