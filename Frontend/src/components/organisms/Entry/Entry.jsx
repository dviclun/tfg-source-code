import { useLocation, useNavigate } from "react-router-dom"
import { Header } from "../../molecules/Header/Header";
import {  Button, Card, FormControl, Grid, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { EntryResponse } from "../../atoms/EntryResponse/EntryResponse";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { EntryCardBody } from "../../atoms/EntryCardBody/EntryCardBody";
import { SnackbarContext } from "../../../contexts/Snackbar/SnackbarContext";


export const Entry = () => {

    const location = useLocation();

    const theme = useTheme();

    const {logged, user} = useContext(AuthContext);
    const {handleOpenErrorSnackbar} = useContext(SnackbarContext);


    const [t] = useTranslation('global');

    const navigate = useNavigate();

    const [entryResponses, setEntryResponses] = useState([]);
    const [responseBody, setResponseBody] = useState('');

    const [responseFlag, setResponseFlag] = useState(false);
    const [requiredError, setRequiredError] = useState(false);

    const [responseUpdateFlag, setResponseUpdateFlag] = useState(false);

    useEffect(()=> {
        if(location.state && location.state.entry_id){
            const URL = `https://tfg-backend-seven.vercel.app/entryResponses/${location.state.entry_id}`;

            fetch(URL)
            .then(res => res.json())
            .then(data => {
                setEntryResponses(data)
            })
            .catch(error => {
                console.log(error);
                //TODO: Error feedback

            })
        
        } else {
            navigate("/")
        }
        
    }, [responseUpdateFlag])

    const textAreaStyle = {
        '& .MuiOutlinedInput-root': {
            fontFamily: 'Poppins',
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.green400,
            },
          },
          borderRadius: '8px',
          
    }

    const handleGoBack = () => {
        navigate('/forum');
    }

    const handleCreateResponse = () => {
        setResponseFlag(!responseFlag);
    }

    const handleResponseBody = (e) => {
        setResponseBody(e.target.value)
    }

    const saveResponse = () => {
        let reqBody = {
            entry_id: location.state.entry_id,
            user_id: user.user_id,
            entry_response_body: responseBody
        }

        let fetchConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }

        fetch('https://tfg-backend-seven.vercel.app/addEntryResponse', fetchConfig)
                    .then(res => res.json())
                    .then(res => {
                        setResponseBody('');
                        setResponseFlag(false);
                        setResponseUpdateFlag(!responseUpdateFlag);                        
                    })
                    .catch(error => {
                        console.log('[addEntry] Hubo un error en la parte del servidor')
                        handleOpenErrorSnackbar();
                    })
    }

    const handleResponseSubmit = () => {

        if(responseBody.trim() === ''){
            setRequiredError(true);
        } else {
            setRequiredError(false);
            saveResponse();
        }
    }

  return (
    <>
        <Header/>
       
        {(location.state)
          
          ? <Grid container sx={{marginTop: '80px', padding: '2em'}}>
          <Grid item xs={12} display={'flex'} justifyContent={'start'} >
              <Button 
                  sx={{fontSize:'12px', backgroundColor: theme.palette.green600, ':hover': {backgroundColor: theme.palette.green500}}}    
                  variant="contained" 
                  startIcon={<ArrowBackIcon />} 
                  onClick={handleGoBack}>
                  {t('videoGallery.backBtn')}
              </Button>
          </Grid>
          <Grid item xs={12} sx={{marginTop: '2em'}}>
          
              <Card sx={{padding: '1em', border: '1px solid #22c55e'}}>

                  <EntryCardBody 
                      username={location.state.entryUser[0].username} 
                      date={location.state.entryDate.toLocaleDateString('en-GB')} 
                      title={location.state.title} 
                      body={location.state.entry_body} 
                      entry_id={location.state.entry_id}
                      profile_image={location.state.entryUser[0].profile_image}
                  />

                  <Grid item>
                      <Button sx={{marginTop: '.5em', color: theme.palette.green500}} onClick={handleCreateResponse}>{t("forum.reply")}</Button>
                  </Grid>
                  {
                      (responseFlag)
                      ? 
                          (logged)
                          ? <Grid item>
                              <Grid item xs={12}>
                                  <FormControl sx={{width: '100%'}}>
                                      <TextField sx={textAreaStyle} multiline rows={5} placeholder={t("forum.responsePlaceholder")} onChange={handleResponseBody} value={responseBody}></TextField>
                                  </FormControl>
                              </Grid>
                              {
                                  (requiredError)
                                  ? <Grid container justifyContent={'center'} item xs={12}>
                                      <Typography><span className="errorSpan mt-0">{t("forum.requiredResponse")}</span></Typography>
                                    </Grid>
                                  : null  
                              }
                              <Grid item xs={12} sx={{marginTop: '1em'}} display={'flex'} justifyContent={'end'}>
                                  <Button onClick={handleResponseSubmit} variant="contained" className="greenGradient text-white" sx={{fontFamily: 'Poppins', width: '15%', fontWeight: 'bold', minWidth: '200px'}}>{t("forum.saveResponse")}</Button>
                              </Grid>
                            </Grid>
                        : <Typography sx={{fontFamily: 'Poppins', color: theme.palette.zinc400}}>{t("forum.notLoggedResponse")}</Typography>
                      : null  
                  }
              </Card>
              
          </Grid>

          {
              (entryResponses.length !== 0)
              ? <Grid container>
                  <Grid item xs={12} sx={{marginTop: '1em'}}>
                      <Typography variant="h6"  sx={{fontFamily: 'Poppins'}}>{t("forum.responses")}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sx={{marginTop: '1em'}}>
                      <Card>
                          <Grid container sx={{padding: '0 1em'}}>
                              {
                                  entryResponses.map(response => (
                                      <EntryResponse key={response.entry_response_id} responseUpdateFlag={responseUpdateFlag} setResponseUpdateFlag={setResponseUpdateFlag} entry_response_id={response.entry_response_id} username={response.username} profile_image={response.profile_image} date={new Date(response.entry_response_date).toLocaleDateString('en-GB')} body={response.entry_response_body}/>
                                  ))
                              }
                          </Grid>
                      </Card>
                  </Grid>
                </Grid>
              : <Grid item xs={12} sx={{marginTop: '1em'}}>
                  <Typography variant="body" sx={{fontFamily: 'Poppins', color: theme.palette.zinc400}}>{t("forum.noResponses")}</Typography>
                </Grid>
          }
      </Grid>
        : null
        }
    </>
  )
}
