import * as React from "react";
import { useDispatch } from "react-redux";
import styles from "../../css-modules/modal.module.css";
import stylesHeader from "../../css-modules/header.module.css";

// Interface
import { AppDispatch } from "../../types/redux.interface";

// Actions
import { deleteMovieAction } from "../../redux/actions/moviesAction";

// Components
import Modal from "./Modal";

interface Props {
    title: string,
    id: number,
    setIsOpen: (newState: boolean) => void,
    setIsOpenMenu?: (newState: boolean) => void
}

const DeleteModal: React.FC<Props> = ({
  title, id, setIsOpen, setIsOpenMenu,
}) => {
  // Dispatch Instance
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteMovieAction(id));
    setIsOpen(false);
    setIsOpenMenu(false);
  };

  return (
    <Modal title={title} setIsOpen={setIsOpen} setIsOpenMenu={setIsOpenMenu}>
      <div data-testid="delete_modal">
        <p className={styles.deleteMessage} data-testid="delete_modal_title">Are you sure you want to delete this movie?</p>
        <div className={styles.textEnd}>
          <button className={stylesHeader.secondaryButton} type="button" data-testid="delete_modal_confirm_button" data-cy="delete_modal_confirm_button" onClick={handleDelete}>Confirm</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
