import * as React from 'react';
import styles from '../../css-modules/main.module.css';

// Components
import CardMovie from './CardMovie';

interface Movie {
    image: string,
    title: string,
    rating: number,
    genres: Array<string>,
    releaseDate: string, 
    runtime: number,
    overview: string, 
    movieUrl: string,
}

interface Props {
    moviesSelected: Array<Movie>
}

const ListMovies = (props: Props) => {

    // Props Extraction
    const { moviesSelected } = props;

    return (
        <section className={ styles.moviesContainer }>
            { moviesSelected.length > 0 ? (
                moviesSelected.map( (item, i) => (
                    <CardMovie key={ i } movie={ item } />
                ) )
            ) : (
                <p className={ styles.emptyMessage }>At this moment, doesn't exist movies to view in this category.</p>
            ) }
        </section>
    )
}

export default ListMovies