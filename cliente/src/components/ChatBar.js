import React, { useState, useEffect } from 'react';

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('chatUsers')) || []);

    useEffect(() => {
        socket.on('newUserResponse', (data) => {
            setUsers(data);
            localStorage.setItem('chatUsers', JSON.stringify(data));
        });
    }, [socket, users]);

    return (
        <div className="chat__sidebar">
            <h2>Chat Público</h2>
            <div className='chat__boox'>
                <h4 className="chat__header">Usuarios Conectados</h4>
                <div className="chat__users">
                    {users.map(user => <p key={user.socketID}> {user.userName} </p>)}
                </div>
            </div>
        </div>
    );
};

export default ChatBar;