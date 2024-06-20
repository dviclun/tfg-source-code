import React, { useEffect, useState } from 'react'
import { VideoCard } from '../VideoCard/VideoCard';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from "@mui/material/styles";
import {MutatingDots} from 'react-loader-spinner';
import NoVideosFound from '../../../assets/noVideosSvg.svg';
import PropTypes from 'prop-types';

export const VideosGallery = ({filter, handleGoBack, setShowFilters}) => {

    const [videos, setVideos] = useState([]);
    const [group, setGroup] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const [t, i18n] = useTranslation("global");

    const theme = useTheme();

    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    let url = '';

    switch (filter) {
        case 3: 
            url = 'https://tfg-backend-seven.vercel.app/armsVideos';
            break;
        case 4:
            url = 'https://tfg-backend-seven.vercel.app/legsVideos';
            break;
        default:
            url = `https://tfg-backend-seven.vercel.app/videos/${filter}`;    
    }

    useEffect(()=> {

        fetch(url)
        .then(res => res.json())
        .then(data => {
            setVideos(data);
            setTimeout(()=> {
                setIsLoading(false);
            }, 1000)
        })
        .catch(error => {
            console.log(error);
        })

        fetch(`https://tfg-backend-seven.vercel.app/muscularGroup/${filter}`)
        .then(res => res.json())
        .then(data => {
            setGroup(data);
        })
        .catch(error => {
            console.log(error);
        })

    }, [])


  return (
    <Grid container item justifyContent="center" spacing={2} sx={{width: '100%', maxWidth: '1440px',paddingLeft: {xs: '2em', sm: '5em'} , paddingRight: {xs: '2em', sm: '5em'}, paddingTop: '3em'}}>  
        {
        (isLoading)
        ?<Grid item xs={12} sx={{paddingTop: '3em'}}>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4ade80"
            secondaryColor="#4ade80"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{fontFamily: 'Poppins', color: 'grey', textAlign: 'center'}}>{t("loading")}</Typography>
          </Grid>
        </Grid>

        :
        
        <Grid container item justifyContent="center" spacing={2} sx={{width: '100%', maxWidth: '1440px', paddingTop: '3em'}}>
        <Grid item xs={12}>
            <Typography variant='h6' sx={{textAlign: 'center', fontFamily: 'Poppins', textDecoration: 'underline'}}>
                {(group.length > 0) ? ((i18n.language === 'es') ? group[0].group_name_es : group[0].group_name_en) : <></>}
            </Typography>
        </Grid>
        <Grid item xs={12} display={'flex'} justifyContent={isSmall ? 'center' : 'start'} >
        <Button 
            sx={{fontSize:'12px', backgroundColor: theme.palette.green600, ':hover': {backgroundColor: theme.palette.green500}}}    
            variant="contained" 
            startIcon={<ArrowBackIcon />} 
            onClick={handleGoBack}>
            {t("videoGallery.backBtn")}
        </Button>
        </Grid>

        {
            (videos.length > 0)
            ? videos.map(video => 
                (
                    <Grid item xs={12} sm={6} md={4} key={video.video_id}>
                        <VideoCard 
                        video={video}
                        setShowFilters={setShowFilters}
                        controls
                    />
                    </Grid>
                    
                )
                )
            :   <Grid container>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'} >
                        <img className='noVideosFoundSvg' src={NoVideosFound} alt='No Videos Found Svg'/>
                    </Grid>
                    <Grid item xs={12} sx={{marginTop: '1em'}}>
                        <Typography variant='h6' sx={{textAlign: 'center', fontFamily: 'Poppins'}}>{t("videoGallery.videosEmpty")}</Typography>
                    </Grid>
                   
                </Grid>
                
        }
        </Grid>
      }
        
    </Grid>
  )
}

VideosGallery.propTypes = {
    filter: PropTypes.number,
    handleGoBack: PropTypes.func,
    setShowFilters: PropTypes.func
}