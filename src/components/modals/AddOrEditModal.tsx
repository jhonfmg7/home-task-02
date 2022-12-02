import * as React from "react";

// Components
import Modal from "./Modal";
import AddOrEditForm from "./AddOrEditMovieForm";

// Types
import Movie from "../../types/movie.interface";

interface Props {
    title: string,
    movieInfo?: Movie,
    setIsOpen: (newState: boolean) => void,
    setIsOpenMenu?: (newState: boolean) => void
}

const AddOrEditModal: React.FC<Props> = ({
  title, movieInfo, setIsOpen, setIsOpenMenu,
}) => (
  <Modal title={title} setIsOpen={setIsOpen} setIsOpenMenu={setIsOpenMenu}>
    <AddOrEditForm movie={movieInfo} setIsOpen={setIsOpen} />
  </Modal>
);

export default AddOrEditModal;
