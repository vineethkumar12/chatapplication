import React, { useContext } from "react";
import { store } from "./Redux";

export const Chatbar = () => {
  const { data } = useContext(store);
  console.log(data.user + "vinee");
  return (
    <div className=" chatbar h-14 bg-gradient-to-r from-yellow-500 via-pink-800 to-cyan-700 ml-80 ">
      <span className="ml-2 ">{data.user?.displayName}</span>
      <div className="icons flex cursor-pointer space-x-2 mr-2">
        <i className="fa-solid fa-video "></i>
        <i className="fa-solid fa-user "></i>
        <i className="fa-solid fa-ellipsis "></i>
      </div>
    </div>
  );
};
