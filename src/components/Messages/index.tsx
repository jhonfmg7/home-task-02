import * as React from "react";
import { useSelector } from "react-redux";
import styles from "../../css-modules/messages.module.css";

// Interface
import { RootState } from "../../types/redux.interface";

type State = {
    messageDelete: any
}

function Messages() {
  // Redux State Extraction
  const { messageDelete } = useSelector<RootState, State>((state) => state.movies);

  if (messageDelete) {
    return (
      <section className={styles.messageContainer}>
        <div className={styles.messageTitle}>Notification</div>
        <h1 className={styles.message}>{ messageDelete }</h1>
      </section>
    );
  }
}

export default Messages;
