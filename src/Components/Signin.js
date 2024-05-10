import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Signin = ({ change }) => {
  const [error, seterror] = useState(false);

  const form = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      change("home");
    } catch (err) {
      console.log(err);
      seterror(true);
    }
  };

  //
  return (
    <div className="sign bg-gray -mt-20 ">
      <form
        className=" space-y-2 bg-cyan-500    rounded-md  md:mt-0   h-96 w-96"
        onSubmit={form}
      >
        <div>
          <tile className=" rounded-md mt-3 text-2xl ">
            {" "}
            <strong>Sign in</strong>{" "}
          </tile>
        </div>
        <div className="ml-6 text-xl">
          <label className="">email: </label>
          <input
            id="vi"
            className="p-1  mt-10 mr-5  rounded-md"
            type="email"
            placeholder="email"
          />
        </div>
        <div className=" text-xl">
          <label>password:</label>
          <input
            type="password"
            className="p-1  md:mr-6 mt-3  rounded-md"
            placeholder="pass"
          />
        </div>
        <div>
          <button className="bg-black  text-white p-0.5 mt-6 mb-4  px-6 rounded-md ">
            Log in
          </button>
        </div>
        <div>
          <p
            className="bg-white rounded-md  cursor-pointer p-3"
            onClick={() => {
              change("register");
            }}
          >
            {" "}
            you don't hava an acccout?
            <span className="underline"> Register</span>{" "}
          </p>
          {error && <h1> something went wrong</h1>}
        </div>
      </form>
    </div>
  );
};
