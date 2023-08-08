import React, { useState } from "react";
import Chatarea from "../commons/Chatarea";
import Messageinput from "../commons/Messaginput";
import { createContext } from "react";
export const MessageContext = createContext();

const Workingarea = () =>{
    const [messageHistory, setMessageHistory] = useState([]);
    const [isUser, setIsUser] = useState(false);
    const[username, setUsername] = useState("")
    const[status, setStatus] = useState(true)
    const data = {username}
    const handleName = async () => {
        if(username.trim().length !== 0){
            try {
                const res = await fetch(`/api/user`,{
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                if (res.ok){
                    console.log('name success')
                    const response = await res.json()
                    console.log(response.reply)
                    if(response.reply === "valid"){
                        setStatus(false);
                        setIsUser(true);
                        setMessageHistory(prevMessageHistory => [
                            ...prevMessageHistory,
                            {user: 'BOT', content: `Hi ${username}, how are you today?`}
                        ])
                    } else {
                        setMessageHistory(prevMessageHistory => [
                            ...prevMessageHistory,
                            {user: 'BOT', content: 'There is not that user'}
                        ]);
                    }

                }
            } catch (error) {
                
            }
        }
    }
    console.log(messageHistory)

    return (
        <div className="workingarea-container">
            {
                status === true?
                    <div className="nameinput-container">
                        <input value = {username} onChange={(e) => setUsername(e.target.value)} placeholder="Input your name"/>
                        <button onClick={handleName}>Send</button>
                    </div>:<></>
                
            }
            {console.log(status)}
            <MessageContext.Provider
                value={{messageHistory, setMessageHistory}}
            >
                <Chatarea />
                <div className="msginput-container"><Messageinput isUser={isUser}/></div>
            </MessageContext.Provider>
        </div>
    );
};

export default Workingarea;