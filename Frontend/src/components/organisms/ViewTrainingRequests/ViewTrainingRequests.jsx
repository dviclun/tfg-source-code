import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../molecules/Header/Header'
import { Card, CardContent, Grid, Tooltip, Typography } from '@mui/material'
import { AuthContext } from '../../../contexts/Auth/AuthContext'
import { useTheme } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import { NotClickedResponse } from '../../atoms/NotClickedResponse/NotClickedResponse'

export const ViewTrainingRequests = () => {

    const {user} = useContext(AuthContext);

    const [requests, setRequests] = useState([]);

    const [selectedRequest, setSelectedRequest] = useState(null);

    const [requestResponse, setRequestResponse] = useState(null);

    const [t, i18n] = useTranslation("global");

    const theme = useTheme();

    const getSpanishStatus = (status) => {
        if(status === 'pending'){
            return 'pendiente'
        } else if(status === 'answered'){
            return 'respondida'
        }
    }

    const getSpanishDifficulty = (difficulty) => {
        if(difficulty === 'starter'){
            return 'principiante'
        } else if(difficulty === 'medium'){
            return 'intermedia'
        } else if(difficulty === 'advanced'){
            return 'avanzada'
        }
    }

    const handleSelectRequest = (request) => {
        const requestCopy = {
            ...request
        }

        if(requestCopy.request_status === 'answered' && (selectedRequest && selectedRequest.request_id !== requestCopy.request_id) || (!selectedRequest && requestCopy.request_status === 'answered' )){
            let body = {
                request_id: requestCopy.request_id
            }

            const fetchConfig = {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(body)
            }

           fetch('https://tfg-backend-seven.vercel.app/getRequestResponse', fetchConfig)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRequestResponse(data[0])
            })
            .catch(error => console.log(error))
        } else {
            setRequestResponse(null)
        }

        setSelectedRequest(requestCopy);
    }

    useEffect(()=> {
        if(requests.length === 0){
            let body = {
                user_id: user.user_id
            }

            const fetchConfig = {
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(body)
            }

            fetch('https://tfg-backend-seven.vercel.app/getRequestsByUserId', fetchConfig)
                .then(res => res.json())
                .then(data => setRequests(data))
                .catch(error => console.log(error))
        }
    },[])

  return (
    <>
        <Header/>
        <Grid container spacing={2} sx={{ marginTop: '80px', padding: '2em' }}>
            <Grid item xs={12} md={6}>
                <Card sx={{height: '100%'}}>
                    <CardContent className='customScrollBar' sx={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h5' sx={{textAlign: 'center', fontFamily: 'Poppins'}}>{t("viewRequests.requestsList")}</Typography>
                            </Grid>
                            {
                                requests.map((request)=> (
                                    <Tooltip title={t("viewRequests.viewDetails")} followCursor key={request.request_id}>
                                        <Card 
                                            sx={{width: '100%', marginTop: '1em', backgroundColor:(selectedRequest && selectedRequest.request_id === request.request_id)? theme.palette.emerald100 : theme.palette.slate100, cursor: 'pointer'}} 
                                            
                                            onClick={()=>handleSelectRequest(request)}
                                        >
                                        <CardContent>
                                        <Grid container alignItems={'center'} item xs={12}>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant='h6' sx={{fontFamily: 'Poppins', textAlign: 'center'}}>{request.request_title}</Typography>
                                        </Grid>
                                        <Grid item xs={12}  md={4}>
                                            <Typography sx={{fontFamily: 'Poppins', textAlign: 'center', fontStyle: 'italic'}}>{(i18n.language === 'es')? request.group_name_es : request.group_name_en}</Typography>
                                        </Grid>
                                        <Grid item xs={12}  md={4}>
                                            <Typography sx={{fontFamily: 'Poppins', textAlign: 'center', color: (request.request_status === 'pending') ? theme.palette.rose400: theme.palette.green400}}>{(i18n.language === 'es') ? getSpanishStatus(request.request_status) : request.request_status}</Typography>
                                        </Grid>
                                    </Grid>
                                        </CardContent>
                                    </Card>
                                    </Tooltip>
                                ))
                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card sx={{height: '100%'}}>
                    <CardContent>
                       {
                        (selectedRequest)
                        ?<Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography variant='h4' sx={{fontFamily: 'Poppins', fontWeight: '600'}}>{selectedRequest.request_title}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{fontFamily: 'Poppins', fontWeight: 'light', marginTop: '1em'}}>{selectedRequest.request_body}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{fontFamily: 'Poppins', marginTop: '.5em', fontWeight: 'light'}}><span className='boldText'>{t("viewRequests.muscularGroup")} </span>{(i18n.language === 'es')? selectedRequest.group_name_es : selectedRequest.group_name_en}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{fontFamily: 'Poppins', marginTop: '.5em', fontWeight: 'light'}}><span className='boldText'>{t("viewRequests.difficulty")} </span> {(i18n.language === 'es')? getSpanishDifficulty(selectedRequest.routine_difficulty) : selectedRequest.routine_difficulty}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{fontFamily: 'Poppins', marginTop: '.5em', fontWeight: 'light'}}><span className='boldText'>{t("viewRequests.status")} </span> {(i18n.language === 'es') ? getSpanishStatus(selectedRequest.request_status) : selectedRequest.request_status}</Typography>
                            </Grid>
                            {
                            (requestResponse)
                            ? <Grid container sx={{marginTop: '1em'}}>
                                <Grid item xs={12}>
                                    <Typography variant='h6'>{t("viewRequests.answer")}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>{requestResponse.training_response_body}</Typography>
                                </Grid>
                              </Grid>
                              
                            :<></>
                            }
                         </Grid>
                         
                        :<NotClickedResponse></NotClickedResponse>
                       }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        
    </>
  )
}
