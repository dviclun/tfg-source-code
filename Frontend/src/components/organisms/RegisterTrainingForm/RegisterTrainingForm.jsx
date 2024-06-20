import { FormControl, Grid, InputLabel, MenuItem, Select, Typography, useMediaQuery, Stack, Chip, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { SnackbarContext } from "../../../contexts/Snackbar/SnackbarContext";
import { MutatingDots } from 'react-loader-spinner';



export const RegisterTrainingForm = () => {

    const theme = useTheme();

    const { user, login } = useContext(AuthContext);

    const { setMessage, handleOpenSnackbar, handleOpenErrorSnackbar } = useContext(SnackbarContext);

    const URL = 'https://tfg-backend-seven.vercel.app/trainings';
    const TODAY_TRAINING_URL = 'https://tfg-backend-seven.vercel.app/todaysTraining/';
    const REGISTER_URL = 'https://tfg-backend-seven.vercel.app/registerTraining';
    const UPDATE_URL = 'https://tfg-backend-seven.vercel.app/updatePoints';

    const [t, i18n] = useTranslation("global");

    const [trainingsList, setTrainingsList] = useState([]);
    const [exercise, setExercise] = useState('');
    const [selectedTrainings, setSelectedTrainings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const [registeredToday, setRegisteredToday] = useState(false);

    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (trainingsList.length === 0) {
            fetch(URL)
                .then(res => res.json())
                .then(data => {
                    setTrainingsList(data)
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        fetch(`${TODAY_TRAINING_URL}${user.user_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) setRegisteredToday(true);
            })
            .catch(error => {
                console.log(error);
            })

    }, [])

    const handleExerciseChange = (e) => {
        setExercise(e.target.value);
        if (!selectedTrainings.find(training => training.training_id === e.target.value)) {
            setSelectedTrainings(prevState => ([...prevState, trainingsList.find(training => training.training_id === e.target.value)]));
        }
    }

    const handleDeleteExercise = (id) => {

        const newSelectedTrainings = selectedTrainings.filter(training => training.training_id !== id);

        setSelectedTrainings(newSelectedTrainings);

    };

    const handleRegisterTraining = () => {
        let total_points = 0;

        selectedTrainings.forEach((training) => {
            total_points += training.training_points;
        })

        let body = {
            user_id: user.user_id,
            total_points
        }

        let fetchConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        let updateBody = {
            addPoints: total_points,
            user_id: user.user_id
        }

        let updateFetchConfig = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateBody)
        }

        let updated_user = {
            ...user,
            points: user.points + total_points
        }

        fetch(REGISTER_URL, fetchConfig)
            .then(res => res.json())
            .then(res => {

                setMessage(t("registerTraining.registeredTrainingFeedback"));
                handleOpenSnackbar();
                setRegisteredToday(true);

                fetch(UPDATE_URL, updateFetchConfig)
                    .then(res => res.json())
                    .then(res => {
                        login(updated_user);
                        console.log('Puntos actualizados');
                    })
                    .catch(error => {
                        console.log('[UpdatePoints] Hubo un error en la parte del servidor')
                    })

            })
            .catch(error => {
                handleOpenErrorSnackbar();
            })

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

    const spanishSortedList = [...trainingsList].sort((a, b) => a.training_name_es.localeCompare(b.training_name_es));

    const englishSortedList = [...trainingsList].sort((a, b) => a.training_name_en.localeCompare(b.training_name_en));



    return (
        <Grid container item xs={12} sx={{ padding: '2em' }}>
            {
                (isLoading)
                    ? <Grid item xs={12} sx={{marginBottom: '2em'}}>
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
                            <Typography variant='h6' sx={{ fontFamily: 'Poppins', color: 'grey', textAlign: 'center' }}>{t("loading")}</Typography>
                        </Grid>
                    </Grid>
                    : (!registeredToday)
                        ? <Grid container item xs={12}>
                            <Grid item xs={12} sx={{ paddingTop: '1em' }}>
                                <Typography sx={{ fontFamily: 'Poppins', textAlign: 'center' }}>{t("registerTraining.selectExercises")}</Typography>
                            </Grid>
                            <Grid container item xs={12} display={'flex'} justifyContent={'center'} sx={{ marginTop: '1em' }}>
                                <FormControl variant="standard" sx={{ width: (isSmall) ? '100%' : '50%' }}>
                                    <InputLabel sx={labelStyle} id="exercisesLabel">{t("registerTraining.selectLabel")}</InputLabel>
                                    <Select
                                        sx={inputStyle}
                                        labelId="exercisesLabel"
                                        id="exercises"
                                        label="Exercises"
                                        onChange={handleExerciseChange}
                                        value={exercise}

                                    >
                                        {
                                            (i18n.language === 'es')
                                                ? spanishSortedList.map(training => (
                                                    <MenuItem key={training.training_id} value={training.training_id}>{training.training_name_es}</MenuItem>
                                                ))
                                                : englishSortedList.map(training => (
                                                    <MenuItem key={training.training_id} value={training.training_id}>{training.training_name_en}</MenuItem>
                                                ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container item xs={12} display={'flex'} justifyContent={'center'} sx={{ marginTop: '2em' }}>
                                <Stack spacing={1} direction="row" useFlexGap flexWrap="wrap">
                                    {
                                        selectedTrainings.map((training) => (
                                            <Chip
                                                key={training.training_id}
                                                label={(i18n.language === 'es') ? training.training_name_es : training.training_name_en}
                                                variant="outlined"
                                                onDelete={() => handleDeleteExercise(training.training_id)} />
                                        ))
                                    }
                                </Stack>
                            </Grid>
                            <Grid container item xs={12} display={'flex'} justifyContent={'center'} sx={{ marginTop: '2em' }}>
                                {
                                    (selectedTrainings.length > 0)
                                        ? <Button onClick={handleRegisterTraining} variant="contained" className="greenGradient text-white" sx={{ fontFamily: 'Poppins', width: '25%', minWidth: '150px' }}>{t("registerTraining.registerTrainingBtn")}</Button>
                                        : null
                                }
                            </Grid>
                        </Grid>
                        : <Grid container display={'flex'} justifyContent={'center'} item xs={12}>
                            <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins' }}>{t("registerTraining.alreadyRegisteredToday")}</Typography>
                        </Grid>
            }
        </Grid>
    )
}
