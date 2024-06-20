import { Button, Card, CardContent, FormControl, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useTheme } from '@emotion/react';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import {SnackbarContext} from '../../../contexts/Snackbar/SnackbarContext'
import PropTypes from 'prop-types';

export const PendingRequestDetails = ({ selectedRequest, setSelectedRequest, setReloadFlag, reloadFlag }) => {
    const [t, i18n] = useTranslation("global");

    const [showTextArea, setShowTextArea] = useState(false);

    const [responseBody, setResponseBody] = useState('');

    const {setMessage, handleOpenSnackbar, handleOpenErrorSnackbar} = useContext(SnackbarContext)

    const { user } = useContext(AuthContext);

    const theme = useTheme();

    const getSpanishDifficulty = (difficulty) => {
        if (difficulty === 'starter') {
            return 'principiante'
        } else if (difficulty === 'medium') {
            return 'intermedia'
        } else if (difficulty === 'advanced') {
            return 'avanzada'
        }
    }

    const getSpanishStatus = (status) => {
        if (status === 'pending') {
            return 'pendiente'
        } else if (status === 'answered') {
            return 'respondida'
        }
    }

    const handleGoBack = () => {
        setSelectedRequest(null);
    }

    const handleResponseBody = (e) => {
        setResponseBody(e.target.value)
    }

    const handleReplySubmit = () => {
        if (responseBody.trim() !== '' && selectedRequest) {

            const replyBody = {
                request_id: selectedRequest.request_id,
                user_id: user.user_id,
                training_response_body: responseBody
            }

            const replyFetchConf = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(replyBody)
            }

            fetch("https://tfg-backend-seven.vercel.app/createTrainingResponse", replyFetchConf)
                .then(res => res.json())
                .then(data => {
                    let updateStatusBody = {
                        request_id: selectedRequest.request_id
                    }

                    let updateFetchConfig = {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updateStatusBody)
                    }

                    fetch("https://tfg-backend-seven.vercel.app/updateRequestStatus", updateFetchConfig)
                        .then(res => res.json())
                        .then(data => {
                            setMessage(t("pendingRequests.requestReplied"))
                            handleOpenSnackbar();
                            setSelectedRequest(null);
                            setReloadFlag(!reloadFlag);
                        })
                        .catch(error => {
                            console.log(error)
                            handleOpenErrorSnackbar();
                        })
                })
                .catch(error => {
                    console.log(error)
                    handleOpenErrorSnackbar();
                })

        }
    }

    const textAreaStyle = {
        '& .MuiOutlinedInput-root': {
            fontFamily: 'Poppins',
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.green400,
            },
        },
        borderRadius: '8px',

    }

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <Button onClick={handleGoBack} sx={{ color: theme.palette.green600, borderColor: theme.palette.green600 }} variant='outlined'><KeyboardBackspaceIcon /></Button>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: '1em' }}>
                        <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>{selectedRequest.request_title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'light', marginTop: '1em' }}>{selectedRequest.request_body}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontFamily: 'Poppins', marginTop: '.5em', fontWeight: 'light' }}><span className='boldText'>{t("viewRequests.muscularGroup")} </span>{(i18n.language === 'es') ? selectedRequest.group_name_es : selectedRequest.group_name_en}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontFamily: 'Poppins', marginTop: '.5em', fontWeight: 'light' }}><span className='boldText'>{t("viewRequests.difficulty")} </span> {(i18n.language === 'es') ? getSpanishDifficulty(selectedRequest.routine_difficulty) : selectedRequest.routine_difficulty}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontFamily: 'Poppins', marginTop: '.5em', fontWeight: 'light' }}><span className='boldText'>{t("viewRequests.status")} </span> {(i18n.language === 'es') ? getSpanishStatus(selectedRequest.request_status) : selectedRequest.request_status}</Typography>
                    </Grid>
                    {
                        (showTextArea)
                            ? <Grid container item xs={12} sx={{ marginTop: '1em' }}>
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <TextField sx={textAreaStyle} multiline rows={5} placeholder={t("pendingRequests.yourReply")} onChange={handleResponseBody} value={responseBody}></TextField>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                    <Button onClick={handleReplySubmit} sx={{ color: theme.palette.green600, borderColor: theme.palette.green600 }}>{t("pendingRequests.sendReply")}</Button>
                                </Grid>
                            </Grid>
                            : <Grid item xs={12}>
                                <Button onClick={() => { setShowTextArea(true) }} sx={{ color: theme.palette.green600, borderColor: theme.palette.green600, float: 'right' }}>{t("pendingRequests.reply")}</Button>
                            </Grid>
                    }
                </Grid>
            </CardContent>
        </Card>

    )
}

PendingRequestDetails.propTypes = {
    selectedRequest: PropTypes.object,
    setSelectedRequest: PropTypes.func,
    setReloadFlag: PropTypes.func,
    reloadFlag: PropTypes.bool
}