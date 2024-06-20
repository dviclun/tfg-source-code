import { Grid } from "@mui/material";

import { useTranslation } from "react-i18next";
import { TrainingsFilters } from '../../molecules/TrainingsFilters/TrainingsFilters'
import { useState } from "react";
import { VideosGallery } from "../../organisms/VideoGallery/VideosGallery";
import { SectionTitle } from "../../atoms/SectionTitle/SectionTitle";
import { Header } from "../../molecules/Header/Header";



export const TrainingsPage = () => {

  const [t] = useTranslation("global");

  const [showFilters, setShowFilters] = useState(true);
  const [filterSelected, setFilterSelected] = useState(-1);


  const handleFilterClick = (filter) => {
    setFilterSelected(filter);
    
    setShowFilters(false);
  }

  const handleGoBack = () => {
    setShowFilters(true);
  }
  
  return (
   <>
    <Header />
    <Grid container sx={{marginTop: '80px', padding: '2em'}}>
        <SectionTitle title={t("trainings.title")} subtitle={t("trainings.subtitle")}/>
        <Grid container justifyContent="center">
           
                {
                  (showFilters)
                  ? <TrainingsFilters handleFilterClick={handleFilterClick} />
                  : <VideosGallery filter={filterSelected} handleGoBack={handleGoBack} setShowFilters={setShowFilters}/>
                }

           
        </Grid>
    </Grid>
   </>
  )
}
