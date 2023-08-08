import { useState, useEffect } from 'react';
import './App.css';

// global socket object
import { Socket } from './Backend/Socket';

import ChatManager from './Components/ChatManager';


export default function App() {

    const [Connected, SetConnected] = useState(false);
    const [Loading, SetLoading] = useState(true);


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

    return () => {
        Socket.off('connect', OnConnect);
        Socket.off('disconnect', OnDisconnect);
    }
    }, []);

    return (
        <>
            { !Loading ? 
                Connected ? <p>Verbonden met de server</p> : <p>Niet verbonden met de server</p>
                : <p>Aan het laden</p>}

            {
                Connected ? 
                    <>
                        <ChatManager></ChatManager>
                    </> 
                : null
            }

        </>);
};
