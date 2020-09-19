import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Avatar } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import axios from './axios';
import Pusher from 'pusher-js';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState([]);
    const user = useSelector(state => state.user);
    const history = useHistory();

    const handleSearch = (e) => {
        let value = e.target.value;
        if (value.length > 0) {
            axios.get('/rooms/search', {params: {value: value}})
            .then(response => {
                if (response.data.length != 0) {
                    setSearch(response.data);
                } else {
                    setSearch([])
                    setError('There is no chat room')
                }
            })
        } 
    }
    const handleKeyUp = (e) => {
        if (e.target.value == 0) {
            setSearch([])
            setError('')
        }
    }


    useEffect(() => {
        axios.get('/rooms/sync')
        .then(response => {
          setRooms(response.data);
        })
        setSearch([])
      }, [])

    useEffect(() => {
        const pusher = new Pusher('e54facc66686c280c2c8', {
          cluster: 'eu'
        });
    
        const channel = pusher.subscribe('rooms');
        channel.bind('inserted', (data) => {
          setRooms([data, ...rooms]);
        });

        channel.bind('deleted', (data) => {
            axios.get('/rooms/sync')
            .then(response => {
            setRooms(response.data);
            history.replace('/');
          });
        })
    
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      }, [rooms])
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlined />
                    <input onKeyUp={handleKeyUp} onChange={handleSearch} placeholder='Search or start new chat' />
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat addNewChat />
                {error && ( <p className='sidebar__error'>{error}</p> )}
                { search &&
                search.map((room) => (
                    <SidebarChat room={room} key={room._id} />
                ))
                }
                <hr />
                {
                rooms.map((room) => (
                    <SidebarChat room={room} key={room._id} />
                ))
                }
                
            </div>
        </div>
    )
}

export default Sidebar
