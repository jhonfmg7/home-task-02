import * as React from "react";
import { useSelector } from "react-redux";
import styles from "../../css-modules/messages.module.css";

// Interface
import { RootState } from "../../types/redux.interface";

type State = {
    message: any
}

function Messages() {
  // Redux State Extraction
  const { message } = useSelector<RootState, State>((state) => state.movies);

  if (message) {
    return (
      <section className={styles.messageContainer}>
        <div className={styles.messageTitle}>Notification</div>
        <h1 className={styles.message}>{ message }</h1>
      </section>
    );
  }
}

export default Messages;
