import { useTheme } from '@emotion/react'
import { Avatar, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export const ContactList = ({contacts, handleActiveContact}) => {
    const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));


    const [t] = useTranslation("global");

    const onClickContact = (id) => {
        const clickedContact = contacts.find(contact => contact.user_id === id);

        handleActiveContact(clickedContact)
    }

  return (
    <Grid item xs={12} sm={6} md={4}>
        <Card sx={{border: `1px solid ${theme.palette.green300}`}}>
            <CardContent className='contactListCard' sx={{}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h6' textAlign={'center'} fontStyle={'italic'}>{t("chatPage.contactList")}</Typography>
                        {
                            (isSmall)
                            ?<Typography textAlign={'center'}>{t("chatPage.emptyChatSubtitle")}</Typography>
                            :null
                        }
                    </Grid>
                    {
                        (contacts.length > 0 && (
                            contacts.map(contact => (
                                <Grid onClick={()=>onClickContact(contact.user_id)} container alignItems={'center'} item xs={12} key={contact.user_id} sx={{cursor: 'pointer',backgroundColor: theme.palette.emerald100, padding: '1em', borderRadius: '10px', marginTop: '.5em'}}>
                                   <Grid item>
                                        <Avatar src={(contact.profile_image !== "") ? `${contact.profile_image}` : ""}/>
                                   </Grid>
                                   <Grid item sx={{marginLeft: '.5em'}}>
                                        <Typography sx={{fontFamily: 'Poppins', fontWeight: '500'}}>
                                            {contact.username}
                                        </Typography>
                                   </Grid>
                                </Grid>
                            ))
                        ))
                    }
                </Grid>
            </CardContent>
        </Card>
    </Grid>
  )
}

ContactList.propTypes = {
    contacts: PropTypes.array,
    handleActiveContact: PropTypes.func
}