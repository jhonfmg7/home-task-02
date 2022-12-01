import { AppDispatch } from "../../types/redux.interface";
import Movie from "../../types/movie.interface";
import { CLEAR_MESSAGES, CREATE_MOVIE_ERROR, CREATE_MOVIE_START, CREATE_MOVIE_SUCCESS, DELETE_MOVIE_ERROR, DELETE_MOVIE_START, DELETE_MOVIE_SUCCESS, EDIT_MOVIE_ERROR, EDIT_MOVIE_START, EDIT_MOVIE_SUCCESS, GET_MOVIES_ERROR, GET_MOVIES_START, GET_MOVIES_SUCCESS, SET_RELOAD, SET_SORTBY_SELECTED, SET_TYPE_SELECTED } from "../types";

const BACKEND_URL = "http://localhost:4000/movies";
const MOVIES_PER_PAGE = "9";
const SORT_ORDER = "desc";

const clearMessages = () => ({
    type: CLEAR_MESSAGES
});

export function launchReloadAction() {
    return (dispatch: AppDispatch) => {
        dispatch(setReload(true));
        setTimeout(() => {
            dispatch(setReload(false));
        }, 500);
    }
}

const setReload = (reload: boolean) => ({
    type: SET_RELOAD,
    payload: {reload}
})

export function setTypeSelectedAction(type: string) {
    return (dispatch: AppDispatch) => {
        dispatch(setTypeSelected(type));
    }
}

const setTypeSelected = (type: string) => ({
    type: SET_TYPE_SELECTED,
    payload: {type}
});

export function setSortBySelectedAction(sortBy: string) {
    return (dispatch: AppDispatch) => {
        dispatch(setSortBySelected(sortBy));
    }
}

const setSortBySelected = (sortBy: string) => ({
    type: SET_SORTBY_SELECTED,
    payload: {sortBy}
});

export function getAllMoviesAction(numPage: string, sortBy: string) {
    return async(dispatch: AppDispatch) => {
        dispatch(getAllMoviesStart());

        try {
            const searchParams = new URLSearchParams({ limit: MOVIES_PER_PAGE, offset: numPage, sortBy, sortOrder: SORT_ORDER });
            const response = await fetch(`${ BACKEND_URL }?${searchParams}`);
            const data = await response.json();

            if (response.status === 200) {
                dispatch(getAllMoviesSuccess(data.data, data.totalAmount));
            }
        } catch (error) {
            dispatch(getAllMoviesError(error))
        }
    }
}

export function getAllMoviesByGenreAction(numPage: string, genre: string, sortBy: string) {
    return async(dispatch: AppDispatch) => {
        dispatch(getAllMoviesStart());

        try {
            const searchParams = new URLSearchParams({ limit: MOVIES_PER_PAGE, offset: numPage, sortBy, sortOrder: SORT_ORDER, filter: genre });
            const response = await fetch(`${ BACKEND_URL }?${searchParams}`);
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

export function createNewMovieAction(info: Movie) {
    return async(dispatch: AppDispatch) => {
        dispatch(createMovieStart());
        
        try {
            const response = await fetch(`${ BACKEND_URL }`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
            dispatch(createMovieError(error));
        }
    }
}

const createMovieStart = () => ({
    type: CREATE_MOVIE_START
});

const createMovieSuccess = (response: Movie) => ({
    type: CREATE_MOVIE_SUCCESS,
    payload: response
});

const createMovieError = (error: Error) => ({
    type: CREATE_MOVIE_ERROR,
    payload: error
});

export function editMovieAction(data: Movie) {
    return async(dispatch: AppDispatch) => {
        dispatch(editMovieStart());
        console.log(data);
        try {
            
        } catch (error) {
            dispatch(editMovieError(error));
        }
    }
}

const editMovieStart = () => ({
    type: EDIT_MOVIE_START
});

const editMovieSuccess = (response: Movie) => ({
    type: EDIT_MOVIE_SUCCESS,
    payload: response
});

const editMovieError = (error: Error) => ({
    type: EDIT_MOVIE_ERROR,
    payload: error
});

export function deleteMovieAction(id: number) {
    return async(dispatch: AppDispatch) => {
        dispatch(deleteMovieStart());

        try {
            const response = await fetch(`${ BACKEND_URL }/${ id }`, {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 204) {
                dispatch(deleteMovieSuccess("The movie was deleted successfully"));
                dispatch(launchReloadAction());
                setTimeout(() => {
                    dispatch(clearMessages());
                }, 3000);
            }
        } catch (error) {
            dispatch(deleteMovieError(error))
        }
    }
}

const deleteMovieStart = () => ({
    type: DELETE_MOVIE_START
});

const deleteMovieSuccess = (response: string) => ({
    type: DELETE_MOVIE_SUCCESS,
    payload: response
});

const deleteMovieError = (error: Error) => ({
    type: DELETE_MOVIE_ERROR,
    payload: error
});