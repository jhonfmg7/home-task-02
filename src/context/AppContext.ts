import { createContext } from "react";

interface Movie {
    image: string,
    title: string,
    rating: number,
    genres?: string[],
    releaseDate: string,
    runtime: number,
    overview: string
}

interface ContextState {
    movieSelected?: Movie,
    setMovieSelected: React.Dispatch<React.SetStateAction<Movie>>,
    isOpenMoreInfoModal: boolean, 
    setIsOpenMoreInfoModal: (newState: boolean) => void
}

const AppContext = createContext<ContextState>(null);

export default AppContext;