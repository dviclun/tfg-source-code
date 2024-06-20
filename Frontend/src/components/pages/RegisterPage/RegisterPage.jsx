import {  useContext, useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Grid, FormControl, Input, InputLabel, Typography } from "@mui/material";

import spainFlag from '../../../assets/flags/spain.png';
import englandFlag from '../../../assets/flags/england.png';

import bcrypt from 'bcryptjs';

import Button from '@mui/material/Button';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import LogoSvg from '../../../assets/logoWeb.svg';

import { useTranslation } from "react-i18next";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { SnackbarContext } from "../../../contexts/Snackbar/SnackbarContext";



export const RegisterPage = () => {

    const [t, i18n] = useTranslation("global");

    //Usamos el tema de Material UI para poder sacar algunas propiedades de el
    const theme = useTheme();   
    //Comprobación de si la media query es menor de sm para no renderizar determinados componentes en ese caso
    const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const {setMessage, handleOpenSnackbar, handleOpenErrorSnackbar} = useContext(SnackbarContext);

    const { executeRecaptcha } = useGoogleReCaptcha();

    //useState necesarios
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');


    //useState de errores
    const [usernameError, setUsernameError] = useState(false);
    const [usernameFormatError, setUsernameFormatError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [formError, setFormError] = useState(false);
    const [equalPass, setEqualPass] = useState(true);
    const [passwordFormatError, setPasswordFormatError] = useState(false);

    //useDebounce necesarios
    const [debouncedUsername] = useDebounce(username, 500);
    const [debouncedEmail] = useDebounce(email, 500);
    const [debouncedRepassword] = useDebounce(repassword, 500);



    //Estilos de componentes de Material UI
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

    const gridAlignment = {
        // display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        paddingTop: '2%'
    }

      //Bandera para saber si el formulario tiene algun error y poder hacer el registro ya que el use state al cambiar, recarga el componente y nunca llegaba a la funcion de hacer el registro a la primera, 
    //habia que hacer dos clicks en el submit cuando ya estaban los datos correctos
    let formErrorFlag = false;

    //Expresion regular para comprobar el email
    const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    const usernameRegex = /^\S*$/;
//useNavigate para la navegación
const navigate = useNavigate();

//useEffect para comprobar eliminar el error de formError cuando todos los campos esten rellenos en caso de que el error estuviera activo
useEffect(()=> {
    if (username.trim() !== '' && email.trim() !== '' && fullname.trim() !== '' && password.trim() !== '' && repassword.trim() !== '') {
        setFormError(false);
        formErrorFlag = false;  
    }


},[username, fullname, email, password, repassword])


//useEffect para comprobar, si el usuario no está vacio, si este usuario ya existe en la base de datos
useEffect(() => {
    if (debouncedUsername.trim() != '') {
        //Peticion para comprobar si existe el usuario en la base de datos, esta peticion se lanzará cada vez que se actualize el debouncedUsername gracias al hook useEffect
        fetch(`https://tfg-backend-seven.vercel.app/userByUsername/${debouncedUsername}`)
            .then(res => res.json())
            .then(data => {
                (data.length > 0) ? setUsernameError(true) : setUsernameError(false);
            })
    }
}, [debouncedUsername])

 //useEffect para comprobar, si el email no está vacio, si este email ya existe en la base de datos
useEffect(() => {
    if (debouncedEmail.trim() != '') {
        //Peticion para comprobar si existe el email en la base de datos, esta peticion se lanzará cada vez que se actualize el debouncedEmail gracias al hook useEffect
        fetch(`https://tfg-backend-seven.vercel.app/userByEmail/${debouncedEmail}`)
            .then(res => res.json())
            .then(data => {
                (data.length > 0) ? setEmailError(true) : setEmailError(false);

            })

        //Comprobación extra para saber que el email esta en el formato correcto con una expresión regular
        if(!emailRegex.test(debouncedEmail.trim())){
            setEmailFormatError(true);
        } else {
            setEmailFormatError(false);
        }
    }

}, [debouncedEmail])

//useEffect para comprobar, cuando cambie el campo de repetir contraseña y si ambas estan completadas, si esta es igual a la contraseña
useEffect(() => {
    if (debouncedRepassword.trim() != '' && password.trim() != '') {
        (debouncedRepassword !== password) ? setEqualPass(false) : setEqualPass(true);
    }
}, [debouncedRepassword])

//Funcion para controlar el username
const handleUsername = (e) => {
    if(e.target.value === ''){
        setUsernameError(false);
    }
    setUsername(e.target.value);
}

//Funcion para controlar el fullname
const handleFullname = (e) => {
    setFullname(e.target.value);

}

//Funcion para controlar el email
const handleEmail = (e) => {
    if(e.target.value === ''){
        setEmailError(false);
    }
    setEmail(e.target.value);

}

//Funcion para controlar la contraseña
const handlePassword = (e) => {
    setPassword(e.target.value);

}

//Funcion para controlar la repeticion de la contraseña
const handleRepassword = (e) => {
    setRepassword(e.target.value);

}


    //Funcion para controlar el submit
    const handleSubmit = (e) => {            
        
        //Si algun campo no esta relleno, el formulario tendra un error
        if (debouncedUsername.trim() === '' || debouncedEmail.trim() === '' || fullname.trim() === '' || password.trim() === '' || repassword.trim() === '') {
                setFormError(true);
                formErrorFlag = true;

                return; //Salimos de la funcion
            } else { //En caso contrario eliminamos el error y llamamos a la funcion makeRegistration
                formErrorFlag = false;
                makeRegistration();
            }
        } 
        
    //Funcion para realizar el registro del usuario en la base de datos
    const makeRegistration = async() => {
            //Si la contraseña no cumple la regex, colocamos el error y salimos de la funcion
            if(!passwordRegex.test(password)){
                setPasswordFormatError(true)
                return;
            } else {
                setPasswordFormatError(false)
            }

            //Si el usuario no cumple la regex, colocamos el error y salimos de la funcion
            if(!usernameRegex.test(debouncedUsername)){
                setUsernameFormatError(true)
                return;
            } else {
                setUsernameFormatError(false)
            }

            //Si no hay ningun error permitimos continuar con  el registro
            if (!usernameError && !emailError && !formErrorFlag && equalPass && !emailFormatError) {

                //Ultima comprobación para comprobar que los datos tienen el formato que queremos
                if(typeof debouncedUsername === 'string' && typeof fullname === 'string' && typeof email === 'string' && typeof password === 'string'){
                    //Encriptamos la contraseña
                 const salt = await bcrypt.genSalt(10);
                 const hashedPass = await bcrypt.hash(password, salt);

                //Si no esta disponible el captcha salimos de la funcion
                if(!executeRecaptcha){
                    console.log('ReCaptcha not available yet');
                    return;
                }

                const token = await executeRecaptcha('form_submit');

                //Comprobamos que el token del captcha sea correcto
                fetch('https://tfg-backend-seven.vercel.app/verifyCaptcha', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                  })
                  .then(res => res.json())
                  .then(data => {

                    //Si el token ha sido verificado en el servidor
                    if(data.success){
    
                        //Creamos el body de la peticion
                        let body = {
                            username: debouncedUsername,
                            fullname: fullname,
                            email: debouncedEmail,
                            passw: hashedPass
                        }
            
                        //Creamos la configuración de la peticion
                        let fetchConfig = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)
                        }
            
                        //Realizamos la peticion
                        fetch('https://tfg-backend-seven.vercel.app/registerUser', fetchConfig)
                            .then(res => res.json())
                            .then(res => {
                                setMessage(t("registerPage.successfullyRegistered"));
                                handleOpenSnackbar();
                                navigate('/login');
                            })
                            .catch(error => {
                               handleOpenErrorSnackbar();
                            })
                                                


                    } else {
                        handleOpenErrorSnackbar();;
                    }

                  })
                } else {
                    handleOpenErrorSnackbar();
                }
                 
                
            } 
    
        }
    
    
        return (
            <>  
                <Grid className="wrapper">
    
                <Grid container className="containerPattern">
                    <Grid container item xs={12} sm={6} md={6} sx={gridAlignment}  className="greenGradient formContent">
                        
                       <Grid item xs={12}>
                            <NavLink to='/' className='logoLink'><img className='loginSvg' src={LogoSvg}></img></NavLink>
                        </Grid> 
                       
                          <Grid item xs={12}>
                            <Typography variant="h4" sx={{fontWeight:'bold', fontFamily: 'Poppins', paddingBottom: '1em', textAlign: 'center'}} className="text-slate-100 poppins-medium" >NEW CONCEPT <span className="text-yellow-100 poppins-bold-italic">GYM</span></Typography> 
                          </Grid>
                        
                        <Grid item xs={12}>
                            <Typography className="text-slate-100" sx={{fontFamily: 'Poppins', fontSize: '16px', marginBottom: '5%', textAlign: 'center'}}>{t("registerPage.subtitle")}</Typography>
                        </Grid>
                        
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                            <form className="registerForm">
                            <FormControl sx={{paddingBottom: '5%'}}>
                                <InputLabel sx={labelStyle} htmlFor='username'>{t("registerPage.username-placeholder")}</InputLabel>
                                <Input sx={inputStyle} size="small" id="username" autoComplete="off" name="username" onChange={handleUsername}/>
                                {(usernameError) ? <span className="errorSpan mt-0">{t("registerPage.usernameError")}</span> : <></>}
                                {(usernameFormatError) ? <span className="errorSpan mt-0">{t("registerPage.usernameFormatError")}</span> : <></>}
                            </FormControl>
                            <FormControl sx={{paddingBottom: '5%'}}>
                                <InputLabel sx={labelStyle} htmlFor='fullname'>{t("registerPage.name-placeholder")}</InputLabel>
                                <Input sx={inputStyle} id="fullname" autoComplete="off" name="fullname" onChange={handleFullname}/>
                            </FormControl>
                            <FormControl sx={{paddingBottom: '5%'}}>
                                <InputLabel sx={labelStyle} htmlFor='email'>{t("registerPage.email-placeholder")}</InputLabel>
                                <Input sx={inputStyle} id="email" autoComplete="off" name="email" onChange={handleEmail}/>
                                {(emailError) ? <span className="errorSpan mt-0">{t("registerPage.emailError")}</span> : <></>}
                                {(emailFormatError) ? <span className="errorSpan mt-0">{t("registerPage.emailFormatError")}</span> : <></>}
                            </FormControl>
                            <FormControl sx={{paddingBottom:'5%'}}>
                                <InputLabel sx={labelStyle} htmlFor='password' >{t("registerPage.password-placeholder")}</InputLabel>
                                <Input sx={inputStyle} id="password" type="password" autoComplete="off" name="password" onChange={handlePassword} />
                            </FormControl>
                            {(passwordFormatError) ? <span className="errorSpan mt-0">{t("registerPage.passwordFormatError")}</span>: null}
                            <FormControl sx={{paddingBottom: '5%'}}>
                                <InputLabel sx={labelStyle} htmlFor='repeatPassw'>{t("registerPage.repassword-placeholder")}</InputLabel>
                                <Input sx={inputStyle} id="repeatPassw" autoComplete="off" type="password" name="repeatPassw" onChange={handleRepassword}/>
                            </FormControl>
                            {(equalPass) ? <></> : <span className="errorSpan mt-0">{t("registerPage.equalPassError")}</span>}
                            {(formError) ? <span className="errorSpan mt-0">{t("registerPage.allFieldsRequired")}</span> : <></>}

                            <Button onClick={handleSubmit} variant="contained" className="bg-yellow-100 text-black-bold" sx={{fontFamily: 'Poppins', marginTop: '5%'}}>{t("registerPage.signUp")}</Button>
                            </form>
                        </Grid>

                    <Grid item xs={12}>
                        <Typography className="text-white" sx={{fontFamily: 'Poppins', textAlign: 'center',marginTop: '5%', fontSize: '14px'}}>
                        {t("registerPage.alreadyAccount")}
                            <NavLink className='text-yellow-100 ml-1' to='/login'>{t("registerPage.loginLink")}</NavLink>
                        </Typography>
                    </Grid>    
                    
                    <Grid item xs={12}>
                        <Typography className="text-white" sx={{fontFamily: 'Poppins', textAlign: 'center', marginTop: '5%', fontSize: '12px'}} >
                        {t("rights")}<strong className="poppins-bold-italic"> © Daniel Vicent Luna</strong>
                        </Typography>
                    </Grid>

                   <Grid item xs={12}>
                    <div className="langContainer">
                            <img className='flagIcon' onClick={()=> i18n.changeLanguage('es')} src={spainFlag}></img>
                            <img className='flagIcon' onClick={()=> i18n.changeLanguage('en')} src={englandFlag}></img>
                        </div>
                    </Grid> 
                   
                </Grid>
                {!isExtraSmall && (
                    <Grid item sm={6} sx={{padding: '2%'}}>
                        <div id="registerImg"></div>
                    </Grid>
                )}
            </Grid>

            </Grid>
            
        </>
    )
}
