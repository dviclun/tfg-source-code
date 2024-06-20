import { useTheme } from '@emotion/react'
import { Avatar, Button, Card, CardContent, Divider, FormControl, Grid, TextField, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import SearchingSvg from '../../../assets/searching.svg';
import {useDebounce} from 'use-debounce';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { SnackbarContext} from '../../../contexts/Snackbar/SnackbarContext';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const AddFriends = () => {

    const theme = useTheme();

    const [t] = useTranslation("global");

    const {user} = useContext(AuthContext);
    const {setMessage, handleOpenSnackbar} = useContext(SnackbarContext);

    const [users, setUsers] = useState([]);
    const [userToSearch, setUserToSearch] = useState("");
    const [debouncedUser] = useDebounce(userToSearch, 800);

    const textAreaStyle = {
        '& .MuiOutlinedInput-root': {
            fontFamily: 'Poppins',
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.green400,
            },
          },
          borderRadius: '8px',
          
    }

    useEffect(()=> {
        if(debouncedUser !== ""){
            const body = {
                user_id: user.user_id,
                username: debouncedUser
            }

            const fetchConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            fetch("https://tfg-backend-seven.vercel.app/getNonFriendsByUsername", fetchConfig)
                .then(res => res.json())
                .then(data => setUsers(data))
                .catch(error => console.log(error))
        } else {
            setUsers([]);
        }
    },[debouncedUser]);

    const handleInputChange = (e) => {
        setUserToSearch(e.target.value)
    }

    const handleSendFriendRequest = (requested_id) => {
        
        const body ={
            applicant_id: user.user_id,
            requested_id
        }

        const fetchConfig = {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch("https://tfg-backend-seven.vercel.app/createFriendRequest", fetchConfig)
            .then(res => res.json())
            .then(data => {
                console.log("Solicitud de amistad enviada")
                setMessage("Solicitud de amistad enviada correctamente");
                setUserToSearch("");
                handleOpenSnackbar();

            })
            .catch(error => console.log("error al enviar la solicitud de amistad"))

    }

  return (
    <Grid item xs={12}>
        <Card sx={{height: '100%'}}>
            <CardContent>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <Typography sx={{textAlign: 'center', fontFamily: 'Poppins', fontWeight: '500', fontStyle: 'italic'}}>{t("friendsPage.searchAthletes")}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{width: '100%', marginTop: '1em'}}>
                            <TextField placeholder={t("friendsPage.searchPlaceholder")} sx={textAreaStyle} value={userToSearch} onChange={handleInputChange}></TextField>
                        </FormControl>
                    </Grid>
                    {
                        (users.length === 0)
                        ? (debouncedUser === '')
                            ?<Grid item display={'flex'} justifyContent={'center'} xs={12} sx={{marginTop: '1em'}}>
                                <img className='searchingSvg' src={SearchingSvg}/>
                            </Grid>
                            : <Grid item xs={12} sx={{marginTop: '1em'}}><Typography sx={{textAlign: 'center', fontFamily: 'Poppins', fontWeight: 'light', fontStyle: 'italic'}}>{t("friendsPage.noUsersFound")}</Typography></Grid>
                        : users.map(user => (
                            <Grid container alignItems={'center'} spacing={2} item xs={12} key={user.user_id} sx={{marginTop: '1em'}}>
                                <Grid container spacing={2} alignItems={'center'} item xs={8}>
                                    <Grid item>
                                        <Avatar src={(user.profile_image !== '')? user.profile_image: ''}></Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography>{user.username}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4} display={'flex'} justifyContent={'end'}>
                                    <Tooltip title={t("friendsPage.addFriend")}><Button sx={{color: theme.palette.green500}} onClick={() => handleSendFriendRequest(user.user_id)}><PersonAddIcon/></Button></Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                        )) 
                    }
                    
                </Grid>
               
            </CardContent>
        </Card>
    </Grid>
  )
}
