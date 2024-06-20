import React, { useState } from 'react'
import { Header } from '../../molecules/Header/Header'
import { SectionTitle } from '../../atoms/SectionTitle/SectionTitle'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import PremiumStar from '../../../assets/premiumStar.png';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import {loadStripe} from '@stripe/stripe-js';

import {Elements} from '@stripe/react-stripe-js';
import { PaymentModal } from '../../organisms/PaymentModal/PaymentModal';

const loadStripeFunc = async () => {
    return await loadStripe('pk_test_51PMUQaP9VbX1pPGQrcXkoGzjcTDJMPBAZMZgvI2ebKJD9ohCNfqHKqtH7hBkzuF39AbpZXJbzkwQgBK50Ul8K2aP00sZdEyCam');
}


export const PaySuscriptionPage = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const stripePromise = loadStripeFunc();

    const [t] = useTranslation('global');

    const theme = useTheme();

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    

    return (
        <>
         
            <Header />
            <Grid container justifyContent={'center'} sx={{ marginTop: '80px', padding: '2em' }}>
                <SectionTitle title={t("paySuscription.title")} />

                <Grid item xs={8} md={3} sx={{ marginTop: '2em' }}>
                    <Card elevation={4}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant='h6' sx={{ fontFamily: 'Poppins', textAlign: 'center' }}>{t("paySuscription.suscription")}</Typography>
                                </Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                    <img className='premiumStar' src={PremiumStar} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6' sx={{ fontFamily: 'Poppins', textAlign: 'center', fontWeight: 'bold' }}>3,99€</Typography>
                                </Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'} sx={{ marginTop: '1em' }}>
                                    <Button onClick={handleOpenDialog} variant='contained' sx={{ backgroundColor: theme.palette.green600, ':hover': { backgroundColor: theme.palette.green500 } }}>{t("paySuscription.payBtn")}</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

           
            <Elements stripe={stripePromise}>
                <PaymentModal handleCloseDialog={handleCloseDialog} openDialog={openDialog}/>
            </Elements>
        </>
    )
}
