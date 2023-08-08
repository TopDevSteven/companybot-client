import React from "react";

const Usermsg = ({question}) => {
    return (
        <div className="usermsg-box">
            <div className="icon">
                <span>U</span>
            </div>
           <pre>{question}</pre>
        </div>
    );
};

export default Usermsg;