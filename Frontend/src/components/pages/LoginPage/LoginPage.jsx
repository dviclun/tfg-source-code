import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

import { Button, FormControl, Grid, Input, InputLabel, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoSvg from '../../../assets/logoWeb.svg';
import BeatLoader from 'react-spinners/BeatLoader';
import { useTranslation } from "react-i18next";
import spainFlag from '../../../assets/flags/spain.png';
import englandFlag from '../../../assets/flags/england.png';

import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { SnackbarContext } from "../../../contexts/Snackbar/SnackbarContext";

/*Componente Login Page*/
export const LoginPage = () => {

    const [t, i18n] = useTranslation("global");

    //Usamos el tema de Material UI para poder sacar algunas propiedades de el
    const theme = useTheme();
    //Comprobación de si la media query es menor de sm para no renderizar determinados componentes en ese caso
    const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
    //useStates necesarios
    const [mail, setMail] = useState('');
    const [passw, setPassw] = useState('');

    const [voidField, setVoidField] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [loading, setLoading] = useState(false);

    const {handleOpenErrorSnackbar} = useContext(SnackbarContext);

    //useNavigate para la navegacion
    const navigate = useNavigate();

    //useContext para tener acceso al contexto de autenticacion la aplicación
    const { login } = useContext(AuthContext);

    //Constantes y variables globales
    const URL = 'https://tfg-backend-seven.vercel.app/user';
    let fetchConfig, body;

    //Estilos de componentes de Material UI
    const gridAlignment = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        paddingTop: '2%'
    }


    const labelStyle = {
        fontFamily: 'Poppins',
        fontSize: '14px',
        color: theme.palette.slate300,
        "&.Mui-focused": {
            color: theme.palette.green400
        },
    }

    const inputStyle = {
        marginTop: '30px',
        color: 'white',
        ':before': {
            borderBottomColor: theme.palette.slate300
        },
        ':after': {
            borderBottomColor: theme.palette.green400
        },
        '&.MuiInput-underline:hover:before': {
            borderBottomColor: theme.palette.slate300
        }
    }
    //Funcion para controlar el email
    const handleMail = (e) => {
        setMail(e.target.value);
    }

    //Funcion para controlar la contraseña
    const handlePassword = (e) => {
        setPassw(e.target.value);
    }

    //Funcion para controlar el submit
    const handleSubmit = (e) => {
        //Comprobacion para saber si ambos inputs estan rellenos
        if (mail.trim() === '' || passw.trim() === '') {
            //Si alguno esta vacio, voidField sera true y por si estaba activo el error de credenciales incorrectas, lo seteamos a false (para que no se superpongan errores)
            setWrongCredentials(false);
            setVoidField(true);
        } else {//Si no hay errores de relleno de campos, comprobamos las credenciales
            checkUser()
        }
    }

    //Comprobacion para saber si el usuario y su respectiva contraseña existen en la base de datos
    const checkUser = async () => {
        //Al ser una peticion a una base de datos, cambiamos setLoading a true para mostrar un spinner al usuario y que no parezca que la aplicación no esta haciendo nada
        setLoading(true);
        //Body de la peticion
        body = {
            email: mail,
            passw: passw
        }
        //Configuración de la peticion
        fetchConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            cache: 'default'
        }
        //Peticion fetch al backend para comprobar que ese usuario y contraseña existen, si devuelve datos existen, si devuelve un array vacio no.
        fetch(URL, fetchConfig)
            .then(res => res.json())
            .then(data => {

                if (data.length > 0) { //Si es mayor que 0, hay usuario
                    //Llamamos a la funcion de login del AuthProvider con el usuario que nos llega en la data para mantener al usuario logueado
                    login(data[0]);

                    //Navegamos a la Landing Page (el replace es para que en el historial de navegación se reemplace la url actual en lugar de añadir una nueva entrada al historial)
                    navigate('/', {
                        replace: true
                    });
                } else {
                    //En caso de que no exista ese usuario con esa contraseña
                    //quitamos el error de input vacio en caso de que estuviera
                    setVoidField(false);
                    //Colocamos el error de credenciales incorrectos
                    setWrongCredentials(true);
                }
                //Ya ha terminado la carga, por tanto setLoading sera false
                setLoading(false);
            })
            .catch(error => {
                handleOpenErrorSnackbar();
            })
    }
    return (
        <>
            <Grid className="wrapper">
                <Grid container className="containerPattern">

                    {!isExtraSmall && (
                        <Grid item sm={6} sx={{ padding: '2%' }}>
                            <div id="loginImg"></div>
                        </Grid>
                    )}

                    <Grid container item xs={12} sm={6} md={6} sx={gridAlignment} className="greenGradient formContentLogin" justifyContent='space-between'>

                        <NavLink to='/' className='logoLink'><img className='loginSvg' src={LogoSvg}></img></NavLink>

                        <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Poppins', paddingBottom: '1em', textAlign: 'center' }} className="text-slate-100 poppins-medium" >NEW CONCEPT <span className="text-yellow-100 poppins-bold-italic">GYM</span></Typography>

                        <Typography className="text-slate-100" sx={{ fontFamily: 'Poppins', fontSize: '16px', marginBottom: '5%' }}>{t("loginPage.subtitle")}</Typography>

                        <form className="registerForm">
                            <FormControl sx={{ paddingBottom: '5%' }}>
                                <InputLabel sx={labelStyle} htmlFor='email'>{t("loginPage.email-placeholder")}</InputLabel>
                                <Input sx={inputStyle} id="email" autoComplete="off" name="email" onChange={handleMail} />
                            </FormControl>
                            <FormControl sx={{ paddingBottom: '5%' }}>
                                <InputLabel sx={labelStyle} htmlFor='password' >{t("loginPage.password-placeholder")}</InputLabel>
                                <Input sx={inputStyle} id="password" type="password" autoComplete="off" name="password" onChange={handlePassword} />
                            </FormControl>

                            {(voidField) ? <span className="errorSpan">{t("loginPage.allFieldsRequired")}</span> : <></>}
                            {(wrongCredentials) ? <span className="errorSpan">{t("loginPage.wrongCredentials")}</span> : <></>}
                            <Button onClick={handleSubmit} variant="contained" className="bg-yellow-100 text-black-bold" sx={{ fontFamily: 'Poppins', marginTop: '5%' }}>
                                {(loading) ? <BeatLoader /> : t("loginPage.signIn")}
                            </Button>
                        </form>

                        <Typography className="text-white" sx={{ fontFamily: 'Poppins', textAlign: 'center', marginTop: '5%', fontSize: '14px' }}>
                            {t("loginPage.notAccount")}
                            <NavLink className='text-yellow-100 ml-1' to='/register'>{t("loginPage.registerLink")}</NavLink>
                        </Typography>

                        <Typography className="text-white" sx={{ fontFamily: 'Poppins', textAlign: 'center', marginTop: '5%', fontSize: '12px' }} >
                            {t("rights")} <strong className="poppins-bold-italic"> © Daniel Vicent Luna</strong>
                        </Typography>

                        <div className="langContainer">
                            <img className='flagIcon' onClick={() => i18n.changeLanguage('es')} src={spainFlag}></img>
                            <img className='flagIcon' onClick={() => i18n.changeLanguage('en')} src={englandFlag}></img>
                        </div>
                    </Grid>
                </Grid>


            </Grid>
        </>
    )
}
