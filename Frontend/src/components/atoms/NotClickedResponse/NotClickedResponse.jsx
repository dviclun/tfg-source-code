import { Grid, Typography } from '@mui/material'
import React from 'react'
import ClickSvg from '../../../assets/clickSvg.svg';
import { useTranslation } from 'react-i18next';

export const NotClickedResponse = () => {

  const [t] = useTranslation("global");

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12}>
            <Typography variant='h6' sx={{textAlign: 'center', fontStyle: 'italic', fontWeight: 'light'}}>{t("viewRequests.selectRequest")}</Typography>
        </Grid>
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <img className='notSelectedRequestImg' src={ClickSvg}/>
        </Grid>
    </Grid>
  )
}
