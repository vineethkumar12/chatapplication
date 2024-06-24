import React, { useContext, useEffect, useState } from "react";
import { Message } from "./Message";
import { store } from "./Redux";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
export const Messages = ({ currentuser }) => {
  const [messages, setmessages] = useState([]);
  const { data } = useContext(store);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setmessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div
      className="messages"
      style={{ overflowY: "scroll", height: "475px", width: "1000px" }}
    >
      {messages.map((m) => {
        return <Message message={m} currentuser={currentuser} />;
      })}
    </div>
  );
};
