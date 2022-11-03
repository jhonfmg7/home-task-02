import * as React from 'react';
import styles from '../../css-modules/modal.module.css';
import stylesHeader from '../../css-modules/header.module.css';

// Components
import Logo from '../logo/index.jsx';

// Utils
import timeConverter from '../../utils/timeConverter';

interface Movie {
    image: string,
    title: string,
    rating: number,
    genres: Array<String>,
    releaseDate: string, 
    runtime: number,
    overview: string
}

interface Props {
    movie: Movie,
    setIsOpen: Function
}

const MoreInfoMovie: React.FunctionComponent = (props: Props) => {

    // Props Extraction
    const { movie, setIsOpen } = props;

    const handleClose = () => setIsOpen(false);

    React.useEffect(() => {
        const element = document.querySelector('#header');
        element.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div className={ styles.modalAlternative }>
            <div className={ stylesHeader.container }>
                <a href="#" className={ stylesHeader.noTextDecoration }>
                    <Logo />
                </a>
                <div className={ styles.closeIcon }>
                    <h2 className={ styles.icon } onClick={ handleClose }>X</h2>
                </div>
            </div>
            <div className={ stylesHeader.container }>
                <div className={ styles.movieImageContainer }>
                    <img src={ movie.image } alt={ `${ movie.title }.png` } className={ styles.movieImageAlternative }  />
                </div>
                <div className={ styles.movieInfoContainer }>
                    <div className={ styles.alternativeTitleContainer }>
                        <h4 className={ styles.alternativeTitle }>{ movie.title }</h4>
                        <p className={ styles.genres }>
                            { movie.genres.join(' & ') }
                        </p>
                    </div>
                    <div className={ styles.rating }>
                        <p className={ styles.ratingCircle }>{ movie.rating }</p>
                    </div>
                    <p className={ styles.releaseDate }>{ movie.releaseDate.split('-')[0] }</p>
                    <p className={ styles.runtime }>{ timeConverter(movie.runtime) }</p>
                    <p className={ styles.overview }>{ movie.overview }</p>
                </div>
            </div>
        </div>
    )
}

export default MoreInfoMovie