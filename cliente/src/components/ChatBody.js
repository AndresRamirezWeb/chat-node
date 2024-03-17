import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {

    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('chatMessages');
        localStorage.removeItem('chatUsers');
        navigate('/');
        window.location.reload();
    }

    return (
        <>
            <header className="chat__mainHeader">
                <h3>Compartir con Amigos</h3>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    SALIR
                </button>
            </header>

            <div className="message__container">
                {messages.map(message => (
                    message.name === localStorage.getItem('userName') ? (
                        <div className="message__chats" key={message.id}>
                            <p className="sender__name">Tú</p>
                            <div className="message__sender">
                                <p>{message.text}</p>
                                <p className="message__timestamp">{message.timestamp}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.name}</p>
                            <div className="message__recipient">
                                <p>{message.text}</p>
                                <p className="message__timestamp">{message.timestamp}</p>
                            </div>
                        </div>
                    )
                ))}

                <div className="message__status">
                    <p>{typingStatus}</p>
                </div>
                <div ref={lastMessageRef} />
            </div >
        </>
    );
};

export default ChatBody;