import * as React from 'react';
import styles from '../../../css-modules/main.module.css';

// Utils
import camelCase from '../../../utils/camelCase';

const CATEGORIES = [ 'all', 'action', 'documentary', 'comedy', 'horror', 'crime' ];

interface Props {
    typeSelected: string, 
    sortBySelected: string,
    setTypeSelected: React.Dispatch<React.SetStateAction<string>>,
    setSortBySelected: React.Dispatch<React.SetStateAction<string>>
}

const NavBar = (props: Props) => {

    // Props Extraction
    const { typeSelected, setTypeSelected, sortBySelected, setSortBySelected } = props;

    const changeItemSelected = (type: string) => {
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
                    <select className={ styles.selectInput } value={ sortBySelected } onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setSortBySelected(e.target.value) }>
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

export default NavBar;