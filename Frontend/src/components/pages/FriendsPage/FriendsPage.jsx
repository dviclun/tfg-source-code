import React, { useContext } from 'react'
import { Header } from '../../molecules/Header/Header'
import { Grid, Typography } from '@mui/material'
import {SectionTitle} from '../../atoms/SectionTitle/SectionTitle'
import { useTranslation } from 'react-i18next'
import { FriendsList } from '../../organisms/FriendsList/FriendsList'
import { AddFriends } from '../../organisms/AddFriends/AddFriends'
import { AuthContext } from '../../../contexts/Auth/AuthContext'
import { Navigate } from 'react-router-dom'

export const FriendsPage = () => {
  const [t] = useTranslation("global")
  const {logged} = useContext(AuthContext); 
  return (logged)
    ?
    <>
        <Header/>
        <Grid container justifyContent={'center'}>
        <Grid container sx={{marginTop: '80px', padding: '2em', width: '100%',  maxWidth: '1440px'}}>
            <SectionTitle title={t("settings.friendList").toUpperCase()}/>

            <Grid container item xs={12} spacing={3} sx={{marginTop: '2em'}}>
              <Grid container item xs={12} sm={6} md={8}>
                <FriendsList/>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>
                <AddFriends/>
              </Grid>
            </Grid>
        </Grid>
        </Grid>
    </>
    : <Navigate to='/'/>
}
