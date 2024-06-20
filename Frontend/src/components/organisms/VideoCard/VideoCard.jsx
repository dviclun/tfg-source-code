
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import ReactPlayer from 'react-player';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Menu, MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { SnackbarContext } from '../../../contexts/Snackbar/SnackbarContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';


export const VideoCard = ({video, setShowFilters }) => {

    const {user} = useContext(AuthContext);

    const [openDialog, setOpenDialog] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const {setMessage, handleOpenSnackbar, handleOpenErrorSnackbar} = useContext(SnackbarContext);

    const [t, i18n] = useTranslation("global")

    const navigate = useNavigate();

    const theme = useTheme();

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleEditVideo = () => {
        navigate('/editVideo', {state: video});
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteVideo = (id) => {
        
        let reqBody = {
           video_id : id
        }

        let fetchConfig = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }

        fetch('https://tfg-backend-seven.vercel.app/videos', fetchConfig)
                    .then(res => res.json())
                    .then(res => {
                        setMessage(t("videoCard.deletedFeedback"));
                        handleOpenSnackbar();
                        setShowFilters(true);
                        navigate("/trainings");
                    })
                    .catch(error => {
                        handleOpenErrorSnackbar();
                    })

        
        setOpenDialog(false);
    }

    let chipType;

    if (video.difficulty === 'starter'){
        chipType = 'success'
    } else if (video.difficulty === 'medium'){
        chipType = 'warning'
    } else {
        chipType = 'error'
    }

  return (
        <Card>
            <ReactPlayer width={'100%'} height={'100%'} url={video.video_url} controls></ReactPlayer>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height:'120px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography sx={{textAlign: 'start', fontFamily: 'Poppins'}} variant='h6'>{(i18n.language === "es")? video.video_title_es : video.video_title_en}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{marginTop: '0.5em'}}>
                        <Chip sx={{fontFamily: 'Poppins'}} color={chipType} variant='outlined' label={video.difficulty}/>
                    </Grid>
                </Grid>
                    
                    {
                        (user && user.rol === 'admin')
                        ? <Grid container sx={{width:'fit-content'}} justifyContent={'end'} alignItems={'center'}>
                            
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreVertIcon sx={{color: theme.palette.green600}}/>
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
                                <MenuItem onClick={handleEditVideo} sx={{fontFamily: 'Poppins'}}><EditIcon sx={{marginRight: '0.3em'}} />{t("videoCard.editVideo")}</MenuItem>
                                <MenuItem onClick={handleOpenDialog} sx={{fontFamily: 'Poppins'}}><DeleteForeverIcon sx={{marginRight: '0.3em'}}/>{t("videoCard.confirmDelete")}</MenuItem>
                            </Menu>
                        </Grid>
                        :null    
                    }
               
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {t("videoCard.confirmTitle")}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t("videoCard.confirmBody")}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>{t("videoCard.confirmGoBack")}</Button>
                        <Button color='error' onClick={()=>handleDeleteVideo(video.video_id)} autoFocus>
                            {t("videoCard.confirmDelete")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}

VideoCard.propTypes = {
    video: PropTypes.object,
    setShowFilters: PropTypes.func
}