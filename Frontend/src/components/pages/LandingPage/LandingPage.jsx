
import './landingStyles.css';
import { Grid, Typography, useMediaQuery } from "@mui/material";
import LogoSvg from '../../../assets/logoWeb.svg';
import VideoSvg from '../../../assets/videosSvg.svg';
import RegisterTrainingSvg from '../../../assets/registerTrainingSvg.svg';
import RankingSvg from '../../../assets/rankingSvg.svg';
import ForumSvg from '../../../assets/forumSvg.svg';
import PersonalTrainingSvg from '../../../assets/personalTrainingSvg.svg';

import { useTheme } from "@mui/material/styles";
import 'animate.css';
import { Link } from "react-router-dom";
import { LandingArticleReverse } from "../../atoms/LandingArticleReverse/LandingArticleReverse";
import { LandingArticle } from "../../atoms/LandingArticle/LandingArticle";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { useTranslation } from "react-i18next";
import { Header } from '../../molecules/Header/Header';


export const LandingPage = () => {

    const theme = useTheme();

    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const [t] = useTranslation("global");

    const { logged } = useContext(AuthContext);

    return (
        <>
            <Header />
            <Grid container className="bg-white" sx={{paddingLeft: {xl: '10em'}, paddingRight: {xl: '10em'}}}>

                <Grid container item justifyContent='center' className="animate__animated animate__fadeIn">
                    <Grid container item xs={12} justifyContent='center' className="fit-content">
                        <img className="landingMainLogo" src={LogoSvg}></img>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={isSmall ? 'h5': 'h3'} sx={{fontWeight:'bold', fontFamily: 'Poppins', paddingBottom: '0.5em', textAlign: 'center'}} className="poppins-medium" >NEW CONCEPT <span className="text-green-600 poppins-bold-italic">GYM</span></Typography> 
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={isSmall ? 'body1' : 'h5'} sx={{ fontFamily: 'Poppins', paddingLeft: '0.5em', paddingRight:'0.5em', paddingBottom: '0.5em', textAlign: 'center'}}>{t("landingPage.slogan")}</Typography>
                    </Grid>
                </Grid>
                
                
                <LandingArticle container isSmall={isSmall} title={t("landingPage.training-title")} image={VideoSvg} imageClass={'landingImage'} wrap={isSmall ? 'wrap': 'nowrap'} item xs={12} sx={{marginTop: '1em', padding:'4em'}} spacing={5} >    
                    <Typography sx={{textAlign:{xs: 'center', md: 'left'}, marginTop: '1em', fontFamily: 'Poppins'}}>
                        {t("landingPage.training-subtitle-p1")}<Link to='/trainings' className="landingLink">{t("landingPage.training-link")}</Link>{t("landingPage.training-subtitle-p2")}
                    </Typography>  
                </LandingArticle>

                <LandingArticleReverse container isSmall={isSmall} title={t("landingPage.record-title")} image={RegisterTrainingSvg} imageClass={'landingImage'} wrap={isSmall ? 'wrap-reverse': 'nowrap'} item xs={12} sx={{padding:'4em', paddingTop: 0}} spacing={5} >  
                    <Typography sx={{textAlign:{xs: 'center', md: 'left'}, marginTop: '1em', fontFamily: 'Poppins'}}>
                        <Link to='/registerTraining' className="landingLink">{t("landingPage.record-link")}</Link>{t("landingPage.record-subtitle")}
                    </Typography>
                </LandingArticleReverse>

                <LandingArticle container isSmall={isSmall} title={t("landingPage.ranking-title")} image={RankingSvg} imageClass={'landingImageSaturated'} wrap={isSmall ? 'wrap': 'nowrap'} item xs={12} sx={{marginTop: '1em', padding:'4em', paddingTop: 0}} spacing={5} >    
                    <Typography sx={{textAlign:{xs: 'center', md: 'left'}, marginTop: '1em', fontFamily: 'Poppins'}}>
                        {t("landingPage.ranking-subtitle-p1")}<Link to='/ranking' className="landingLink">{t("landingPage.ranking-link")}</Link>{t("landingPage.ranking-subtitle-p2")}
                    </Typography>
                </LandingArticle>
                
                <LandingArticleReverse container isSmall={isSmall} image={ForumSvg} imageClass={'landingImage'} title={t("landingPage.connect-title")} wrap={isSmall ? 'wrap-reverse': 'nowrap'} item xs={12} sx={{padding:'4em', paddingTop: 0}} spacing={5} >
                    <Typography sx={{textAlign:{xs: 'center', md: 'left'}, marginTop: '1em', fontFamily: 'Poppins'}}>
                        {t("landingPage.connect-subtitle-p1")}<Link to='/forum' className="landingLink">{t("landingPage.connect-link")}</Link>{t("landingPage.connect-subtitle-p2")}
                    </Typography>
                </LandingArticleReverse>

                <LandingArticle container isSmall={isSmall} title={t("landingPage.personalized-title")} image={PersonalTrainingSvg} imageClass={'landingImage'} wrap={isSmall ? 'wrap': 'nowrap'} item xs={12} sx={{marginTop: '1em', padding:'4em', paddingTop: 0}} spacing={5} >    
                    <Typography sx={{textAlign:{xs: 'center', md: 'left'}, marginTop: '1em', fontFamily: 'Poppins'}}>
                        {t("landingPage.personalized-subtitle-p1")}<Link to='/paySuscription' className="landingLinkPremium">{t("landingPage.personalized-link-1")}</Link>{t("landingPage.personalized-subtitle-p2")}<Link to='/personalizedTraining' className="landingLink">{t("landingPage.personalized-link-2")}</Link>{t("landingPage.personalized-subtitle-p3")}
                    </Typography>
                </LandingArticle>

                {
                    (!logged)
                    ? <Grid container item xs={12} justifyContent='center' sx={{padding: '4em', paddingTop: 0}}>
                        <Grid item xs={12}>
                            <Typography variant={isSmall ? 'h5' : 'h3'} sx={{marginTop: '1em', fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center'}}>{t("landingPage.slogan2")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{textAlign: 'center', marginTop: '1em'}}>
                                <Link to='/login' className="landingLink">{t("landingPage.login")}</Link> {t("landingPage.separator")} <Link to='/register' className="landingLink">{t("landingPage.register")}</Link>{t("landingPage.afterLinks")}
                            </Typography>
                        </Grid>
                      </Grid>
                    : <></>  
                }

                <Grid item xs={12}>
                <Typography sx={{fontFamily: 'Poppins', textAlign: 'center', padding: '4em', paddingBottom: '2em', paddingTop: 0}} >
                {t("rights")} <strong className="poppins-bold-italic">© Daniel Vicent Luna</strong>
                        </Typography>
                </Grid>

            </Grid>
        </>
    )
}
