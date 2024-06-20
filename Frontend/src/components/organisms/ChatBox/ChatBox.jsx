import { useTheme } from '@emotion/react';
import { Avatar, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { EmptyContact } from '../../atoms/EmptyContact/EmptyContact';
import PropTypes from 'prop-types';

export const ChatBox = ({ activeContact, setActiveContact, setToggleContacts, socket }) => {
  const theme = useTheme();

  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  const [messageToSend, setMessageToSend] = useState('');

  const [messages, setMessages] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleCloseChat = () => {
    setMessages([]);
    setMessageToSend('');
    setActiveContact(null);
    setToggleContacts(true);
  }

  const handleMessageChange = (e) => {
    setMessageToSend(e.target.value)
  }

  const handleSendMessage = () => {
    if (messageToSend.trim() !== '') {

      const body = {
        from: user.user_id,
        to: activeContact.user_id,
        message: messageToSend
      }

      const fetchConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }

      fetch("https://tfg-backend-seven.vercel.app/addMessage", fetchConfig)
        .then(res => res.json())
        .then(data => setMessageToSend(''))
        .catch(error => console.log(error))

      const socketBody = {
        user_from: user.user_id,
        user_to: activeContact.user_id,
        message: messageToSend
      }

      socket.emit("send-msg", socketBody);
      setMessages(prevMessages => [...prevMessages, socketBody])

    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {

    if (activeContact) {
      const body = {
        from: user.user_id,
        to: activeContact.user_id
      }

      const fetchConf = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }

      fetch("https://tfg-backend-seven.vercel.app/getMessages", fetchConf)
        .then(res => res.json())
        .then(data => {
          setMessages(data)
          scrollToBottom();
        })
        .catch(error => console.log(error))
    }

  }, [activeContact])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {


    if (socket) {
      socket.on('msg-receive', (data) => {
        setArrivalMessage(data);
      })
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage])
    }
  }, [arrivalMessage])



  const textAreaStyle = {
    '& .MuiOutlinedInput-root': {
      fontFamily: 'Poppins',
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.green400,
      },
    },
    borderRadius: '8px',
    width: '100%'
  }

  const buttonStyle = {
    color: theme.palette.green500,
    borderColor: theme.palette.green400,
    ':hover': {
      borderColor: theme.palette.green500
    },
    height: '100%'
  }

  const generalMessageStyles = {
    marginTop: '.5em',
    width: '150px',
    padding: '1em',
    color: 'white',
    borderRadius: '10px'
  }


  return (
    <Grid item xs={12} sm={6} md={8}>
      <Card sx={{ border: `1px solid ${theme.palette.green300}` }}>
        <CardContent className='chatBoxCard'>
          {
            (activeContact)
              ? <Grid container item sx={{ position: 'relative', height: '100%' }}>
                <Grid container item xs={12} sx={{ position: 'relative', height: '100%', paddingBottom: '80px', paddingTop: '70px' }}>
                  <Grid container alignItems={'center'} spacing={2} item xs={12} sx={{ height: 'fit-content', position: 'absolute', top: 0 }}>
                    <Grid item xs={3} display={'flex'} alignItems={'center'} gap={'10px'}>
                      <Avatar src={(activeContact.profile_image !== "") ? `${activeContact.profile_image}` : ""} />
                      <Typography variant='h6' sx={{ fontFamily: 'Poppins' }}>
                        {activeContact.username}
                      </Typography>
                    </Grid>

                    <Grid item xs={9} >
                      <Button sx={{ float: 'right' }} onClick={handleCloseChat}><PowerSettingsNewIcon sx={{ color: theme.palette.green500 }} /></Button>
                    </Grid>
                  </Grid>
                  <Grid container className='customScrollBar' item xs={12} sx={{ overflowY: 'scroll', height: '100%' }}>
                    {
                      messages.map((message, index) => (
                        (message.user_from === activeContact.user_id || message.user_from === user.user_id)
                          ? <Grid item xs={12} sx={{ paddingLeft: '1em', paddingRight: '1em' }} key={`${message.user_from}${index}`}>
                            <Typography variant='body2' className={(user.user_id === message.user_from) ? 'rightChatMessage' : 'leftChatMessage'} sx={generalMessageStyles}>{message.message}</Typography>
                          </Grid>
                          : null
                      ))
                    }
                    <div ref={messagesEndRef}></div>
                  </Grid>

                </Grid>
                <Grid container item xs={12} spacing={2} justifyContent={'center'} sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                  <Grid item xs={9} md={10}>
                    <TextField autoComplete='off' sx={textAreaStyle} value={messageToSend} onChange={handleMessageChange}></TextField>
                  </Grid>
                  <Grid item xs={3} md={1}>
                    <Button variant='outlined' sx={buttonStyle} onClick={handleSendMessage}><SendIcon /></Button>
                  </Grid>
                </Grid>
              </Grid>
              : <EmptyContact />
          }
        </CardContent>
      </Card>
    </Grid>
  )
}

ChatBox.propTypes = {
  activeContact: PropTypes.object,
  setActiveContact: PropTypes.func,
  setToggleContacts: PropTypes.func,
  socket: PropTypes.object
}