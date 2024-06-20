import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/Auth/AuthContext'
import { NavLink } from 'react-router-dom';
import { SnackbarContext } from '../../../contexts/Snackbar/SnackbarContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';


export const EntryResponse = ({username, date, body, entry_response_id, responseUpdateFlag, setResponseUpdateFlag, profile_image}) => {

    const [t] = useTranslation("global");

    const {user} = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = useState(false);

    const {setMessage, handleOpenSnackbar, handleOpenErrorSnackbar} = useContext(SnackbarContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleDeleteResponse = () => {
        let reqBody = {
            entry_response_id
        }
 
         let fetchConfig = {
             method: 'DELETE',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(reqBody)
         }
 
         fetch('https://tfg-backend-seven.vercel.app//deleteResponse', fetchConfig)
                     .then(res => res.json())
                     .then(res => {
                         setMessage(t("forum.deleteResponseFeedback"));
                         handleOpenSnackbar();
                         setResponseUpdateFlag(!responseUpdateFlag);    
                     })
                     .catch(error => {
                         handleOpenErrorSnackbar();
                     })
 
         setOpenDialog(false);
    }

  return (
    <>
                        <Grid container alignItems={'center'} sx={{paddingTop: '1em'}} justifyContent={'space-between'}>
                            <Grid item display={'flex'} alignItems={'center'}>
                                <Grid item sx={{marginRight: '1em'}}>
                                    <Avatar src={(profile_image !== "") ? `${profile_image} ` : ""}/>
                                </Grid>
                                <Grid item>
                                <Tooltip title={t("viewProfile")}>
                                    <NavLink className='profileLink' to={`/profile/${username}`}>
                                        <Typography variant="h6" sx={{fontFamily: 'Poppins'}}>
                                            {username}
                                        </Typography>
                                    </NavLink>
                                </Tooltip>
                                    <Typography variant="body2" sx={{fontFamily: 'Poppins', fontStyle: 'italic', fontWeight: 'light'}}>{date}</Typography>
                                </Grid>
                            </Grid>
                            {
                                (user && user.rol === 'admin' || user && user.rol === 'moderator')
                                ? <Grid item>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon sx={{color: 'grey'}}/>
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        
                                        <MenuItem onClick={handleOpenDialog} sx={{fontFamily: 'Poppins'}}><DeleteForeverIcon sx={{marginRight: '0.3em'}}/>{t("forum.deleteResponse")}</MenuItem>
                                    </Menu>
                                </Grid>
                                : null
                            
                            }
                        </Grid>
                        
                        <Grid item xs={12}  sx={{marginTop: '1em'}}>
                            <Typography variant="body2" sx={{fontFamily: 'Poppins'}}>{body}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop: '1em'}}>
                            <Divider/>
                        </Grid>

                        <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {t("forum.deleteResponseDialogTitle")}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {t("forum.deleteResponseDialogBody")}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>{t("videoCard.confirmGoBack")}</Button>
                                <Button color='error' onClick={handleDeleteResponse} autoFocus>
                                    {t("forum.deleteResponse")}
                                </Button>
                            </DialogActions>
                        </Dialog>
    </>
  )
}

EntryResponse.propTypes = {
    username: PropTypes.string,
    date: PropTypes.string,
    body: PropTypes.string,
    entry_response_id: PropTypes.number,
    responseUpdateFlag: PropTypes.bool,
    setResponseUpdateFlag: PropTypes.func,
    profile_image: PropTypes.string
}