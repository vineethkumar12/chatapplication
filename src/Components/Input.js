import {
  arrayUnion,
  updateDoc,
  doc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import React, { useContext } from "react";
import { useState } from "react";
import { store } from "./Redux";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const Input = ({ currentuser }) => {
  const [text, settext] = useState("");
  const [img, setimg] = useState(null);
  const { data } = useContext(store);

  const submit = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          // seterror(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentuser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });

          // Add a new document in collection "cities"
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentuser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userschat", currentuser.uid), {
      [data.chatId + ".lastmessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userschat", data.user.uid), {
      [data.chatId + ".lastmessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    settext("");
    setimg(null);
  };
  const handle = (e) => {
    e.code === "Enter" && submit();
  };

  return (
    <div className="input rounded-md bg-gradient-to-r from-yellow-500 via-pink-800 to-cyan-700  ">
      <input
        type="text"
        className="  ml-80 mb-2 rounded-full h-11 mt-2 w-125 pl-3"
        value={text}
        onKeyDown={handle}
        onChange={(e) => {
          settext(e.target.value);
        }}
        placeholder="Type something here ..."
      />
      <div className=" space-x-2 mr-2 ">
        <i className="fa-solid fa-paperclip cursor-pointer"></i>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => {
            setimg(e.target.files[0]);
          }}
        />
        <label htmlFor="file">
          <i className="fa-solid fa-image cursor-pointer"> </i>
        </label>
        <button
          onClick={submit}
          className=" bg-black text-white p-0.5   px-1 rounded-md "
        >
          send
        </button>
      </div>
    </div>
  );
};
