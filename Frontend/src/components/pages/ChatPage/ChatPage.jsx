import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../../molecules/Header/Header'
import { Grid, useMediaQuery } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import { ContactList } from '../../organisms/ContactList/ContactList'
import { ChatBox } from '../../organisms/ChatBox/ChatBox'
import {io} from 'socket.io-client';


export const ChatPage = () => {

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [toggleContacts, setToggleContacts] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const {logged, user} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const socket = useRef();
  socket.current = io("https://tfg-socket-server-danivl99-1c1cf059.koyeb.app/");


  useEffect(()=>{
    if(!logged){
      navigate("/")
    }

    socket.current.on('connect', () => {
      console.log('Connected to server');
    })

    if(logged) socket.current.emit("add-user", user.user_id);

    if(isSmall){
      setToggleContacts(true)
    }

    return () => {
      socket.current.off('connect');
    }

  }, [])

  useEffect(()=> {
    if(logged){
      const fetchConf = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id : user.user_id})
    }

    fetch("https://tfg-backend-seven.vercel.app/allFriends", fetchConf)
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(error => console.log(error))
    }
  }, [])

  const handleActiveContact = (contact) => {
    setActiveContact(contact);

    if(isSmall){
      setToggleContacts(false)
    }
  }

  return (
    <>
        <Header/>
        <Grid container spacing={2} sx={{marginTop: '80px', padding: '2em'}}>
            
            {
              (isSmall && toggleContacts)
              ? <ContactList contacts={contacts} handleActiveContact={handleActiveContact}/>
              : (!isSmall)
                ? <>
                    <ContactList contacts={contacts} handleActiveContact={handleActiveContact}/>
                    <ChatBox activeContact={activeContact} setActiveContact={setActiveContact} setToggleContacts={setToggleContacts} socket={socket.current}/>
                  </>
                : <ChatBox activeContact={activeContact} setActiveContact={setActiveContact} setToggleContacts={setToggleContacts} socket={socket.current}/>
            }
            
        </Grid>
    </>
  )
}
