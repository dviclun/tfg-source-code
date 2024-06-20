import { Avatar, Badge, Button, Card, CardContent, Divider, Grid, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useTheme } from '@emotion/react';
import { SnackbarContext } from '../../../contexts/Snackbar/SnackbarContext';

export const FriendsList = () => {

    const {user} = useContext(AuthContext);

    const {setMessage, handleOpenSnackbar, handleOpenErrorSnackbar} = useContext(SnackbarContext);

    const theme = useTheme();

    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendDeleted, setFriendDeleted] = useState(false);
    const [showFriends, setShowFriends] = useState(true);    
    const [t] = useTranslation("global")


    useEffect(()=> {

        const fetchConf = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id : user.user_id})
        }

        fetch("https://tfg-backend-seven.vercel.app/allFriends", fetchConf)
            .then(res => res.json())
            .then(data => setFriends(data))
            .catch(error => console.log(error))

        const fetchRequestsConf = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({requested_id : user.user_id})
        }
        
        fetch("https://tfg-backend-seven.vercel.app/getFriendRequests", fetchRequestsConf)
            .then(res => res.json())
            .then(data => setFriendRequests(data))
            .catch(error => console.log(error))
        
    }, [friendDeleted])

    const handleShowFriends = () => {
        setShowFriends(true);
    }

    const handleShowRequests = () => {
        setShowFriends(false)
    }

    const handleDeleteFriends = (friend_id) => {
        let body = {
            user_a: user.user_id,
            user_b: friend_id
        }

        let fetchConf = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch("https://tfg-backend-seven.vercel.app/deleteFriend", fetchConf)
            .then(res=>res.json())
            .then(data => {
                setFriendDeleted(!friendDeleted);
                setMessage(t("friendsPage.friendDeleted")),
                handleOpenSnackbar();
            })
            .catch(error => {
                console.log(error)
                handleOpenErrorSnackbar();
            })
    }

    const handleAcceptFriend = (friend_id) => {
       let body = {
        applicant_id: friend_id,
        requested_id: user.user_id
       } 

       let fetchConf = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
       }

       fetch("https://tfg-backend-seven.vercel.app/acceptFriend", fetchConf)
        .then(res=>res.json())
        .then(data => {
            setFriendDeleted(!friendDeleted);
            setMessage(t("friendsPage.friendAccepted")),
            handleOpenSnackbar();
        })
        .catch(error => {
            console.log(error)
            handleOpenErrorSnackbar();
        })
    }

    const handleRejectFriend = (friend_id) => {
        let body = {
            applicant_id: friend_id,
            requested_id: user.user_id
           } 
    
           let fetchConf = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
           }
    
           fetch("https://tfg-backend-seven.vercel.app/rejectFriend", fetchConf)
            .then(res=>res.json())
            .then(data => {
                setFriendDeleted(!friendDeleted);
                setMessage(t("friendsPage.friendRejected")),
                handleOpenSnackbar();
            })
            .catch(error => {
                console.log(error)
                handleOpenErrorSnackbar();
            })
    }

    const myFriendsStyle = {
        color: (showFriends) ? "black" : "grey",
        marginBottom: '0.5em', 
        fontFamily: 'Poppins', 
        fontWeight: '500', 
        fontStyle: 'italic',
        cursor: 'pointer',
        textDecoration: (showFriends) ? "underline" : "none",
        textDecorationColor: (showFriends) ? theme.palette.green500 : "none",
        textDecorationThickness: (showFriends) ? "2px" : "none",
    }

    const friendRequestsStyle = {
        color: (!showFriends) ? "black" : "grey",
        marginBottom: '0', 
        fontFamily: 'Poppins', 
        fontWeight: '500', 
        fontStyle: 'italic',
        cursor: 'pointer',
        textDecoration: (!showFriends) ? "underline" : "none",
        textDecorationColor: (!showFriends) ? theme.palette.green500 : "none",
        textDecorationThickness: (!showFriends) ? "2px" : "none",

    }
  return (
    <Grid item xs={12}>
        <Card sx={{width:'100%', height: '100%'}}>
            <CardContent>
                <Grid item display={'flex'} sx={{gap: '10px'}} xs={12} >
                    <Button onClick={handleShowFriends}><Typography sx={myFriendsStyle}>{t("friendsPage.myFriends")}</Typography></Button>
                    {
                        (friendRequests.length > 0)
                        ? <Button sx={{display: 'flex', alignItems: 'center', marginBottom: '0.5em'}} onClick={handleShowRequests}>
                            <Typography sx={friendRequestsStyle}>{t("friendsPage.friendRequests")}</Typography>
                            <Grid sx={{backgroundColor: theme.palette.green400, padding: '1em', borderRadius: '50%', width: '10px', height: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '.5em' }}>
                                <Typography sx={{color: 'white'}}>{friendRequests.length}</Typography>
                            </Grid>

                          </Button>
                        :<Button onClick={handleShowRequests}><Typography sx={friendRequestsStyle}>{t("friendsPage.friendRequests")}</Typography></Button>
                    }
                </Grid>
                <Grid item xs={12} sx={{marginBottom: '1em'}}>
                    <Divider/>
                </Grid>
                {
                    (showFriends)
                    ? friends.map(friend => (
                        <Grid container alignItems={'center'} spacing={2} item xs={12} key={friend.user_id}>
                            <Grid container alignItems={'center'} spacing={2} item xs={8}>
                                <Grid item>
                                    <Avatar src={(friend.profile_image !== "") ? `${friend.profile_image}` : ""}/>
                                </Grid>
                                <Grid item>
                                    <Tooltip title={t("viewProfile")}><Typography sx={{fontFamily: 'Poppins'}}><NavLink className={'profileLink'} to={`/profile/${friend.username}`}>{friend.username}</NavLink></Typography></Tooltip>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} display={'flex'} justifyContent={'end'}>
                                <Tooltip title={t("friendsPage.removeFriend")}><Button sx={{color: theme.palette.red400}} onClick={()=>handleDeleteFriends(friend.user_id)} ><PersonRemoveIcon/></Button></Tooltip>
                            </Grid>
                            <Grid item xs={12} sx={{marginBottom: '1em'}}>
                                <Divider/>
                            </Grid>
                        </Grid>
                    ))

                    : <Grid container item xs={12}>
                        {
                            (friendRequests.length > 0)
                            ? friendRequests.map(request => (
                                <Grid container item xs={12} key={request.user_id}>
                                    <Grid container alignItems={'center'} spacing={2} item xs={6}>
                                        <Grid item>
                                            <Avatar src={(request.profile_image !== "") ? `https://tfg-backend-seven.vercel.app/${request.profile_image}` : ""}/>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title={t("viewProfile")}><Typography sx={{fontFamily: 'Poppins'}}><NavLink className={'profileLink'} to={`/profile/${request.username}`}>{request.username}</NavLink></Typography></Tooltip>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} justifyContent={'end'} sx={{marginBottom: '1em'}} item xs={6}>
                                        <Grid item>
                                            <Button onClick={() => handleAcceptFriend(request.user_id)} variant='outlined' color='success'>{t("friendsPage.acceptRequest")}</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={() => handleRejectFriend(request.user_id)} variant='outlined' color='error'>{t("friendsPage.rejectRequest")}</Button>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sx={{marginBottom: '1em'}}>
                                        <Divider/>
                                    </Grid>

                                </Grid>
                            ))
                            :<Grid item xs={12}>
                                <Typography sx={{textAlign: 'center', fontStyle: 'italic'}}>{t("friendsPage.noFriendRequests")}</Typography>
                            </Grid>
                        }
                      </Grid>
                }
            </CardContent>
        </Card>
    </Grid>
  )
}
