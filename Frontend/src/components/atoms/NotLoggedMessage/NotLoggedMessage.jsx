import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

export const NotLoggedMessage = ({imgSrc, className}) => {

    const [t] = useTranslation("global");

  return (
    <Grid container item>
            <Grid item xs={12} sx={{paddingTop: '2em'}}>
              <Typography sx={{textAlign: 'center', fontFamily: 'Poppins'}}>
                <NavLink to='/login' className="landingLink">{t("landingPage.login")}</NavLink>
                {t("landingPage.separator")}
                <NavLink to='/register' className="landingLink">{t("landingPage.register")}</NavLink>
                {t("registerTraining.notLoggedMessage")}
              </Typography>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'} sx={{marginTop: '2em'}}>
              <img className={className} src={imgSrc} alt="Ranking Svg"></img>
            </Grid>
          </Grid>
  )
}

NotLoggedMessage.propTypes = {
  imgSrc: PropTypes.string,
  className: PropTypes.string
}