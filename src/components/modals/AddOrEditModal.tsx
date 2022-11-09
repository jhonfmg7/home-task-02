import * as React from 'react';

// Components
import Modal from './Modal';
import AddOrEditForm from './AddOrEditMovieForm';

interface Movie {
    title: string,
    date: string,
    url: string,
    rating: number,
    genre: string | Array<string>,
    runtime: number,
    overview: string
}

interface Props {
    title: string,
    movieInfo?: Movie,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>
}

const AddOrEditModal = (props: Props) => {

    // Props Extraction
    const { title, movieInfo, setIsOpen, setIsOpenMenu } = props;

    return (
        <Modal title={ title } setIsOpen={ setIsOpen } setIsOpenMenu={ setIsOpenMenu }>
            <AddOrEditForm movie={ movieInfo } />
        </Modal>
    )
}

export default AddOrEditModal