import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import {MutatingDots} from 'react-loader-spinner';
import {NavLink} from 'react-router-dom';



export const RankingTable = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {user} = useContext(AuthContext);

    const theme = useTheme();
    
    const [t] = useTranslation("global");

    const URL = 'https://tfg-backend-seven.vercel.app/usersRanking';

    useEffect(()=> {
        if(users.length === 0) {
            fetch(URL)
                .then(res => res.json())
                .then(data => {
                        setUsers(data);
                        setTimeout(()=> {
                            setIsLoading(false);
                        }, 1000)
                    })
                .catch(error => {
                    console.log(error);
                    })
        }
    }, [])

  return (
    <Grid item xs={12} sx={{marginTop: '4em'}} display={'flex'} justifyContent={'center'}>
        {
            (isLoading)
            ? <Grid item xs={12}>
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
          : <TableContainer component={Paper} sx={{ maxWidth: '1000px'}}>
          <Table sx={{tableLayout: 'fixed'}}>
              <TableHead>
                  <TableRow className="greenGradient">
                      <TableCell align="center" sx={{color: 'white', textDecoration: 'underline', fontFamily: 'Poppins'}}>{t("ranking.position")}</TableCell>
                      <TableCell align="center" sx={{color: 'white', textDecoration: 'underline', fontFamily: 'Poppins'}}>{t("ranking.user")}</TableCell>
                      <TableCell align="center" sx={{color: 'white', textDecoration: 'underline', fontFamily: 'Poppins'}}>{t("ranking.points")}</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody className="rankingTbody">
                  {
                      users.map((currentUser, index) => (
                          <TableRow className="tableRow" key={currentUser.user_id}
                              sx={{backgroundColor: (user && user.user_id === currentUser.user_id) ? theme.palette.zinc200 : ''}}
                          >
                              <TableCell className="tableCell" align="center" sx={{fontWeight: 'bold', fontFamily: 'Poppins'}}>{index+1}</TableCell>
                              <TableCell align="center" sx={{fontWeight: (user && user.user_id === currentUser.user_id) ? 'bold' : '', fontFamily: 'Poppins'}}>
                                <Tooltip title={t("viewProfile")}>
                                    <NavLink className='profileLink' to={`/profile/${currentUser.username}`}>
                                        {currentUser.username}
                                    </NavLink>
                                </Tooltip>
                              </TableCell>
                              <TableCell align="center" sx={{fontWeight: (user && user.user_id === currentUser.user_id) ? 'bold' : '', fontFamily: 'Poppins'}}>{currentUser.points}</TableCell>
                          </TableRow>
                      ))
                  }
              </TableBody>
          </Table>
      </TableContainer>
        }
        
    </Grid>
  )
}
