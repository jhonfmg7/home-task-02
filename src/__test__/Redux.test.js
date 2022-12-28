import moviesReducer from "../redux/reducers/moviesReducer";
import { CLEAR_MESSAGES, DELETE_MOVIE_ERROR, DELETE_MOVIE_START, DELETE_MOVIE_SUCCESS, SET_RELOAD } from "../redux/types";

const OBJECT_TO_MATCH = {
    deleteLoading: false,
    error: null,
    errorDelete: null,
    isOpenMoreInfoModal: false,
    loading: false,
    message: null,
    movieSelected: null,
    movies: [],
    moviesQuantity: 0,
    reload: true,
    sortBySelected: "release_date",
    typeSelected: "all",
}

test('<Main /> validate redux reducer when you pass a empty type', () => {
    const initialState = undefined;
    const action = { type: "" }
    const result = moviesReducer(initialState, action);
    
    expect( Object.keys(result).length ).toBeGreaterThan(0)
    expect( result ).toMatchObject(OBJECT_TO_MATCH);
    expect( result ).toMatchSnapshot();
});

test('<Main /> validate redux reducer when you pass a reload type', () => {
    const initialState = undefined;

    // Reload true
    const actionWithTrue = { type: SET_RELOAD, payload: { reload: true } }
    let result = moviesReducer(initialState, actionWithTrue);
    
    expect( Object.keys(result).length ).toBeGreaterThan(0)
    expect( result ).toMatchObject(OBJECT_TO_MATCH);

    // Reload false
    const actionWithFalse = { type: SET_RELOAD, payload: { reload: false } }
    result = moviesReducer(initialState, actionWithFalse);

    expect( Object.keys(result).length ).toBeGreaterThan(0)
    expect( result ).toMatchObject({ ...OBJECT_TO_MATCH, reload: false });
});

test('<Main /> validate redux reducer when you pass a start type', () => {
    const initialState = undefined;

    // Reload true
    const action = { type: DELETE_MOVIE_START }
    let result = moviesReducer(initialState, action);

    expect( Object.keys(result).length ).toBeGreaterThan(0)
    expect( result ).toMatchObject({...OBJECT_TO_MATCH, deleteLoading: true});
});

test('<Main /> validate redux reducer when you pass a success type', () => {
    const initialState = undefined;

    // Reload true
    const action = { type: DELETE_MOVIE_SUCCESS, payload: { message: "testing message"} }
    let result = moviesReducer(initialState, action);

    expect( Object.keys(result).length ).toBeGreaterThan(0)
    expect( result ).toMatchObject({...OBJECT_TO_MATCH, message: "testing message"});
});

test('<Main /> validate redux reducer when you pass a error type', () => {
    const initialState = undefined;

    // Reload true
    const errorCreated = new Error({ msg: "error system" })
    const action = { type: DELETE_MOVIE_ERROR, payload: { error: errorCreated } }
    let result = moviesReducer(initialState, action);

    expect( Object.keys(result).length ).toBeGreaterThan(0)
    expect( result ).toMatchObject({...OBJECT_TO_MATCH, error: errorCreated});
});

test('<Main /> validate redux reducer when you pass a clear message type', () => {
    const initialState = undefined;

    // Reload true
    const action = { type: CLEAR_MESSAGES }
    let result = moviesReducer(initialState, action);

    expect( Object.keys(result).length ).toBeGreaterThan(0)
    expect( result ).toMatchObject(OBJECT_TO_MATCH);
});