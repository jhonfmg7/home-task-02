import * as React from 'react';
import styles from '../../../css-modules/modal.module.css';

interface Props {
    isLarge: boolean,
    id: string,
    title: string,
    info: any,
    value: string,
    type: string,
    placeholder: string,
    handleChange: React.ChangeEventHandler
}

const Input = (props: Props) => {

    // Props Extraction
    const { isLarge, id, title, info, value, type, placeholder, handleChange } = props;

    return (
        <div className={ isLarge ? styles.inputGroupLarge : styles.inputGroupShort }>
            <label htmlFor={ id } className={ styles.label }>{ title }</label><br />
            <input id={ id } name={ value } type={ type } placeholder={ placeholder } className={ styles.input } value={ info[value] } onChange={ handleChange } />
        </div>
    )
}

export default Input