import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import axios from './axios';
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';


function Chat() {
    const { roomId } = useParams(); 
    const [input, setInput] = useState('');

    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const user = useSelector(state => state.user);

    const deleteRoom = () => {
        if (room.userId == user.id) {
            axios.delete(`/rooms/delete/${roomId}`, {data: roomId})
            .then(response => console.log('Ok'))
            .catch(error => console.log(error))
        } else {
            alert('Error')
        }
    }

    useEffect(() => {
        if ( roomId ) {
            axios.get('/room', {params: {id: roomId}})
            .then(response => {
                setRoom(response.data);
            })
            axios.get('/messages/sync', {params: {id: roomId}})
            .then(response => {
                setMessages(response.data)
            })
            }
    }, [roomId])

    useEffect(() => {
        const pusher = new Pusher('e54facc66686c280c2c8', {
        cluster: 'eu'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (data) => {
            setMessages([...messages, data]);
        });

        return () => {
        channel.unbind_all();
        channel.unsubscribe();
        };
    }, [messages])

    const date = () => {
        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
        
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
        // current hours
        let hours = date_ob.getHours();
        
        // current minutes
        let minutes = date_ob.getMinutes();
        
        return(hours + ":" + minutes +" "+ month + "-" + date);
    }
    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post('/messages/new', {
            roomId: roomId,
            message: input,
            name:  user.displayName,
            timestamp: date(),
            received: false
        });
        setInput('');

    }
    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar></Avatar>
                <div className='chat__headerInfo'>
                    <h3>{room?.name}</h3>
                    { messages[messages.length - 1] ? 
                     <p>last seen{' '}{messages[messages.length - 1].timestamp}</p>
                     :
                     <p></p>
                    }
                   
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        {
                            room.userId == user.id ? 
                            ( <HighlightOffIcon onClick={deleteRoom} /> )
                            :
                            ( <MoreVert /> )
                        }
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {messages.map((message) => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                    <span className='chat__name'>{message.name}</span>
                    {message.message}
                    <span className='chat__timestamp'>{message?.timestamp}</span>
                </p>
                ))}
            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form >
                    <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Type a message'
                    />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
