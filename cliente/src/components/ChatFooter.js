import React, { useState } from 'react';
import checkPageStatus from '../utils/functions';

const ChatFooter = ({ socket }) => {

    const [message, setMessage] = useState('');
    const handleTyping = () =>
        socket.emit('typing', `${localStorage.getItem('userName')} is typing...`);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
        }
        setMessage('');
    };

    checkPageStatus(message, socket.id);

    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="sendBtn">ENVIAR</button>
            </form>
        </div>
    );
};

export default ChatFooter;