import { useState, useEffect } from 'react';
import './App.css';

import { Socket } from './Socket';

    export default function App() {

        const [Connected, SetConnected] = useState(false);
        const [Loading, SetLoading] = useState(true);
        const [Chat, SetChat] = useState([]);

        const [InputValue, SetInputValue] = useState("");

        useEffect(() => {

            // Socket Basic Connection
            function OnConnect() {
                console.log("Connected");
                SetConnected(true);
                SetLoading(false);
            }
            function OnDisconnect() {
                console.log("Disconnected");
                SetConnected(false);
            }
            Socket.on('connect', OnConnect);
            Socket.on('disconnect', OnDisconnect);

            function OnChatUpdate(NewChat) {
                console.log("Got ChatUpdate");
                SetChat(NewChat);
            }
            Socket.on("ChatUpdate", OnChatUpdate);

        return () => {
            Socket.off('connect', OnConnect);
            Socket.off('disconnect', OnDisconnect);
            Socket.off("ChatUpdate", OnChatUpdate);
        }
        }, []);

        // sends a message to the server which redistributes it around
        function SendMessage() {
            Socket.emit("Message", InputValue);
            console.log("Send Message");
        }

        return (
            <>
                { !Loading ? 
                    Connected ? <p>Verbonden met de server</p> : <p>Niet verbonden met de server</p>
                    : <p>Aan het laden</p>}

                <ul>
                {Chat.map((Element, Index) => <li key={Index}>{Element}</li>)}
                </ul>

                {
                    Connected ? 
                        <div>
                            <input value={InputValue} onChange={(event) => {SetInputValue(event.target.value);}}></input>
                            <button onClick={() => {SendMessage()}}>Stuur</button>
                        </div> 
                    : null
                }

            </>);
    };