import React, { useContext } from 'react'
import { Header } from '../../molecules/Header/Header'
import { Grid, Typography } from '@mui/material'
import { AuthContext } from '../../../contexts/Auth/AuthContext'
import PersonalizedTrainingSvg from '../../../assets/personalTrainingSvg.svg'
import { NotLoggedMessage } from '../../atoms/NotLoggedMessage/NotLoggedMessage'
import { SectionTitle } from '../../atoms/SectionTitle/SectionTitle'
import { useTranslation } from 'react-i18next'
import { NotSuscriberMessage } from '../../atoms/NotSuscriberMessage/NotSuscriberMessage'
import PremiumMemberSvg from '../../../assets/premiumMember.svg'
import CreateRequestSvg from '../../../assets/createRequest.svg'
import ViewRequestsSvg from '../../../assets/viewRequests.svg'


import { PersonalizedTrainingCard } from '../../molecules/PersonalizedTrainingCard/PersonalizedTrainingCard'


export const PersonalizedTrainingPage = () => {

  const {user, logged} = useContext(AuthContext);
  const [t] = useTranslation("global");

  return (
    <>
        <Header/>
        <Grid container spacing={2} sx={{marginTop: '80px', padding: '2em'}} justifyContent={'center'}>
            <SectionTitle title={t("personalizedTrainingPage.title")} subtitle={t("personalizedTrainingPage.subtitle")}/>
            {
              (!logged)
              ? <NotLoggedMessage className={'personalizedTrainingImage'} imgSrc={PersonalizedTrainingSvg}/>
              : (user.rol !== 'admin' && user.rol !== 'suscriber')
                ? <NotSuscriberMessage imgSrc={PremiumMemberSvg} className={'personalizedTrainingImage'}></NotSuscriberMessage>
                : <Grid container justifyContent={'center'} spacing={2} sx={{padding: '2em', width: '100%', maxWidth: '1440px'}}>
                    <Grid item xs={12} md={5}>
                      <PersonalizedTrainingCard cardTitle={t("personalizedTrainingPage.createRequestTitle")} imgClass={'personalizedCardImage'} imgSrc={CreateRequestSvg} linkTo={'/createRequest'} btnText={t("personalizedTrainingPage.createRequestBtnText")}/>
                    </Grid>
                    <Grid item  display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <Typography variant='h4' sx={{fontFamily: 'Poppins', fontStyle: 'italic'}}>{t("landingPage.separator").toUpperCase()}</Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <PersonalizedTrainingCard cardTitle={t("personalizedTrainingPage.viewRequestsTitle")} imgClass={'personalizedCardImage'} imgSrc={ViewRequestsSvg} linkTo={'/myRequests'} btnText={t("personalizedTrainingPage.viewRequestsBtnText")}/>
                    </Grid>
                  </Grid>
            }
        </Grid>
    </>
  )
}
