import { useTheme } from '@emotion/react'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PersonalizedTrainingCard = ({cardTitle, imgClass, imgSrc, linkTo, btnText}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography sx={{fontFamily: 'Poppins', fontWeight: '600', fontStyle: 'italic', textAlign: 'center'}}>{cardTitle.toUpperCase()}</Typography>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'} sx={{marginTop: '2em'}}>
                        <img src={imgSrc} className={imgClass}></img>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'} sx={{marginTop: '2em'}}>
                        <Button variant='contained' sx={{backgroundColor: theme.palette.green500, ':hover':{backgroundColor: theme.palette.green600} }} onClick={()=>navigate(linkTo)}>{btnText}</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

PersonalizedTrainingCard.propTypes = {
    cardTitle: PropTypes.string,
    imgClass: PropTypes.string,
    imgSrc: PropTypes.string,
    linkTo: PropTypes.string,
    btnText: PropTypes.string
}