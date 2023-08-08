import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../assets/send.svg";
import { useContext } from "react";
import { MessageContext } from "../components/Workingarea";
import "./workingarea.css"

const Messageinput = ({isUser}) => {
  const { messageHistory, setMessageHistory } = useContext(MessageContext);
  const [usemsg, setUsermsg] = useState("");
  const [status, setStatus] = useState("success");

  const handleMessage = async () => {
    if (usemsg.trim().length !== 0 && status === "success") {
      setMessageHistory((prevMessageHistory) => [
        ...prevMessageHistory,
        { user: "USER", content: usemsg },
        { user: "BOT", content: "LOADING" },
      ]);
      setStatus("loading");
      try {
        setUsermsg("");

        const res = await fetch(`/api/chat`, {
          method: "POST",
          body: JSON.stringify({ usemsg }),
        });

        if (res.ok) {
          const response = await res.json();
          setMessageHistory((prevMessageHistory) => [
            ...prevMessageHistory.filter((item) => item.content !== "LOADING"),
            { user: "BOT", content: response.message },
          ]);
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
      setMessageHistory((messageHistory) =>
        messageHistory.filter((item) => item.text !== "LOADING")
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMessage();
    }
  };

  return (
    <div className="messageinput-box">
      <input
        value={usemsg}
        onChange={(e) => setUsermsg(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Send a message"
        className={`${isUser ? '': 'disable'}`}
      />
      <span
        onClick={handleMessage}
         
      >
        <SendIcon  className={usemsg.trim().length > 0 ? "active" : ""}/>
      </span>
    </div>
  );
};

export default Messageinput;
