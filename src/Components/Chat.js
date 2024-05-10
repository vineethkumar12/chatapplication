import React from "react";
import { Messages } from "./Messages";
import { Chatbar } from "./Chatbar";
import { Input } from "./Input";
export const Chat = ({ currentuser }) => {
  return (
    <div className=" flex  flex-col">
      <Chatbar />
      <Messages currentuser={currentuser} />
      <Input currentuser={currentuser} />
    </div>
  );
};
