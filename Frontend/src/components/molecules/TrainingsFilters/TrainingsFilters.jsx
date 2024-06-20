import { useEffect, useState } from 'react';
import { FiltersCard } from '../../atoms/FiltersCard/FiltersCard';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {MutatingDots} from 'react-loader-spinner';
import PropTypes from 'prop-types';


export const TrainingsFilters = ({handleFilterClick}) => {

  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [t, i18n] = useTranslation("global");

  const URL = 'https://tfg-backend-seven.vercel.app/muscularGroups'

  useEffect(()=> {
    if(groups.length === 0){
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          setTimeout(()=> {
            setIsLoading(false);
          }, 1000)
          setGroups(data);
        })
        .catch(error => {
      console.log(error);
    })
    }
  },[])

  return (
    <Grid container item justifyContent="center" spacing={2} sx={{width: '100%', maxWidth: '1440px',paddingLeft: {xs: '2em', sm: '5em'} , paddingRight: {xs: '2em', sm: '5em'}, paddingTop: '3em'}}>
      {
        (isLoading)
        ?<Grid item xs={12}>
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
        : groups.map((group)=>
          (
             <Grid item xs={12} sm={6} md={(group.priority === 1)? 3 : 2} sx={{textAlign:'right'}} key={group.group_id}>
               <FiltersCard 
                 imgHeight={(group.priority === 1)? '200px' : '100px'} 
                 cardTitle={(i18n.language == 'es') ? group.group_name_es : group.group_name_en} 
                 muscularGroup={group.group_name_en}
                 groupId={group.group_id}
                 handleFilterClick={handleFilterClick}
               />
               </Grid> 
           )
         
       )  
      }      
    </Grid>
  );
}

TrainingsFilters.propTypes = {
  handleFilterClick: PropTypes.func
}