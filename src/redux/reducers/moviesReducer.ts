import Movie from "../../types/movie.interface";
import { GET_MOVIES_ERROR, GET_MOVIES_START, GET_MOVIES_SUCCESS } from "../types";

interface InitialState {
    movies: Movie[],
    moviesQuantity: number,
    loading: boolean,
    error: Error | any
}

interface Payload {
    movies: Movie[],
    quantity: number
}

interface Action {
    type: string,
    payload?: Payload
}

const initialState: InitialState = {
    movies: [],
    moviesQuantity: 0,
    loading: false,
    error: null
}

export default (state = initialState, action: Action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}