import React from 'react'
import { Header } from '../../molecules/Header/Header'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import LogoTrass from '../../../assets/trassierra.jpg';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';


export const About = () => {
    
    const theme = useTheme();

    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const [t] = useTranslation("global");

  return (
    <>
    <Header/>
    <Grid container justifyContent={'center'} sx={{ marginTop: '80px', padding: '2em' }}>
        <Grid item xs={12}>
            <Typography variant={isSmall ? 'h5': 'h3'} sx={{fontWeight:'bold', fontFamily: 'Poppins', paddingBottom: '.5em', textAlign: 'center'}} className="poppins-medium" >NEW CONCEPT <span className="text-green-600 poppins-bold-italic">GYM</span></Typography> 
        </Grid>
        <Grid item xs={12}>
            <Typography variant='h6' sx={{textAlign:'center', fontStyle: 'italic',fontFamily: 'Poppins'}}>Daniel Vicent Luna</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography sx={{textAlign: 'center', fontFamily: 'Poppins', marginTop: '3em', fontWeight: 'bold'}}>{t("about.text")}</Typography>
        </Grid>
        <Grid item xs={12} display={'flex'} justifyContent={'center'} sx={{marginTop: '3em'}}>
            <img src={LogoTrass} alt='IES Trassierra Logo'></img>
        </Grid>
    </Grid>
    </>
  )
}
