import React, { useState, useEffect } from 'react';
import styles from '../../css-modules/main.module.css';

// Utils
import sortedBy from '../../utils/sortedBy';
import camelCase from '../../utils/camelCase';

// Components
import NavBar from '/src/components/main/navbar/index.jsx';
import ListMovies from '/src/components/main/ListMovies.jsx';

const movies = [
    { id: 1, title: "Pulp Fiction", releaseDate: "2004/01/01", genres: [ "Action", "Adventure" ], image: "/img/pulpFiction.png", rating: 7.8, movieUrl: "", runtime: 0, overview: "" },
    { id: 2, title: "Bohemian Rhapsody", releaseDate: "2003/01/01", genres: [ "Drama", "Biography", "Music" ], image: "/img/bohemianRhapsody.png", rating: 8, movieUrl: "", runtime: 10, overview: "" },
    { id: 3, title: "Kill Bill: Vol 2", releaseDate: "1994/01/01", genres: [ "Oscar Winning Movie" ], image: "/img/killBill.png", rating: 9, movieUrl: "", runtime: 50, overview: "" },
    { id: 4, title: "Avengers: Infinity War", releaseDate: "2018/01/01", genres: [ "Action", "Adventure" ], image: "/img/avengers.png", rating: 7, movieUrl: "", runtime: 180, overview: "" },
    { id: 5, title: "Inception", releaseDate: "2010/01/01", genres: [ "Action", "Adventure" ], image: "/img/inception.png", rating: 6, movieUrl: "", runtime: 100, overview: "" },
    { id: 6, title: "Reservoir Dogs", releaseDate: "1997/01/01", genres: [ "Oscar Winning Movie" ], image: "/img/reservoirDogs.png", rating: 5, movieUrl: "", runtime: 120, overview: "" },
]

const Main = () => {

    // Local State
    const [ typeSelected, setTypeSelected ] = useState('all');
    const [ sortBySelected, setSortBySelected ] = useState('date');
    const [ moviesSelected, setMoviesSelected ] = useState([]);

    useEffect(() => {
        if (typeSelected === "all") return setMoviesSelected(movies);
        let filteredMovies = movies.filter( item => {
            return item.genres.includes(camelCase(typeSelected));
        } );
        let sortedMovies = sortedBy(filteredMovies, sortBySelected);
        setMoviesSelected(sortedMovies);
    }, [ typeSelected, sortBySelected ]);

    return (
        <main className={ styles.background } data-testid="main">
            <NavBar 
                typeSelected={ typeSelected } 
                setTypeSelected={ setTypeSelected } 
                sortBySelected={ sortBySelected } 
                setSortBySelected={ setSortBySelected }
            ></NavBar>
            <ListMovies moviesSelected={ moviesSelected } />
        </main>
    )
}

export default Main