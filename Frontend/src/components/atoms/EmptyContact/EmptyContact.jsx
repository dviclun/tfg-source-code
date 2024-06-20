import { Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import EmptyChatSvg from '../../../assets/emptyChatBg.svg';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { useTranslation } from 'react-i18next';

export const EmptyContact = () => {

    const {user, logged} = useContext(AuthContext);

    const [t] = useTranslation("global");

  return (
    <Grid container alignItems={'center'} item sx={{position: 'relative', height: '100%'}}>
        <Grid container spacing={2} item>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
            <Typography variant='h5' textAlign={'center'} sx={{fontFamily: 'Poppins', fontWeight: '600'}}>{t("chatPage.emptyChatWelcome")} <span className='emptyChatName'>{(logged) ? user.username: ''}</span>!</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
            <Typography textAlign={'center'} sx={{fontWeight: 'light', fontStyle: 'italic'}}>{t("chatPage.emptyChatSubtitle")}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
            <img src={EmptyChatSvg} className='emptyChatBg' alt="Empty chat background image" />
        </Grid>
        </Grid>
    </Grid>
  )
}
