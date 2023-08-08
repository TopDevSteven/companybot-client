import React from "react";
import {ReactComponent as BotIcon} from "../assets/boticon.svg";
import { SyncLoader } from "react-spinners";

const Botmsg = ({respond}) => {
    return (
        <div className="botmsg-box">
            <div className="icon">
                <span><BotIcon /></span>
            </div>
            <pre>{ respond === "LOADING" ? <p><SyncLoader color="#d2d2d2" size={12}/></p> : respond.split("\n").map((item, idx) => <p key={idx}>{item}</p>) }</pre>
        </div>
    );
};

export default Botmsg;