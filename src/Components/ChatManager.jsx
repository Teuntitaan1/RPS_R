import { useState, useEffect} from "react";

import { Socket } from "../Backend/Socket";
import { Generate_User } from "../Backend/ChatFunctions";
import Chatbox from "./ChatBox";
import MessageBox from "./MessageBox";

export default function ChatManager(props) {
    
    const [InputValue, SetInputValue] = useState("");
    const [Error, SetError] = useState("");

    const [Active_Chat_Name, Set_Active_Chat_Name] = useState(null);

    useEffect(() => {

        // Socket Basic Connection
        function OnChatError(Error) {
            SetError(Error);
        }
        function OnJoinSucces(ChatName) {
            if (Active_Chat_Name != null) {
                Socket.emit("Leave", Active_Chat_Name);
            }
            Set_Active_Chat_Name(ChatName);
        }

        Socket.on('ChatError', OnChatError);
        Socket.on('Join_Succes', OnJoinSucces);
    return () => {
        Socket.off('ChatError', OnChatError);
        Socket.off('Join_Succes', OnJoinSucces);
    }
    }, []);


    function Join_Chat() {
        Socket.emit("Join", InputValue);

    }

    return(
        <>
            <div>
                <div>
                    {Error != "" ? <p>{Error}</p> : null}
                    <p>Join chat</p>
                    <input value={InputValue} onChange={(event) => SetInputValue(event.target.value)}></input>
                    <button onClick={() => {Join_Chat()}}>Join</button>
                </div>

                <Chatbox></Chatbox>
                <MessageBox User={Generate_User("Teunnemans", "Teun")} Active_Chat_Name={Active_Chat_Name}></MessageBox>
            </div>
        </>);
}