import React, { useState, useEffect } from "react";
import "./Chat.css";

import { Avatar, IconButton } from "@material-ui/core";
import {
    SearchOutlined,
    AttachFile,
    MoreVert,
    InsertEmoticon,
    Mic,
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import firebase from 'firebase';
import db from "../firebase";
import { useStateValue } from '../StateProvider';


function Chat() {

    const [{user}, dispatch] = useStateValue();
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("time", "asc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            time: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen at {" "} {new Date(messages[messages.length - 1]?.time?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_received ${message.name === user.displayName && "chat_sent"}`}>
                        <span className="chat_messageName">{message.name}</span>
                        {message.message}
                        <span className="chat_messageTime">
                            {
                                new Date(message.time?.toDate()).toUTCString()
                            }
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button type="submit" onClick={sendMessage}>
                        Send the Message
                    </button>
                </form>
                <Mic />
            </div>
        </div>
    );
}

export default Chat;
