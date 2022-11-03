import * as React from 'react';

// Components
import Modal from './Modal';
import AddOrEditForm from './AddOrEditMovieForm';

interface Props {
    title: String,
    movieInfo?: Object,
    setIsOpen: Function,
    setIsOpenMenu?: Function
}

const AddOrEditModal: React.FunctionComponent = (props: Props) => {

    // Props Extraction
    const { title, movieInfo, setIsOpen, setIsOpenMenu } = props;

    return (
        <Modal title={ title } setIsOpen={ setIsOpen } setIsOpenMenu={ setIsOpenMenu }>
            <AddOrEditForm movie={ movieInfo } />
        </Modal>
    )
}

export default AddOrEditModal