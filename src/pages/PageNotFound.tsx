import * as React from 'react'
import { Link } from 'react-router-dom';
import styles from '../css-modules/error.module.css';

const PageNotFound = () => {
    return (
        <h1 className={styles.pageNotFound}>
            Page Not Found <br />
            <Link to="/">
                Return to Home
            </Link>
        </h1>
    )
}

export default PageNotFound