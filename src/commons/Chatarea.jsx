import React from "react";
import Usermsg from "./Usermsg";
import { useContext } from "react";
import { MessageContext } from "../components/Workingarea";
import Botmsg from "./Botmsg";

const Chatarea = () => {
    const {messageHistory, setMessageHistory} = useContext(MessageContext);
    

    return (
        <div className="chatarea-container">
            {
                messageHistory.map((item, idx) =>
                    item.user === 'USER'?<div className="usermsg-container"><Usermsg question={item.content}/></div> : <div className="botmsg-container"><Botmsg respond={item.content}/></div>
                )
            }
        </div>
    );
};

export default Chatarea;