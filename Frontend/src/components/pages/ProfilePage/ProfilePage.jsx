import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../molecules/Header/Header'
import { Avatar, Badge, Button, Card, CardContent, FormControl, Grid, Input, TextField, Tooltip, Typography } from '@mui/material'
import { AuthContext } from '../../../contexts/Auth/AuthContext'
import { useTheme } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import EditIcon from '@mui/icons-material/Edit';
import { SnackbarContext } from '../../../contexts/Snackbar/SnackbarContext'
import { useNavigate, useParams } from 'react-router-dom'
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export const ProfilePage = () => {

  const { user, login } = useContext(AuthContext);
  const theme = useTheme();

  const { username } = useParams();
  const navigate = useNavigate();

  const [t] = useTranslation("global");
  const defaultBio = t("profilePage.defaultBio");

  const { setMessage, handleOpenSnackbar, handleOpenErrorSnackbar, setWarningMessage, handleOpenWarningSnackbar } = useContext(SnackbarContext);

  const [userTrainings, setUserTrainings] = useState([]);
  const [userEntries, setUserEntries] = useState([]);
  const [userResponses, setUserResponses] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [activeUser, setActiveUser] = useState();

  const [isFriend, setIsFriend] = useState(true);

  const [editingBio, setEditingBio] = useState(false);
  const [biography, setBiography] = useState(defaultBio);

  useEffect(() => {

    if (!user || user.username !== username) {
      fetch(`https://tfg-backend-seven.vercel.app/userByUsername/${username}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            setActiveUser(data[0])
            setProfileImageUrl(data[0].profile_image)
            setBiography((data[0].biography !== '') ? data[0].biography : defaultBio);
          } else {
            setActiveUser([])
          }

        })
        .catch(error => console.log(error))

    } else {
      setActiveUser(user);
      setProfileImageUrl(user.profile_image);
      setBiography((user.biography !== '') ? user.biography : defaultBio);
    }

    if (user && user.username !== username) {
      const body = {
        user_id: user.user_id,
        username: username
      }

      const fetchConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }

      fetch("https://tfg-backend-seven.vercel.app/getNonFriendsByUsername", fetchConfig)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            setIsFriend(false)
          }
        }
        )
        .catch(error => console.log(error))
    }

  }, [username]);

  useEffect(() => {

    if (activeUser) {
      fetch(`https://tfg-backend-seven.vercel.app/numberOfTrainings/${activeUser.user_id}`)
        .then(res => res.json())
        .then(data => setUserTrainings(data))

      fetch(`https://tfg-backend-seven.vercel.app/numberOfEntries/${activeUser.user_id}`)
        .then(res => res.json())
        .then(data => setUserEntries(data))

      fetch(`https://tfg-backend-seven.vercel.app/numberOfResponses/${activeUser.user_id}`)
        .then(res => res.json())
        .then(data => setUserResponses(data))
    }

    if (activeUser && activeUser.length === 0) navigate("/");

  }, [activeUser])


  const handleEditBio = () => {
    setEditingBio(!editingBio);
  }

  const handleBiography = (e) => {

    setBiography(e.target.value);
  }

  const handleSaveBiography = () => {
    const body = {
      biography,
      user_id: user.user_id
    }

    const fetchConf = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    const updated_user = {
      ...user,
      biography
    }

    fetch('https://tfg-backend-seven.vercel.app/updateBio', fetchConf)
      .then(res => res.json())
      .then(res => {
        login(updated_user);
        setMessage(t("profilePage.bioSavedSuccessfully"));
        handleOpenSnackbar();
        setEditingBio(false);
      })
      .catch(error => {
        console.log(error);
        console.log('[updateBio] Hubo un error en la parte del servidor')
        handleOpenErrorSnackbar();
      })
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const extension = e.target.files[0].name.split('.').pop().toLowerCase();
      if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {

        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        formData.append('user_id', user.user_id);

        fetch('https://tfg-backend-seven.vercel.app/uploadUserImage', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData
        })
          .then(res => res.json())
          .then(data => {

            console.log(data);
            let body = {
              user_id: user.user_id
            }

            fetch('https://tfg-backend-seven.vercel.app/getUserProfileImage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body)
            })
              .then(res => res.json())
              .then(data => {

                let updated_user = {
                  ...user,
                  profile_image: data[0].profile_image
                }

                login(updated_user);
                setMessage(t('profilePage.profileImageUpdatedSuccessfully'))
                handleOpenSnackbar();
                setProfileImageUrl(data[0].profile_image);
              })
              .catch(error => console.log(error))

          })
          .catch(error => console.log(error))

      } else {
        setWarningMessage(t("profilePage.notValidArchive"));
        handleOpenWarningSnackbar();
        console.log('archivo no valido');
      }
    }
  }

  const handleAddFriend = () => {
    const body = {
      applicant_id: user.user_id,
      requested_id: activeUser.user_id
    }

    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    fetch("https://tfg-backend-seven.vercel.app/createFriendRequest", fetchConfig)
      .then(res => res.json())
      .then(data => {
        setIsFriend(true);
        setMessage("Solicitud de amistad enviada correctamente");
        handleOpenSnackbar();
      })
      .catch(error => console.log("error al enviar la solicitud de amistad"))
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

  const visuallyHiddenInput = {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  }

  return (
    <>
      <Header />

      {
        (activeUser && activeUser.length !== 0)
          ? <Grid container spacing={2} sx={{ marginTop: '80px', padding: '2em' }}>
            <Grid container item xs={12}>
              {
                (user && activeUser.username === user.username)
                  ? <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: '500' }}>{t("profilePage.myProfile")}</Typography>
                  : null
              }
            </Grid>
            <Grid container item xs={12} md={5}>
              <Card elevation={3} sx={{ width: '100%', padding: '1em' }}>
                <CardContent>

                  <Grid container spacing={3} item xs={12}>

                    <Grid item xs={12} md={5} xl={3} display={'flex'} justifyContent={'center'}>

                      {
                        (user && user.username === activeUser.username)
                          ? <Badge
                            color='transparent'
                            overlap="circular"
                            badgeContent={
                              <Tooltip title={t("profilePage.editImage")}>
                                <Button
                                  component="label"
                                  role={undefined}
                                  variant="contained"
                                  tabIndex={-1}
                                  sx={{ borderRadius: '50%', width: '40px', minWidth: '40px', backgroundColor: theme.palette.green500, ':hover': { backgroundColor: theme.palette.green600 } }}
                                >
                                  <EditIcon />
                                  <Input sx={visuallyHiddenInput} type="file" onChange={handleFileChange} />
                                </Button>
                              </Tooltip>
                            }
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                          >
                            <Avatar src={(profileImageUrl !== "") ? `${profileImageUrl}` : ""} sx={{ width: { xs: 200, md: 150, xl: 200 }, height: { xs: 200, md: 150, xl: 200 } }} />
                          </Badge>

                          : <Avatar src={(profileImageUrl !== "") ? `${profileImageUrl}` : ""} sx={{ width: { xs: 200, md: 150, xl: 200 }, height: { xs: 200, md: 150, xl: 200 } }} />
                      }


                    </Grid>

                    <Grid container item xs={12} md={6}>
                      <Grid item xs={12} md={9} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: '500', textAlign: { xs: "center", md: "left" } }}>{activeUser.fullname}</Typography>
                        <Typography sx={{ fontFamily: 'Poppins', fontStyle: 'italic', fontWeight: 'light', textAlign: { xs: "center", md: "left" } }}>@{activeUser.username}</Typography>
                      </Grid>
                      {
                        (user && !isFriend)
                          ? <Grid item xs={12} md={3} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                            <Tooltip title={t("friendsPage.addFriend")}><Button onClick={handleAddFriend}><PersonAddIcon sx={{ color: 'black' }} /></Button></Tooltip>
                          </Grid>
                          : null
                      }
                    </Grid>


                    <Grid container item xs={12} spacing={2}>
                      <Grid item xs={10}>
                        <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: '500' }}>{t("profilePage.biography")}</Typography>
                      </Grid>
                      <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} xs={2}>
                        {
                          (user && user.username === activeUser.username)
                            ? <Tooltip title={t("profilePage.editBio")}>
                              <Button sx={{ color: "black" }} onClick={handleEditBio}><EditIcon /></Button>
                            </Tooltip>
                            : null
                        }

                      </Grid>

                      {
                        (editingBio)
                          ? <Grid container spacing={2} item xs={12}>
                            <Grid item xs={12}>
                              <FormControl sx={{ width: '100%' }}>
                                <TextField sx={textAreaStyle} multiline rows={3} onChange={handleBiography} value={biography}></TextField>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                              <Button onClick={handleSaveBiography} sx={{ backgroundColor: theme.palette.green500, ':hover': { backgroundColor: theme.palette.green600 } }} variant='contained' color='success'>{t("profilePage.save")}</Button>
                            </Grid>
                          </Grid>
                          : <Grid container spacing={2} item xs={12}>
                            <Grid item xs={12}>
                              <Typography sx={{ marginTop: '1em', fontFamily: 'Poppins' }}>{(user && activeUser && activeUser.username === user.username) ? user.biography : (activeUser.biography === "") ? defaultBio : activeUser.biography}</Typography>
                            </Grid>
                          </Grid>
                      }

                    </Grid>
                  </Grid>

                </CardContent>
              </Card>

            </Grid>

            <Grid container item xs={12} md={7}>
              <Card elevation={3} sx={{ width: '100%', padding: '2em 1em', }}>

                <Grid container spacing={3} item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant='h4' sx={{ fontFamily: 'Poppins', fontWeight: '500', textAlign: 'center' }}>{t("profilePage.stats")}</Typography>
                  </Grid>

                  <Grid container item xs={12} justifyContent={'center'}>
                    <Grid item xs={12}>
                      <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: '500', textAlign: 'center' }}>{t("profilePage.points")}</Typography>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ marginTop: '1em', width: '100px', height: '100px', backgroundColor: theme.palette.green500, borderRadius: '50%', border: `2px solid ${theme.palette.green600}` }}>
                      <Typography variant='h5' sx={{ color: 'white', fontFamily: 'Poppins', fontWeight: '700', textAlign: 'center' }}>{activeUser.points}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} sm={4} justifyContent={'center'}>
                    <Grid item xs={12}>
                      <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: '500', textAlign: 'center' }}>{t("profilePage.trainings")}</Typography>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ marginTop: '1em', width: '100px', height: '100px', backgroundColor: theme.palette.blue300, borderRadius: '50%', border: `2px solid ${theme.palette.blue400}` }}>
                      <Typography variant='h5' sx={{ color: 'white', fontFamily: 'Poppins', fontWeight: '700', textAlign: 'center' }}>{(userTrainings.length !== 0) ? userTrainings[0].number_of_trainings : null}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} sm={4} justifyContent={'center'}>
                    <Grid item xs={12}>
                      <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: '500', textAlign: 'center' }}>{t("profilePage.entries")}</Typography>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ marginTop: '1em', width: '100px', height: '100px', backgroundColor: theme.palette.blue300, borderRadius: '50%', border: `2px solid ${theme.palette.blue400}` }}>
                      <Typography variant='h5' sx={{ color: 'white', fontFamily: 'Poppins', fontWeight: '700', textAlign: 'center' }}>{(userEntries.length !== 0) ? userEntries[0].number_of_entries : null}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} sm={4} justifyContent={'center'}>
                    <Grid item xs={12}>
                      <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: '500', textAlign: 'center' }}>{t("profilePage.responses")}</Typography>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ marginTop: '1em', width: '100px', height: '100px', backgroundColor: theme.palette.blue300, borderRadius: '50%', border: `2px solid ${theme.palette.blue400}` }}>
                      <Typography variant='h5' sx={{ color: 'white', fontFamily: 'Poppins', fontWeight: '700', textAlign: 'center' }}>{(userResponses.length !== 0) ? userResponses[0].number_of_responses : null}</Typography>
                    </Grid>
                  </Grid>

                </Grid>

              </Card>
            </Grid>
          </Grid>
          : null
      }
    </>
  )
}
