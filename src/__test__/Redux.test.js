import moviesReducer from "../redux/reducers/moviesReducer";

test('<Main /> validate redux reducer when you pass a empty type', () => {
    const initialState = undefined;
    const action = { type: "" }
    const result = moviesReducer(initialState, action);
    
    expect( Object.keys(result).length ).toBeGreaterThan(0)
    expect( result ).toMatchObject({
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
    });
});