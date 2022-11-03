import React, { useState } from 'react';
import styles from '../../css-modules/main.module.css';

// Components
import MovieMenu from './MovieMenu';
import DeleteModal from '../modals/DeleteModal';
import AddOrEditModal from '../modals/AddOrEditModal';
import MoreInfoMovie from '../modals/MoreInfoMovie';

// Prop Types
import PropTypes from 'prop-types';

const CardMovie = ({ movie }) => {

    // Local State 
    const [ isOpenMenu, setIsOpenMenu ] = useState(false);
    const [ isOpenMoreInfoModal, setIsOpenMoreInfoModal ] = useState(false);
    const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState(false);
    const [ isOpenEditModal, setIsOpenEditModal ] = useState(false);

    return (
        <>
            { isOpenMoreInfoModal && (
                <MoreInfoMovie movie={ movie } setIsOpen={ setIsOpenMoreInfoModal } />
            ) }
            { isOpenDeleteModal && (
                <DeleteModal title="Delete" setIsOpen={ setIsOpenDeleteModal } setIsOpenMenu={ setIsOpenMenu } />
            ) }
            { isOpenEditModal && (
                <AddOrEditModal 
                    title="Edit" 
                    setIsOpen={ setIsOpenEditModal } 
                    setIsOpenMenu={ setIsOpenMenu }
                    movieInfo={{ 
                        title: movie.title,
                        date: movie.releaseDate,
                        url: movie.movieUrl,
                        rating: movie.rating,
                        genre: movie.genre,
                        runtime: movie.runtime,
                        overview: movie.overview
                    }} 
                />
            ) }
            <article className={ styles.movieItem }>
                <div className={ styles.menuContainer }>
                    <div className={ styles.menuButton } onClick={ () => setIsOpenMenu(!isOpenMenu) }>...</div>
                    { isOpenMenu && (
                        <MovieMenu setIsOpen={ setIsOpenMenu } setIsOpenDeleteModal={ setIsOpenDeleteModal } setIsOpenEditModal={ setIsOpenEditModal } />
                    ) }
                </div>
                <img src={ movie.image } alt={ `${ movie.title }.png` } className={ styles.movieImage } onClick={ () => setIsOpenMoreInfoModal(true) } />
                <div className={ styles.titleContainer }>
                    <p className={ styles.movieTitle }>{ movie.title }</p>
                    <p className={ styles.movieDate }>{ movie.releaseDate.split('-')[0] }</p>
                </div>
                <p className={ styles.genres }>
                    { movie.genres.join(' & ') }
                </p>
            </article>
        </>
    )
}

CardMovie.propTypes = {
    movie: PropTypes.object.isRequired
}

export default CardMovie