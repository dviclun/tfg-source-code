import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../molecules/Header/Header'
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SnackbarContext } from '../../../contexts/Snackbar/SnackbarContext';

export const CreateTrainingRequest = () => {
    const theme = useTheme();

    const {user} = useContext(AuthContext);
    const {setMessage, handleOpenSnackbar, handleOpenErrorSnackbar} = useContext(SnackbarContext);

    const [groups, setGroups] = useState([]);
    const [requestTitle, setRequestTitle] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [requestBody, setRequestBody] = useState('');

    const [requiredError, setRequiredError] = useState(false);

    const [t, i18n] = useTranslation("global");

    const navigate = useNavigate("")

    useEffect(() => {
        if (groups.length === 0) {
            fetch('https://tfg-backend-seven.vercel.app/muscularGroups')
                .then(res => res.json())
                .then(data => setGroups(data))
        }
    }, [])

    const handleRequestTitle = (e) => {
        setRequestTitle(e.target.value)
    }

    const handleSelectGroup = (e) => {
        setSelectedGroup(e.target.value);
    }

    const handleSelectDifficulty = (e) => {
        setSelectedDifficulty(e.target.value);
    }

    const handleRequestBody = (e) => {
        setRequestBody(e.target.value)
    }

    const handleFormSubmit = () => {
        if(requestTitle.trim() === '' || requestBody.trim() === '' || selectedGroup === '' || selectedDifficulty === ''){
            setRequiredError(true);
        }else {
            setRequiredError(false);
            sendRequest();
        }
    }

    const sendRequest = () => {
        //Comprobacion de que los datos son del tipo que queremos enviar al backend
        if(typeof user.user_id === 'number' && typeof requestTitle === 'string' && typeof requestBody === 'string' && typeof selectedDifficulty === 'string' && typeof selectedGroup === 'number'){
            const body = {
                user_id : user.user_id,
                request_title: requestTitle,
                request_body: requestBody,
                routine_difficulty: selectedDifficulty,
                routine_group: selectedGroup
             }
     
             const fetchConfig = {
                 method: 'POST',
                 headers: {
                     "Content-Type": "application/json"
                 },
                 body: JSON.stringify(body)
             }
     
             fetch("https://tfg-backend-seven.vercel.app/sendRequest", fetchConfig)
                 .then(res => res.json())
                 .then(data => {
                     setMessage(t("createRequest.requestSentSuccessfully"));
                     handleOpenSnackbar();
                     navigate('/personalizedTraining')
                 })
                 .catch(error => handleOpenErrorSnackbar())
        } else {
            handleOpenErrorSnackbar()
        }
       
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

    const textAreaStyle = {
        '& .MuiOutlinedInput-root': {
            fontFamily: 'Poppins',
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.green400,
            },
          },
          borderRadius: '8px',
          
    }

    const spanishSortedGroups = [...groups].sort((a, b) => a.group_name_es.localeCompare(b.group_name_es));

    const englishSortedGroups = [...groups].sort((a, b) => a.group_name_en.localeCompare(b.group_name_en));

    return (
        <>
            <Header />
            <Grid container sx={{ marginTop: '80px', padding: '2em' }}>

                <Grid item xs={12}>
                    <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Poppins' }}><FitnessCenterIcon sx={{ marginRight: '5px', color: theme.palette.green600 }} />{t("createRequest.title")}</Typography>
                    <hr color={theme.palette.green400} />
                </Grid>

                <Grid container item xs={12} spacing={2} sx={{ marginTop: '1em' }}>

                    <Grid item xs={12} md={4}>
                        <FormControl sx={{ paddingBottom: '1em', width: '100%' }}>
                            <InputLabel sx={labelStyle} htmlFor='request_title'>{t("createRequest.titlePlaceholder")}</InputLabel>
                            <Input sx={inputStyle} id="request_title" autoComplete="off" name="request_title" onChange={handleRequestTitle} value={requestTitle} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl variant="standard" sx={{paddingBottom: '1em', width: '100%'}}>
                            <InputLabel sx={labelStyle} id="exercisesLabel">{t("createRequest.groupPlaceholder")}</InputLabel>
                            <Select
                                sx={inputStyle}
                                labelId="exercisesLabel"
                                id="exercises"
                                label="Exercises"
                                onChange={handleSelectGroup}
                                value={selectedGroup}

                            >
                                {
                                    (i18n.language === 'es')
                                        ? spanishSortedGroups.map(group => (
                                            <MenuItem key={group.group_id} value={group.group_id}>{group.group_name_es}</MenuItem>
                                        ))
                                        : englishSortedGroups.map(group => (
                                            <MenuItem key={group.group_id} value={group.group_id}>{group.group_name_en}</MenuItem>
                                        ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl variant="standard" sx={{paddingBottom: '1em', width: '100%'}}>
                            <InputLabel sx={labelStyle} id="exercisesLabel">{t("createRequest.difficultyPlaceholder")}</InputLabel>
                            <Select
                                sx={inputStyle}
                                labelId="exercisesLabel"
                                id="exercises"
                                label="Exercises"
                                onChange={handleSelectDifficulty}
                                value={selectedDifficulty}

                            >
                                <MenuItem value='starter'>
                                    {t("createRequest.starterDiff")}
                                </MenuItem>
                                <MenuItem value='medium'>
                                    {t("createRequest.mediumDiff")}
                                </MenuItem>
                                <MenuItem value='advanced'>
                                    {t("createRequest.advancedDiff")}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl sx={{width: '100%'}}>
                            <TextField sx={textAreaStyle} multiline rows={10} placeholder={t("createRequest.bodyPlaceholder")} onChange={handleRequestBody} value={requestBody}></TextField>
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
                        <Button onClick={handleFormSubmit} variant="contained" className="greenGradient text-white" sx={{fontFamily: 'Poppins', width: '25%', fontWeight: 'bold', minWidth: '150px'}}>{t("createRequest.sendRequest")}</Button>
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}
