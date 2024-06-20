import { Avatar, Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { useContext, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTranslation } from "react-i18next";
import { SnackbarContext } from "../../../contexts/Snackbar/SnackbarContext";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import PropTypes from 'prop-types';



export const EntryCardBody = ({username, date, title, body, entry_id, profile_image}) => {

    const [t] = useTranslation("global");

    const {user} = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = useState(false);

    const {setMessage, handleOpenSnackbar, handleOpenErrorSnackbar} = useContext(SnackbarContext);

    const navigate = useNavigate();


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

    const handleDeleteEntry = () => {
        
            let reqBody = {
               entry_id
            }
    
            let fetchConfig = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            }
    
            fetch('https://tfg-backend-seven.vercel.app//deleteEntry', fetchConfig)
                        .then(res => res.json())
                        .then(res => {
                            setMessage(t("forum.deletedEntryFeedback"));
                            handleOpenSnackbar();
                            navigate("/forum");
                        })
                        .catch(error => {
                            handleOpenErrorSnackbar();
                        })
    
            setOpenDialog(false);
        }

  return (
    <CardContent sx={{padding: '0'}}>
                    <Grid container alignItems={'center'} justifyContent={'space-between'}>
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
                                    
                                    <MenuItem onClick={handleOpenDialog} sx={{fontFamily: 'Poppins'}}><DeleteForeverIcon sx={{marginRight: '0.3em'}}/>{t("forum.deleteEntry")}</MenuItem>
                                </Menu>
                            </Grid>
                            : null
                        }
                    </Grid>

                    <Grid container sx={{marginTop: '1em'}}>
                    <Grid item xs={12}>
                            <Typography variant="h6" sx={{fontFamily: 'Poppins'}}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop: '1em'}}>
                            <Typography variant="body2" sx={{fontFamily: 'Poppins'}}>
                                {body}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop: '1em'}}>
                            <Divider/>
                            
                        </Grid>
                    </Grid>

                    <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {t("forum.dialogTitle")}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t("forum.confirmBody")}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>{t("videoCard.confirmGoBack")}</Button>
                        <Button color='error' onClick={handleDeleteEntry} autoFocus>
                            {t("forum.deleteEntry")}
                        </Button>
                    </DialogActions>
                </Dialog>
    </CardContent>
  )
}

EntryCardBody.propTypes = {
    username: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    entry_id: PropTypes.number,
    profile_image: PropTypes.string
}