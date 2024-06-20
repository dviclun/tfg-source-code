import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react'
import { SnackbarContext } from '../../../contexts/Snackbar/SnackbarContext';
import {ThreeDots} from 'react-loader-spinner';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';


export const PaymentModal = ({openDialog, handleCloseDialog}) => {

    const stripe = useStripe();

    const elements = useElements();

    const {setMessage, handleOpenSnackbar, setWarningMessage, handleOpenWarningSnackbar, handleOpenErrorSnackbar} = useContext(SnackbarContext);

    const [paymentLoading, setPaymentLoading] = useState(false);

    const {user, login} = useContext(AuthContext);

    const [t] = useTranslation("global")

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setPaymentLoading(true);

        const cardNumberElement = elements.getElement(CardNumberElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement
        });

        if(!error){
            const {id} = paymentMethod;

            const body = {
                id,
                amount: 399
            }

            const fetchConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            fetch('https://tfg-backend-seven.vercel.app/validatePayment', fetchConfig)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.status === 'succeeded'){
                        setMessage(t("paySuscription.paymentSuccess"))
                        handleOpenSnackbar();
                    } else if (data.status === 'canceled'){
                        setWarningMessage(t("paySuscription.paymentCanceled"))
                        handleOpenWarningSnackbar();
                    } else {
                        setWarningMessage(data)
                        handleOpenWarningSnackbar()
                    }

                    let updateBody = {
                        user_id: user.user_id
                    }

                    let fetchUpdate = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updateBody)
                    }

                    fetch('https://tfg-backend-seven.vercel.app/updateUserRole',fetchUpdate)
                        .then(res=>res.json())
                        .then(data => {
                            setPaymentLoading(false);

                            let updated_user = {
                                ...user,
                                rol: 'suscriber'
                            }

                            login(updated_user);

                            handleCloseDialog();

                            navigate('/personalizedTraining');
                        })
                        .catch(error=>console.log(error))
                    
                })
                .catch(error => handleOpenErrorSnackbar())

        } else {
            setPaymentLoading(false);
            setWarningMessage(error.message);
            handleOpenWarningSnackbar();
        }
    }

  return (
    <Dialog
                    sx={{'.MuiDialog-container':{maxWidth: '100vw'}}}
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth={'md'}
                >
                     <form onSubmit={handleFormSubmit}>
                    <DialogTitle id="alert-dialog-title" sx={{fontFamily: 'Poppins', fontWeight: 'bold'}}>
                    
                        {t("paySuscription.facturationData")}

                    </DialogTitle>
                    <DialogContent >
                            <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography sx={{fontFamily: 'Poppins', fontWeight: 'bold'}}>{t("paySuscription.cardNumber")}</Typography>
                                <Card sx={{marginTop:'.5em'}}>
                                        <CardContent>
                                            <CardNumberElement/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography sx={{fontFamily: 'Poppins', fontWeight: 'bold'}}>{t("paySuscription.expiration")}</Typography>
                                    <Card sx={{marginTop:'.5em'}}>
                                        <CardContent>
                                            <CardExpiryElement/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                <Typography sx={{fontFamily: 'Poppins', fontWeight: 'bold'}}>{t("paySuscription.verification")}</Typography>

                                    <Card sx={{marginTop:'.5em'}}>
                                        <CardContent>
                                            <CardCvcElement/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                               
                            </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' color='error' onClick={handleCloseDialog}  autoFocus>{t("paySuscription.cancel")}</Button>
                        <Button type='submit' color='success'>
                            {
                                (paymentLoading)
                                ?  <ThreeDots/>
                                : t("paySuscription.confirm")
                            }
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
  )
}

PaymentModal.propTypes = {
    openDialog: PropTypes.bool,
    handleCloseDialog: PropTypes.func
}