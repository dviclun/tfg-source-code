import { Avatar, Button, Card, CardActions, CardContent, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { SnackbarContext } from '../../../contexts/Snackbar/SnackbarContext'
import PropTypes from 'prop-types';


export const EntryCard = ({entry_id, entry_date,entry_body, title, user_id}) => {

    const entryDate = new Date(entry_date);

    const theme = useTheme();

    const [t] = useTranslation("global");

    const [entryUser, setEntryUser] = useState([]);

    const {handleOpenErrorSnackbar} = useContext(SnackbarContext)

    const navigate = useNavigate();

    useEffect(()=> {

        let body = {
            user_id
        }

        let fetchConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch('https://tfg-backend-seven.vercel.app/userById', fetchConfig)
            .then(res => res.json())
            .then(res => {
                setEntryUser(res)
            })
            .catch(error => {
                console.log('[GetEntryUser] Hubo un error en la parte del servidor')
                handleOpenErrorSnackbar();
            })

    }, []);

    const handleNavigate = () => {
        const entry = {
            entry_id,
            entryDate,
            entry_body,
            title,
            entryUser
        }

        navigate('./entry', {state: entry});

    }

  return (
    <Grid item display={"flex"} justifyContent={"center"} xs={12} sx={{marginTop: '2em'}}>
        <Card component={Paper} variant="outlined" sx={{width: '100%', maxWidth: '1000px'}}>
            <CardContent>
                <Typography component={'div'} variant="body2" sx={{fontFamily: 'Poppins', fontStyle: 'italic', display: 'flex', alignItems: 'center'}}>
                    <Avatar src={(entryUser.length>0 && entryUser[0].profile_image !== "") ? `${entryUser[0].profile_image} ` : ""} sx={{ width: 24, height: 24, marginRight: '5px' }}/>
                    {
                     (entryUser.length>0) && <Tooltip title={t("viewProfile")}><NavLink className='profileLink' to={`/profile/${entryUser[0].username}`}>{entryUser[0].username}</NavLink></Tooltip>
                    }
                    </Typography>
                <Typography variant="h4" sx={{fontWeight: 'bold', fontFamily: 'Poppins', paddingTop: '0.3em', textAlign: 'center'}}>{title}</Typography>
                <Typography variant="body2" sx={{fontFamily: 'Poppins', textAlign: 'right', paddingTop: '0.3em', color: theme.palette.zinc400 }}>{entryDate.toLocaleDateString('en-GB')}</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingTop: 0}}>
                <Button onClick={handleNavigate} sx={{fontFamily: 'Poppins', color: theme.palette.green600}}>{t("forum.viewEntry")}</Button>
            </CardActions>
        </Card>
    </Grid>
  )
}

EntryCard.propTypes = {
    entry_id: PropTypes.number,
    entry_date: PropTypes.string,
    entry_body: PropTypes.string,
    title: PropTypes.string,
    user_id: PropTypes.number
}