import { Socket } from '../Backend/Socket';
import { useEffect, useState } from 'react';

export default function Chatbox(props) {
    
    const [Chat, SetChat] = useState({Messages : []});

    useEffect(() => {

        function OnChatUpdate(NewChat) {
            SetChat(NewChat);
        }
        Socket.on("ChatUpdate", OnChatUpdate);

    return () => {
        Socket.off("ChatUpdate", OnChatUpdate);
    }
    }, []);

    return (
        <>
            <div>
                {Chat.Messages.map((Message, Index) => 
                    <p key={Index}>{Message.Author.Username}: {Message.Content}</p>
                )}
            </div>
        </>);
};