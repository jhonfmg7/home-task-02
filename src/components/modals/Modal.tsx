import * as React from "react";
import styles from "../../css-modules/modal.module.css";

interface Props {
    children: React.ReactNode,
    title: string,
    setIsOpen: (newState: boolean) => void,
    setIsOpenMenu: (newState: boolean) => void
}

const Modal: React.FunctionComponent<React.PropsWithChildren<Props>> = (props: Props) => {
  // Props Extraction
  const {
    children, title, setIsOpen, setIsOpenMenu,
  } = props;

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenMenu(false);
  };

  return (
    <div className={styles.modalContainer} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeIcon}>
          <h2 className={styles.icon} onClick={handleClose}>X</h2>
        </div>
        <h2 className={styles.title}>
          { title }
          {" "}
          Movie
        </h2>
        { children }
      </div>
    </div>
  );
};

export default Modal;
