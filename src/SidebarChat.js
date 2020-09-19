import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { IconButton, Avatar } from '@material-ui/core';
import axios from './axios';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import TextTruncate from 'react-text-truncate';


function SidebarChat({ room, addNewChat }) {
    const [messages, setMessages] = useState([]);
    const history = useHistory();
    const user = useSelector(state => state.user);

   useEffect(() => {
        axios.get('/messages/sync', {params: {id: room?._id}})
        .then(response => {
            setMessages(response.data);
        })
   }, [room?._id])

    const createChat = () => {
        const roomName = prompt('Please enter name for chat room');
        if (roomName) {
            axios.post('/rooms/new', {
                name: roomName,
                userId: user.id,
            })
            .then(response => {
                console.log(response)
                history.push(`/rooms/${response.data?._id}/`)
            })
            .catch(error => console.log(error))
        }
    }
    
    return !addNewChat ? (
        <Link to ={`/rooms/${room?._id}`}>
            <div className='sidebarChat'>
                <Avatar>{room?.name.length > 2 ? (room?.name[0].toUpperCase() + room?.name[1].toUpperCase()) : (room?.name[0].toUpperCase())}</Avatar>
                <div className='sidebarChat__info'>
                <TextTruncate
                        line={3}
                        element="h2"
                        truncateText="…"
                        text={room?.name}
                    />
                    <TextTruncate
                        line={4}
                        element="p"
                        truncateText="…"
                        text={messages[messages.length - 1]?.message}
                    />
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidebarChat sidebarChat--add'>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
