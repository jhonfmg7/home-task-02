interface Movie {
    id: number,
    title: string,
    url: string,
    genres?: string[],
    runtime: number,
    overview: string,
    poster_path: string,
    tagline: string,
    vote_average: number,
    vote_count: number,
    release_date: string,
    budget: number,
    revenue: number
}

export default Movie;