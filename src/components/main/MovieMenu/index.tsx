import * as React from "react";
import styles from "../../../css-modules/main.module.css";
import stylesModal from "../../../css-modules/modal.module.css";

interface Props {
    setIsOpen: (newState: boolean) => void,
    setIsOpenDeleteModal: (newState: boolean) => void,
    setIsOpenEditModal: (newState: boolean) => void
}

function MovieMenu(props: Props) {
  // Props Extractions
  const { setIsOpen, setIsOpenDeleteModal, setIsOpenEditModal } = props;

  return (
    <div className={styles.movieMenu} data-testid="movie_menu">
      <div className={stylesModal.closeIcon}>
        <h2 className={stylesModal.icon} onClick={() => setIsOpen(false)}>x</h2>
      </div>
      <ul className={styles.menuItems}>
        <li className={styles.menuItem} onClick={() => setIsOpenEditModal(true)} data-testid="edit_modal_button">Edit</li>
        <li className={styles.menuItem} onClick={() => setIsOpenDeleteModal(true)} data-testid="delete_modal_button">Delete</li>
      </ul>
    </div>
  );
}

export default MovieMenu;
