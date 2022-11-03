import * as React from 'react';
import styles from '../../css-modules/modal.module.css';
import stylesHeader from '../../css-modules/header.module.css';

// Components
import Modal from './Modal';

interface Props {
    title: String,
    setIsOpen: Function,
    setIsOpenMenu?: Function
}

const DeleteModal: React.FunctionComponent = (props: Props) => {

    // Props Extraction
    const { title, setIsOpen, setIsOpenMenu } = props; 
    
    return (
        <Modal title={ title } setIsOpen={ setIsOpen } setIsOpenMenu={ setIsOpenMenu }>
            <p className={ styles.deleteMessage }>Are you sure you want to delete this movie?</p>
            <div className={ styles.textEnd }>
                <button className={ stylesHeader.secondaryButton }>Confirm</button>
            </div>
        </Modal>
    )
}

export default DeleteModal