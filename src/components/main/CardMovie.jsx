import React from 'react';
import styles from '../../css-modules/main.module.css';

// Prop Types
import PropTypes from 'prop-types';


const CardMovie = ({ movie }) => {
    return (
        <article className={ styles.movieItem }>
            <img src={ movie.image } alt={ `${ movie.title }.png` } />
            <div className={ styles.titleContainer }>
                <p className={ styles.movieTitle }>{ movie.title }</p>
                <p className={ styles.movieDate }>{ movie.releaseDate.split('/')[0] }</p>
            </div>
            <p className={ styles.genres }>
                { movie.genres.join(' & ') }
            </p>
        </article>
    )
}

CardMovie.propTypes = {
    movie: PropTypes.object.isRequired
}

export default CardMovie