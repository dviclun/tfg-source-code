import { useTheme } from '@emotion/react';
import { Card, CardContent, Grid, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types';

export const PendingRequestsList = ({ requests, setSelectedRequest }) => {

    const [t, i18n] = useTranslation("global");

    const theme = useTheme();

    const getSpanishStatus = (status) => {
        if (status === 'pending') {
            return 'pendiente'
        } else if (status === 'answered') {
            return 'respondida'
        }
    }

    const handleSelectRequest = (request) => {
        const requestCopy = {
            ...request
        }

        setSelectedRequest(requestCopy)
    }

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent className='customScrollBar' sx={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h5' sx={{ textAlign: 'center', fontFamily: 'Poppins' }}>{t("viewRequests.requestsList")}</Typography>
                    </Grid>
                    {
                        (requests.length > 0)
                        ? requests.map((request) => (
                            <Tooltip title={t("viewRequests.viewDetails")} followCursor key={request.request_id}>
                                <Card
                                    sx={{ width: '100%', marginTop: '1em', backgroundColor: theme.palette.slate100, cursor: 'pointer' }}

                                    onClick={() => handleSelectRequest(request)}
                                >
                                    <CardContent>
                                        <Grid container alignItems={'center'} item xs={12}>
                                            <Grid item xs={12} md={3}>
                                                <Typography sx={{ fontFamily: 'Poppins', textAlign: 'center', fontStyle: 'italic' }}>{request.username}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Typography variant='h6' sx={{ fontFamily: 'Poppins', textAlign: 'center' }}>{request.request_title}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Typography sx={{ fontFamily: 'Poppins', textAlign: 'center', fontStyle: 'italic' }}>{(i18n.language === 'es') ? request.group_name_es : request.group_name_en}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Typography sx={{ fontFamily: 'Poppins', textAlign: 'center', color: (request.request_status === 'pending') ? theme.palette.rose400 : theme.palette.green400 }}>{(i18n.language === 'es') ? getSpanishStatus(request.request_status) : request.request_status}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Tooltip>
                        ))
                        : <Grid item xs={12} sx={{marginTop: '1em'}}>
                            <Typography  sx={{ textAlign: 'center', fontFamily: 'Poppins', fontStyle: 'italic', fontWeight: 'light' }}>No hay solicitudes que mostrar</Typography>
                          </Grid>
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}

PendingRequestsList.propTypes = {
    requests: PropTypes.array,
    setSelectedRequest: PropTypes.func
}