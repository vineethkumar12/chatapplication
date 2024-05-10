import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const Register = ({ change }) => {
  const [error, seterror] = useState(false);
  const [open, setopen] = useState(false);
  const form = async (e) => {
    setopen(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          seterror(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,

              photoURL: downloadURL,
            });

            change("home");

            await setDoc(doc(db, "userschat", res.user.uid), {});
          });
        }
      );

      // Add a new document in collection "cities"
    } catch (err) {
      console.log(err);
      seterror(true);
      setopen(false);
    }
  };

  return (
    <div className="formcont sign bg-white -mt-20  ">
      <form
        className=" space-y-2 bg-cyan-500  rounded-md  gap-5 -mt-24 md:mt-0 h-96  w-96"
        onSubmit={form}
      >
        <div>
          <tile className=" rounded-md mt-3 text-2xl ">
            {" "}
            <strong>Register</strong>{" "}
          </tile>
        </div>
        <div className=" mt-16 text-xl">
          <label>Name: </label>
          <input
            type="text"
            className="p-1 ml-2 mt-4  rounded-md"
            placeholder="text"
          />
        </div>
        <div className=" text-xl">
          <label>email: </label>
          <input
            id="vi"
            className="p-1   rounded-md"
            type="email"
            placeholder="email"
          />
        </div>
        <div className="-ml-6 text-xl">
          <label>password:</label>
          <input
            type="password"
            className="p-1   rounded-md"
            placeholder="pass"
          />
        </div>
        <div className="text-2xl">
          <input type="file" id="vhi" style={{ display: "none" }} />
          <label htmlFor="vhi">
            <span className="-ml-36 ">choose image :</span>{" "}
            <i className="fa-solid fa-image cursor-pointer ml-3 text-lg"></i>
          </label>
        </div>
        <div>
          <button className="bg-black text-white p-1.5 mr-6  px-1 rounded-md ">
            sign up
          </button>
          <button
            onClick={() => change("sign")}
            className="bg-black text-white p-1.5      rounded-md absolute "
          >
            Sign in
          </button>
        </div>
        {error && <h1> something went wrong</h1>}{" "}
        {open && <h1>please wait its opening</h1>}
      </form>
    </div>
  );
};
