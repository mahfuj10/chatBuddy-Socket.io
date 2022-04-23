import React, { useEffect, useState } from 'react';
import './App.css';
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, userName, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            // console.log(messageData);
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        };
    }

    useEffect(() => {
        socket.on("recive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
            setCurrentMessage("");
        })
    }, [socket])
    console.log(messageList);

    return (

        <div className='chat-window'>

            <div className="chat-header">
                <p>Live Chat</p>
            </div>

            <div className="chat-body">
                <ScrollToBottom className="message-container">

                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={userName === messageContent.author ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>

            <div className="chat-footer">
                <input
                    value={currentMessage}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value)
                    }}
                    type="text"
                    placeholder='Hey...'
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>

        </div>
    );
};

export default Chat;