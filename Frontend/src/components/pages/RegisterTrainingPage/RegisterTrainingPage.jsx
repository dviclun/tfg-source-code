import { Grid } from "@mui/material"
import { SectionTitle } from "../../atoms/SectionTitle/SectionTitle"
import { Header } from "../../molecules/Header/Header"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { AuthContext } from "../../../contexts/Auth/AuthContext"
import { RegisterTrainingForm } from "../../organisms/RegisterTrainingForm/RegisterTrainingForm"
import RankingSvg from '../../../assets/rankingSvg.svg';
import PeopleTrainingSvg from '../../../assets/peopleTrainingSvg.svg'
import { NotLoggedMessage } from "../../atoms/NotLoggedMessage/NotLoggedMessage"

export const RegisterTrainingPage = () => {

    const { logged } = useContext(AuthContext);

    const [t, i18n] = useTranslation("global");
  return (
    <>
    <Header/>
    <Grid container sx={{marginTop: '80px', padding: '2em'}}>
        <SectionTitle title={t("registerTraining.title")} subtitle={t("registerTraining.subtitle")}/>
        {
          (logged)
          ? <Grid container item>
              <RegisterTrainingForm/>
              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <img className="peopleTrainingImage" src={PeopleTrainingSvg} alt="People Training Svg"/>
              </Grid>
            </Grid>
          : <NotLoggedMessage className={'rankingImage'} imgSrc={RankingSvg}/>
        }
    </Grid>
    </>
  )
}
