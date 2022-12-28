import Movie from "../types/movie.interface";

interface InitialState {
    movies: Movie[],
    moviesQuantity: number,
    movieSelected: Movie | null,
    isOpenMoreInfoModal: boolean,
    reload: boolean,
    typeSelected: string,
    sortBySelected: string,
    loading: boolean,
    error: string | null,
    message: string,
    deleteLoading: boolean,
    errorDelete: Error
}

const initialState: InitialState = {
  movies: [],
  moviesQuantity: 0,
  movieSelected: null,
  isOpenMoreInfoModal: false,
  reload: true,
  typeSelected: "all",
  sortBySelected: "release_date",
  loading: false,
  error: null,
  message: null,
  deleteLoading: false,
  errorDelete: null,
};

export default initialState;
