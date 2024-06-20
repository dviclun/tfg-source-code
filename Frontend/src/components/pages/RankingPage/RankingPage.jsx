import { Grid, Typography } from "@mui/material"
import { Header } from "../../molecules/Header/Header"
import { SectionTitle } from "../../atoms/SectionTitle/SectionTitle"
import { useTranslation } from "react-i18next"
import { RankingTable } from "../../molecules/RankingTable/RankingTable"
import { useContext } from "react"
import { AuthContext } from "../../../contexts/Auth/AuthContext"
import { NavLink } from "react-router-dom"


export const RankingPage = () => {

    const [t] = useTranslation("global");
    const {logged} = useContext(AuthContext);

  return (
    <>
        <Header/>
        <Grid container sx={{marginTop: '80px', padding: '2em'}}>
            <SectionTitle title={t("ranking.title")} subtitle={t("ranking.subtitle")}/>
            {
                (!logged)
                ? <Grid item xs={12} sx={{marginTop: '2em'}}>
                    <Typography sx={{width: '100%', textAlign:'center', fontFamily: 'Poppins'}}>{t("ranking.partOfRanking")}
                        <NavLink to='/login' className="landingLink">{t("landingPage.login")}</NavLink>
                        {t("landingPage.separator")}
                        <NavLink to='/register' className="landingLink">{t("landingPage.register")}</NavLink>
                        {t("registerTraining.notLoggedMessage")}
                    </Typography>
                  </Grid>
                : null
            }
            <RankingTable/>
            
        </Grid>
    </>
  )
}
