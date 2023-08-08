import { useState, useEffect} from "react";

import { Socket } from "../Backend/Socket";
import { Generate_Message } from "../Backend/ChatFunctions";

export default function MessageBox(props) {
    
    const [InputValue, SetInputValue] = useState("");

    // sends a message to the server which redistributes it around
    function SendMessage() {
        if (InputValue != "") {
            Socket.emit("Message", Generate_Message(InputValue, props.User, props.Active_Chat_Name));
        }
        SetInputValue("");
    }

    return(
        <>
            <div>
                <input value={InputValue} onChange={(event) => {SetInputValue(event.target.value);}}></input>
                {InputValue != "" ? 
                    <button onClick={() => {SendMessage();}}>Stuur</button> 
                    : null}
            </div>
        </>);
}