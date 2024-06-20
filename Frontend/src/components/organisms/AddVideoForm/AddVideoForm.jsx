import { Alert, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Snackbar, Typography } from "@mui/material"

import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SnackbarContext } from "../../../contexts/Snackbar/SnackbarContext";
import { Header } from "../../molecules/Header/Header";



export const AddVideoForm = () => {

    const theme = useTheme();  
    
    //Estados por defecto
    const [videoNameEs, setVideoNameEs] = useState('');
    const [videoNameEn, setVideoNameEn] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [muscularGroup, setMuscularGroup] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [mcGroups, setMcGroups] = useState([]);

    const {handleOpenErrorSnackbar} = useContext(SnackbarContext);

    const [openSnackBar, setOpenSnackbar] = useState(false);

    const [t, i18n] = useTranslation("global");

    const [formErrors, setFormErrors] = useState(false);
    const [urlError, setUrlError] = useState(false);

    const FETCH_URL = 'https://tfg-backend-seven.vercel.app/muscularGroups';

    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

    useEffect(()=> {
        if(mcGroups.length === 0){
            fetch(FETCH_URL)
              .then(res => res.json())
              .then(data => {
                setMcGroups(data);
              })
              .catch(error => {
            console.log(error);
          })
          }
    }, [])

    const handleVideoNameEs = (e) => {
        setVideoNameEs(e.target.value);
    }

    const handleVideoNameEn = (e) => {
        setVideoNameEn(e.target.value);
    }

    const handleVideoUrl = (e) => {
        setVideoUrl(e.target.value);
    }

    const handleMuscularGroup = (e) => {
        setMuscularGroup(parseInt(e.target.value));
    }

    const handleDifficulty = (e) => {
        setDifficulty(e.target.value);
    }

    const handleFormSubmit = () => {
        if(videoNameEs.trim() !== '' && videoNameEn.trim() !== '' && videoUrl.trim() !== '' && muscularGroup !== '' && difficulty !== ''){
            setFormErrors(false);

            if(videoUrl.match(urlRegex)){
                setUrlError(false);
                addVideo();
            } else {
                setUrlError(true);
                return;
            }  
        } else {
            setFormErrors(true);
        }
    }

    const addVideo = () => {
        //Comprobacion de que los datos enviados al back son del tipo que queremos
        if(typeof videoNameEs === 'string' &&  typeof videoNameEn === 'string' && typeof videoUrl === 'string' && typeof muscularGroup === 'number' && typeof difficulty === 'string' ){
            
            let reqBody = {
                video_title_es: videoNameEs,
                video_title_en: videoNameEn,
                video_url: videoUrl,
                muscular_group: muscularGroup,
                difficulty: difficulty
            }
    
            let fetchConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            }
    
            fetch('https://tfg-backend-seven.vercel.app/videos', fetchConfig)
                        .then(res => res.json())
                        .then(res => {
                            console.log('Video insertado');
                            clearForm();
                            handleOpenSnackbar();
                        })
                        .catch(error => {
                            handleOpenErrorSnackbar();
                        })
        } else {
            handleOpenErrorSnackbar();
        }
        
    }

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const clearForm = () => {
        setVideoNameEs('');
        setVideoNameEn('');
        setVideoUrl('');
        setMuscularGroup('');
        setDifficulty('');
    }

    const labelStyle = {
        fontFamily: 'Poppins',
        fontSize: '14px',
        "&.Mui-focused": {
            color: theme.palette.green400
        },        
    }

    const inputStyle = {
        marginTop: '30px',
        ':after': {
            borderBottomColor: theme.palette.green400
        }
    }

    const spanishSorted = [...mcGroups].sort((a,b) => a.group_name_es.localeCompare(b.group_name_es));
    const englishSorted = [...mcGroups].sort((a,b) => a.group_name_en.localeCompare(b.group_name_en));

  return (
    <>
        <Header />
        <Grid sx={{marginTop: '80px', padding: '2em'}}>
            <Grid item xs={12}>
                <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', fontFamily:'Poppins'}}><AddToQueueIcon sx={{marginRight: '5px'}} />{t("videoGallery.addNewVideo")}</Typography>
                <hr/>
            </Grid>

            <Grid justifyContent={'center'} container item xs={12} sx={{marginTop: '1em'}} spacing={5}>
                <Grid item xs={12} md={4}>
                    <FormControl sx={{paddingBottom: '5%', width: '100%'}}>
                        <InputLabel sx={labelStyle}  htmlFor='videoNameEs'>{t("videoGallery.spanishVideoName")}</InputLabel>
                        <Input sx={inputStyle}  id="videoNameEs" autoComplete="off" name="videoNameEs" onChange={handleVideoNameEs} value={videoNameEs} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl sx={{paddingBottom: '5%', width: '100%'}}>
                        <InputLabel sx={labelStyle}  htmlFor='videoNameEn'>{t("videoGallery.englishVideoName")}</InputLabel>
                        <Input sx={inputStyle}  id="videoNameEn" autoComplete="off" name="videoNameEn" onChange={handleVideoNameEn} value={videoNameEn}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl sx={{paddingBottom: '5%', width: '100%'}}>
                        <InputLabel sx={labelStyle} htmlFor='videoUrl'>{t("videoGallery.videoUrl")}</InputLabel>
                        <Input sx={inputStyle}  id="videoUrl" autoComplete="off" name="videoUrl" onChange={handleVideoUrl} value={videoUrl}/>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} md={4}>

                    <FormControl variant="standard" sx={{width: '100%'}}>
                        <InputLabel sx={labelStyle} id="muscularGroupLabel">{t("videoGallery.muscularGroup")}</InputLabel>
                        <Select
                            sx={inputStyle}
                            labelId="muscularGroupLabel"
                            id="muscularGroup"
                            label="Muscular Group"
                            onChange={handleMuscularGroup}
                            value={muscularGroup}
                     
                        >
                            {
                                (i18n.language === 'es')
                                ? spanishSorted.map(group =>(
                                    <MenuItem key={group.group_id} value={group.group_id}>{group.group_name_es}</MenuItem>
                                  ))
                                : englishSorted.map(group =>(
                                    <MenuItem key={group.group_id} value={group.group_id}>{group.group_name_en}</MenuItem>
                                  )) 
                            }

                        </Select>
                    </FormControl>
                
                </Grid>

                <Grid item xs={12} md={4}>

                    <FormControl variant="standard" sx={{width: '100%'}}>
                        <InputLabel sx={labelStyle} id="difficultyLabel">{t("videoGallery.difficulty")}</InputLabel>
                        <Select
                            sx={inputStyle}
                            labelId="difficultyLabel"
                            id="difficulty"
                            label="Difficulty"
                            onChange={handleDifficulty}
                            value={difficulty}
                       
                        >
                            <MenuItem value="starter">{t("videoGallery.starter")}</MenuItem>
                            <MenuItem value="medium">{t("videoGallery.medium")}</MenuItem>
                            <MenuItem value="advanced">{t("videoGallery.advanced")}</MenuItem>

                        </Select>
                    </FormControl>

                </Grid>
                {
                    (formErrors)
                    ? <Grid container justifyContent={'center'} item xs={12}>
                        <Typography><span className="errorSpan mt-0">{t("loginPage.allFieldsRequired")}</span></Typography>
                      </Grid>
                    : null
                }
                {
                    (urlError)
                    ? <Grid container justifyContent={'center'} item xs={12}>
                        <Typography><span className="errorSpan mt-0">{t("videoGallery.invalidUrl")}</span></Typography>
                      </Grid>
                    : null
                }

                <Grid container justifyContent={'center'} item xs={12}>
                    <Button onClick={handleFormSubmit} variant="contained" className="greenGradient text-white" sx={{fontFamily: 'Poppins', width: '25%', fontWeight: 'bold', minWidth: '150px'}}>{t("videoGallery.saveTraining")}</Button>
                </Grid>
                    
            </Grid>
        </Grid>

        <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}  
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {t("videoGallery.feedback")}
        </Alert>
      </Snackbar>
    </>
  )
}
