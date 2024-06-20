import React, { useContext } from 'react'
import { Header } from '../../molecules/Header/Header'
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material'
import { AuthContext } from '../../../contexts/Auth/AuthContext'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player';


export const HelpPage = () => {
    const { user } = useContext(AuthContext);

    const [t] = useTranslation("global");

    return (
        <>
            <Header />
            <Grid container justifyContent={'center'} spacing={3} sx={{ marginTop: '80px', padding: '2em' }}>

                {
                    (user)
                    ? <Grid container item xs={12} md={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container item xs={12} justifyContent={'center'}>
                                    <Grid item xs={12}>
                                        <Typography variant='h6' textAlign={'center'}>{t("help.generalFunc")}</Typography>
                                    </Grid>
                                    <Grid item sx={{marginTop: '1em'}} xs={12}>
                                    <ReactPlayer url={'https://www.youtube.com/watch?v=Yhynf19oSfM'} width={'100%'} controls></ReactPlayer>
                                        
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                : <Grid container item xs={12} md={6}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container item xs={12} justifyContent={'center'}>
                                <Grid item xs={12}>
                                    <Typography variant='h6' textAlign={'center'}>{t("help.generalFunc")}</Typography>
                                </Grid>
                                <Grid item sx={{marginTop: '1em'}} xs={12}>
                                    
                                        
                                        <ReactPlayer url={'https://www.youtube.com/watch?v=_HB342er2YY'} width={'100%'} controls></ReactPlayer>
                                    
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
                }
                
                {
                    (user && user.rol !== 'member')
                        ? <Grid container item xs={12} md={6}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Grid container item xs={12}>
                                            <Grid item xs={12}>
                                                <Typography variant='h6' textAlign={'center'}>{t("help.specificFunc")} {user.rol}</Typography>
                                            </Grid>
                                            {
                                                 (user.rol === 'admin')
                                                  ?   <Grid item sx={{marginTop: '1em'}} xs={12}>
                                                        <ReactPlayer url={'https://www.youtube.com/watch?v=xUfR9Oa3B-E'} width={'100%'} controls></ReactPlayer>
                                                      </Grid> 
                                                  : (user.rol === 'moderator')
                                                    ?    <Grid item sx={{marginTop: '1em'}} xs={12}>
                                                            <ReactPlayer url={'https://www.youtube.com/watch?v=GDj0dvwQZQ4'} width={'100%'} controls></ReactPlayer>
                                                         </Grid>
                                                    : (user.rol === 'trainer')
                                                      ?   <Grid item sx={{marginTop: '1em'}} xs={12}>
                                                               <ReactPlayer url={'https://www.youtube.com/watch?v=j2psA9PDUMM'} width={'100%'} controls></ReactPlayer>
                                                          </Grid>
                                                      : (user.rol === 'suscriber')
                                                        ?    <Grid item sx={{marginTop: '1em'}} xs={12}>
                                                                <ReactPlayer url={'https://www.youtube.com/watch?v=evGkVYhqgPo'} width={'100%'} controls></ReactPlayer>
                                                             </Grid>
                                                        :null  
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        : null
                }

            </Grid>
        </>
    )
}
