import { createContext } from "react";

// Interface
import Movie from "../types/movie.interface";

interface ContextState {
    movieSelected?: Movie,
    setMovieSelected: React.Dispatch<React.SetStateAction<Movie>>,
    isOpenMoreInfoModal: boolean, 
    setIsOpenMoreInfoModal: (newState: boolean) => void
}

const AppContext = createContext<ContextState>(null);

export default AppContext;