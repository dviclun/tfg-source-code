import { Button, Grid, Typography } from "@mui/material"
import { Header } from "../../molecules/Header/Header"
import { SectionTitle } from "../../atoms/SectionTitle/SectionTitle"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react";
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from "react"
import { EntryCard } from "../../molecules/EntryCard/EntryCard"
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import {MutatingDots} from 'react-loader-spinner';



export const ForumPage = () => {
    const [t] = useTranslation("global");

    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {logged} = useContext(AuthContext);

    const navigate = useNavigate();

    const theme = useTheme();

    const URL = 'https://tfg-backend-seven.vercel.app/entries';

    useEffect(()=> {

      if(entries.length === 0){

        fetch(URL)
          .then(res => res.json())
          .then(data => {
                  setEntries(data);
                  setTimeout(()=> {
                    setIsLoading(false);
                  }, 1000)
              })
          .catch(error => {
              console.log(error);
              })

      }

    }, []);

    const handleAddEntry = () => {
      navigate("./addEntry");
    }

  return (
    <>
        <Header/>
        <Grid container sx={{marginTop: '80px', padding: '2em'}}>

          <Grid item xs={12}>
            <SectionTitle title={t("forum.title")} subtitle={t("forum.subtitle")}/>
          </Grid>
          {
            (isLoading)
            ? <Grid item xs={12} sx={{marginTop: '3em'}}>
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
          : <Grid container>
              {
                (logged)
                ? <Grid item xs={12} display={'flex'} justifyContent={'center'} sx={{marginTop: '1em'}}>
                      <Button 
                          sx={{fontSize:'12px', backgroundColor: theme.palette.green600, ':hover': {backgroundColor: theme.palette.green500}}}    
                          variant="contained" 
                          startIcon={<AddIcon />} 
                          onClick={handleAddEntry}>
                          {t("forum.addEntry")}
                      </Button>
                    </Grid>
                : <Grid item xs={12} display={'flex'} justifyContent={'center'} sx={{marginTop: '1em'}}>
                      <Typography>{t("forum.wantAddEntry")} 
                        <NavLink to="/login" className="landingLink">{t("landingPage.login")}</NavLink>{t("landingPage.separator")}<NavLink to='/register' className="landingLink">{t("landingPage.register")}</NavLink>
                      </Typography>
                  </Grid>
              }

              <Grid item xs={12}>
                {
                  entries.map(entry => (
                    <EntryCard key={entry.entry_id} entry_id={entry.entry_id} entry_date={entry.entry_date} title={entry.entry_title} user_id={entry.user_id} entry_body={entry.entry_body}/>
                  ))
                }
              </Grid>
            </Grid>
          }
           
        </Grid>
    </>
  )
}
