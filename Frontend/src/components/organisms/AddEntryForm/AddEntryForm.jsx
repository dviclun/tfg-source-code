import { Button, FormControl, Grid, Input, InputLabel, TextField, TextareaAutosize, Typography } from "@mui/material"
import { Header } from "../../molecules/Header/Header"
import { useContext, useState } from "react"
import { AuthContext } from "../../../contexts/Auth/AuthContext"
import { useTheme } from "@emotion/react"
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import AccessDenied from '../../../assets/accessDenied.svg';
import { SnackbarContext } from "../../../contexts/Snackbar/SnackbarContext"

export const AddEntryForm = () => {

    const {logged, user} = useContext(AuthContext);
    const {setMessage, handleOpenSnackbar, handleOpenErrorSnackbar} = useContext(SnackbarContext);

    const navigate = useNavigate();

    const [t] = useTranslation("global");

    const theme = useTheme();
    const [entryTitle, setEntryTitle] = useState('');
    const [entryBody, setEntryBody] = useState('');
    const [requiredError, setRequiredError] = useState(false);



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

    const textAreaStyle = {
        '& .MuiOutlinedInput-root': {
            fontFamily: 'Poppins',
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.green400,
            },
          },
          borderRadius: '8px',
          
    }

    const handleEntryTitle = (e) => {
        setEntryTitle(e.target.value);
    }

    const handleEntryBody = (e) => {
        setEntryBody(e.target.value);
    }

    const saveEntry = () => {
        //Comprobacion para saber que los datos enviados al back son del tipo que queremos
        if(typeof user.user_id === 'number' && typeof entryTitle === 'string' && typeof entryBody === 'string'){
            let reqBody = {
                user_id: user.user_id,
                entry_title: entryTitle,
                entry_body: entryBody
            }
    
            let fetchConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            }
    
            fetch('https://tfg-backend-seven.vercel.app/addEntry', fetchConfig)
                        .then(res => res.json())
                        .then(res => {
                            setMessage(t("forum.entryCreatedFeedback"));
                            handleOpenSnackbar();
                            navigate('/forum')
                        })
                        .catch(error => {
                            handleOpenErrorSnackbar();
                        })
        } else {
            handleOpenErrorSnackbar()
        }
       
    }

    const handleFormSubmit = () => {

        if(entryTitle.trim() === '' || entryBody.trim() === ''){
            setRequiredError(true);
        }else {
            setRequiredError(false);
            saveEntry();
        }
    }

  return (
    <>
        <Header/>
        
        {
            (logged)
            ? <Grid container sx={{marginTop: '80px', padding: '2em'}}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', fontFamily:'Poppins'}}><AddIcon sx={{marginRight: '5px', color: theme.palette.green600}} />{t("forum.addEntryTitle")}</Typography>
                    <hr color={theme.palette.green400}/>
                </Grid>

                <Grid container item xs={12} sx={{marginTop: '1em'}}>

                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl sx={{paddingBottom: '5%', width: '100%'}}>
                            <InputLabel sx={labelStyle}  htmlFor='entry_title'>{t("forum.entryTitlePlaceholder")}</InputLabel>
                            <Input sx={inputStyle}  id="entry_title" autoComplete="off" name="entry_title" onChange={handleEntryTitle} value={entryTitle} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl sx={{width: '100%'}}>
                            <TextField sx={textAreaStyle} multiline rows={10} placeholder={t("forum.entryBodyPlaceholder")} onChange={handleEntryBody} value={entryBody}></TextField>
                        </FormControl>
                    </Grid>

                    {
                        (requiredError)
                        ? <Grid container justifyContent={'center'} item xs={12}>
                            <Typography><span className="errorSpan mt-0">{t("forum.entryFieldsRequired")}</span></Typography>
                        </Grid>
                        : null  
                    }

                    <Grid item xs={12} sx={{marginTop: '1em'}} display={'flex'} justifyContent={'center'}>
                        <Button onClick={handleFormSubmit} variant="contained" className="greenGradient text-white" sx={{fontFamily: 'Poppins', width: '25%', fontWeight: 'bold', minWidth: '150px'}}>{t("forum.saveEntry")}</Button>
                    </Grid>
                </Grid>
              </Grid>

            : <Grid container justifyContent={'center'} sx={{marginTop: '80px', padding: '2em'}}>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                    <Typography variant="h6" sx={{fontFamily: 'Poppins', fontStyle: 'italic', textAlign:'center'}}>{t("forum.needToLogin")}</Typography>
                </Grid>
                <Grid item xs={12} sx={{marginTop: '3em'}} display={'flex'} justifyContent={'center'}>
                    <img className="accessDeniedSvg" src={AccessDenied} alt="Access Denied SVG"/>
                </Grid>
              </Grid>
        }

    </>
  )
}
