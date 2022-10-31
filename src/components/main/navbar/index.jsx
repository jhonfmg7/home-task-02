import React from 'react';
import styles from '../../../css-modules/main.module.css';

// Prop Types
import PropTypes from 'prop-types';
import camelCase from '../../../utils/camelCase';

const CATEGORIES = [ 'all', 'action', 'documentary', 'comedy', 'horror', 'crime' ];

const NavBar = ({ typeSelected, setTypeSelected, sortBySelected, setSortBySelected }) => {

    const changeItemSelected = (type) => {
        setTypeSelected(type)
    }

    return (
        <nav className={ styles.navbar }>
            <ul className={ styles.navbarItems }>
                { CATEGORIES.map( (category, index) => (
                    <li key={ index } className={ typeSelected === category ? styles.navbarItemActive : styles.navbarItem } onClick={ () => changeItemSelected(category) }>{ camelCase(category) }</li>
                ) ) }
            </ul>
            <div className={ styles.sortBySelect }>
                <p className={ styles.secondaryText }>Sort by</p>
                <div className={ styles.selectContainer }>
                    <select className={ styles.selectInput } value={ sortBySelected } onChange={ e => setSortBySelected(e.target.value) }>
                        <option value="date">Release Date</option>
                        <option value="rating">Rating</option>
                        <option value="runtime">Runtime</option>
                    </select>
                    <div className={ styles.selectInputRow }></div>
                </div>
            </div>
            <div className={ styles.grayStrike }></div>
        </nav>
    )
}

NavBar.propTypes = {
    typeSelected: PropTypes.string.isRequired, 
    setTypeSelected: PropTypes.func.isRequired, 
    sortBySelected: PropTypes.string.isRequired, 
    setSortBySelected: PropTypes.func.isRequired, 
}

export default NavBar;