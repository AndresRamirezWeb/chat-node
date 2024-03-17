import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || []);

    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.on('messageResponse', (data) => {
            const newMessages = [...messages, data];
            setMessages(newMessages);
            localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        });
    }, [socket, messages]);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data))
    }, [socket]);

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody
                    messages={messages}
                    typingStatus={typingStatus}
                    lastMessageRef={lastMessageRef}
                />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
};

export default ChatPage;