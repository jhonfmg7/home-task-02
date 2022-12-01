import Movie from "../../types/movie.interface";
import { CLEAR_MESSAGES, DELETE_MOVIE_ERROR, DELETE_MOVIE_START, DELETE_MOVIE_SUCCESS, GET_MOVIES_ERROR, GET_MOVIES_START, GET_MOVIES_SUCCESS, SET_RELOAD, SET_SORTBY_SELECTED, SET_TYPE_SELECTED } from "../types";

interface InitialState {
    movies: Movie[],
    moviesQuantity: number,
    reload: boolean,
    typeSelected: string,
    sortBySelected: string,
    loading: boolean,
    error: Error | any,
    messageDelete: string,
    deleteLoading: boolean,
    errorDelete: Error
}

interface Payload {
    movies: Movie[],
    quantity: number,
    reload: boolean,
    type: string,
    sortBy: string
}

interface Action {
    type: string,
    payload?: Payload
}

const initialState: InitialState = {
    movies: [],
    moviesQuantity: 0,
    reload: false,
    typeSelected: "all",
    sortBySelected: "release_date",
    loading: false,
    error: null,
    messageDelete: null,
    deleteLoading: false,
    errorDelete: null
}

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_RELOAD:
            return {
                ...state,
                reload: action.payload.reload
            }
        case SET_TYPE_SELECTED:
            return {
                ...state,
                typeSelected: action.payload.type
            }
        case SET_SORTBY_SELECTED:
            return {
                ...state,
                sortBySelected: action.payload.sortBy
            }
        case GET_MOVIES_START:
            return {
                ...state,
                loading: true,
                error: null,
                movies: []
            }
        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                movies: action.payload.movies,
                moviesQuantity: action.payload.quantity
            }
        case GET_MOVIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                movies: []
            }
        case DELETE_MOVIE_START:
            return {
                ...state,
                deleteLoading: true,
                errorDelete: null
            }
        case DELETE_MOVIE_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                messageDelete: action.payload
            }
        case DELETE_MOVIE_ERROR:
            return {
                ...state,
                deleteLoading: false,
                errorDelete: action.payload
            }
        case CLEAR_MESSAGES:
            return {
                ...state,
                errorDelete: null,
                messageDelete: null
            }
        default:
            return state;
    }
}