interface Movie {
    title: string,
    date: string,
    url: string,
    rating: number,
    genre: string | string[],
    runtime: number,
    overview: string
}

export default Movie;