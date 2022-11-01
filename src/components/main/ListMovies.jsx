import React from 'react';
import styles from '../../css-modules/main.module.css';

// Prop Types
import PropTypes from 'prop-types';

// Components
import CardMovie from '/src/components/main/CardMovie.jsx';


const ListMovies = ({ moviesSelected }) => {

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

ListMovies.propTypes = {
    moviesSelected: PropTypes.array.isRequired
}

export default ListMovies