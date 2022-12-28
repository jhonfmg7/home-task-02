import fetch from 'cross-fetch';
import { CHANGE_STATE_MORE_INFO_MODAL, CLEAR_MESSAGES, CREATE_MOVIE_ERROR, CREATE_MOVIE_START, CREATE_MOVIE_SUCCESS, DELETE_MOVIE_ERROR, DELETE_MOVIE_START, DELETE_MOVIE_SUCCESS, EDIT_MOVIE_ERROR, EDIT_MOVIE_START, EDIT_MOVIE_SUCCESS, GET_MOVIES_ERROR, GET_MOVIES_START, GET_MOVIES_SUCCESS, SET_MOVIE_SELECTED, SET_RELOAD, SET_SORTBY_SELECTED, SET_TYPE_SELECTED } from "../types";

// Interface
import Movie from "../../types/movie.interface";
import { AppDispatch } from "../../types/redux.interface";
import { OPTIONS } from "../../constants";

type Headers = {
    'Content-type': string
}

interface RequestInterface {
    credentials: RequestCredentials,
    mode: RequestMode,
    cache: RequestCache,
    headers: Headers
}

const BACKEND_URL: string = "http://localhost:4000/movies";
const MOVIES_PER_PAGE: string = "9";
const SORT_ORDER: string = "desc";
const TIME_TO_LAUNCH_RELOAD: number = 3000;
const COMMON_OPTIONS: RequestInterface = {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        'Content-type': 'application/json'
    }
}

const clearMessages = () => ({
    type: CLEAR_MESSAGES
});

export function launchReloadAction() {
    return (dispatch: AppDispatch) => {
        dispatch(setReload(true));
        setTimeout(() => {
            dispatch(clearMessages());
        }, TIME_TO_LAUNCH_RELOAD);
    }
}

const setReload = (reload: boolean) => ({
    type: SET_RELOAD,
    payload: {reload}
});

export function setMovieSelectedAction(movie: Movie) {
    return (dispatch: AppDispatch) => {
        dispatch(setMovieSelected(movie));
    }
}

const setMovieSelected = (movie: Movie) => ({
    type: SET_MOVIE_SELECTED,
    payload: {movie}
});

export function changeStateMoreInfoModalAction(state: boolean) {
    return (dispatch: AppDispatch) => {
        dispatch(changeStateMoreInfoModal(state));
    }
}

const changeStateMoreInfoModal = (state: boolean) => ({
    type: CHANGE_STATE_MORE_INFO_MODAL,
    payload: {state}
});

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

export function getAllMoviesByGenreAction(numPage: string, sortBy: string, genre?: string) {
    return async(dispatch: AppDispatch) => {
        dispatch(getAllMoviesStart());
        try {
            const params = { limit: MOVIES_PER_PAGE, offset: numPage, sortBy, sortOrder: SORT_ORDER }
            const paramsWithFilter = { limit: MOVIES_PER_PAGE, offset: numPage, sortBy, sortOrder: SORT_ORDER, filter: genre };
            const searchParams = new URLSearchParams(genre === OPTIONS[0] ? params : paramsWithFilter);
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
    payload: {error}
});

export function createNewMovieAction(info: Movie, setIsOpen: (newState: boolean) => void) {
    return async(dispatch: AppDispatch) => {
        dispatch(createMovieStart());
        
        try {
            const response = await fetch(`${ BACKEND_URL }`, { ...COMMON_OPTIONS, method: "POST", body: JSON.stringify(info) });
            if (response.status === 201) {
                dispatch(createMovieSuccess("The movie was created successfully"));
                dispatch(launchReloadAction());
                setIsOpen(false);
            }
        } catch (error) {
            dispatch(createMovieError(error));
        }
    }
}

const createMovieStart = () => ({
    type: CREATE_MOVIE_START
});

const createMovieSuccess = (response: string) => ({
    type: CREATE_MOVIE_SUCCESS,
    payload: {message: response}
});

const createMovieError = (error: Error) => ({
    type: CREATE_MOVIE_ERROR,
    payload: {error}
});

export function editMovieAction(info: Movie, setIsOpen: (newState: boolean) => void) {
    return async(dispatch: AppDispatch) => {
        dispatch(editMovieStart());
        try {
            const response = await fetch(`${ BACKEND_URL }`, { ...COMMON_OPTIONS, method: "PUT", body: JSON.stringify(info) }); 
            if (response.status === 200) {
                dispatch(editMovieSuccess("The movie was edited successfully"));
                dispatch(launchReloadAction());
                setIsOpen(false);
            }
        } catch (error) {
            dispatch(editMovieError(error));
        }
    }
}

const editMovieStart = () => ({
    type: EDIT_MOVIE_START
});

const editMovieSuccess = (response: string) => ({
    type: EDIT_MOVIE_SUCCESS,
    payload: {message: response}
});

const editMovieError = (error: Error) => ({
    type: EDIT_MOVIE_ERROR,
    payload: {error}
});

export function deleteMovieAction(id: number) {
    return async(dispatch: AppDispatch) => {
        dispatch(deleteMovieStart());

        try {
            const response = await fetch(`${ BACKEND_URL }/${ id }`, { ...COMMON_OPTIONS, method: "DELETE" })
            if (response.status === 204) {
                dispatch(deleteMovieSuccess("The movie was deleted successfully"));
                dispatch(launchReloadAction());
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
    payload: {message: response}
});

const deleteMovieError = (error: Error) => ({
    type: DELETE_MOVIE_ERROR,
    payload: {error}
});