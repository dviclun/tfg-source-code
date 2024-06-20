import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SvgLogo } from "../../atoms/SvgLogo/SvgLogo";
import { AppSettings } from "../../organisms/AppSettings/AppSettings";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { AppBar, Avatar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';

import spainFlag from '../../../assets/flags/spain.png';
import englandFlag from '../../../assets/flags/england.png';

import LogoSvg from '../../../assets/logoWeb.svg';
import { theme } from "../../../assets/styles/theme";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import Logout from "@mui/icons-material/Logout";
import CommentIcon from '@mui/icons-material/Comment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';



const drawerWidth = 240;

export const Header = (props) => {

    const [t, i18n] = useTranslation("global");

    const navigate = useNavigate();

    //Objeto window
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    
    //useContext de la autenticacion para saber si el usuario esta logueado
    const { logged, user, logout } = useContext(AuthContext);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const onLogout = () => {
      logout();

      navigate('/login');
    }

    //Mobile menu
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <NavLink to='/'>
            <SvgLogo/>
          </NavLink>
          <Divider />
          <List sx={{paddingTop: '0'}}>
          {(logged) 
            ? <>
              <ListItem sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}}>
                <Avatar src={( user.profile_image !== "") ? `${user.profile_image} ` : ""} sx={{marginRight: '10px'}} /><NavLink className='navLinksMobile poppins-medium' to={`/profile/${user.username}`}>{user.username}</NavLink> 
              </ListItem>
              <Divider />
              </>
            :<>
                <ListItem>
                  <NavLink className='authLinksMobile text-green-400 poppins-medium' to='/login'>{t("header.login")}</NavLink>
                </ListItem>

                <ListItem>
                  <NavLink className='authLinksMobile text-green-600 poppins-medium' to='/register'>{t("header.register")}</NavLink>
                </ListItem>

                <Divider/>
              </>
            }

            <ListItem>
                  <NavLink to='/trainings' className='navLinksMobile poppins-medium'>{t("header.training-videos")}</NavLink>
            </ListItem>


            <ListItem>
              <NavLink to='/forum' className='navLinksMobile poppins-medium'>{t("header.forum")}</NavLink>
            </ListItem>

           

            <ListItem>
              <NavLink to='/registerTraining' className='navLinksMobile poppins-medium'>{t("header.record-training")}</NavLink>
            </ListItem>

            

            <ListItem>
              <NavLink to='/ranking' className='navLinksMobile poppins-medium'>{t("header.ranking")}</NavLink>
            </ListItem>

       

            <ListItem>
              <NavLink to='/personalizedTraining' className='navLinksMobile poppins-medium'>{t("header.personalized-training")}</NavLink>
            </ListItem>

            <Divider/>

            {
              (logged)
              ? <ListItem onClick={()=> navigate("/friends")}>
                  <ListItemIcon>
                    <GroupIcon/>
                  </ListItemIcon>
                  {t("settings.friendList")}
                </ListItem>
              : null  
            }

{
          (logged)
          ? <ListItem onClick={()=> navigate("/chat")}>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            {t("settings.chat")}
          </ListItem>
          :null
        }

            {
              (logged)
              ? <ListItem onClick={onLogout}>
                  <ListItemIcon>
                    <Logout/>
                  </ListItemIcon>
                  {t("settings.logout")}
                </ListItem>
              :null  
            }

            <ListItem sx={{cursor: 'pointer'}} onClick={() => i18n.changeLanguage('es')}>
                  <img className='flagIcon' src={spainFlag}></img>
                  <Typography sx={{marginLeft: '5px', fontFamily:'Poppins'}} >{t("spanish")}</Typography>
            </ListItem>
            <ListItem sx={{cursor: 'pointer'}} onClick={() => i18n.changeLanguage('en')}>
                  <img className='flagIcon' src={englandFlag}></img>
                  <Typography sx={{marginLeft: '5px', fontFamily:'Poppins'}} >{t("english")}</Typography>
            </ListItem>

            <ListItem onClick={()=>navigate("/about")}>
              <ListItemIcon>
                <InfoIcon/>
              </ListItemIcon>
              {t("settings.about")}
            </ListItem>

            <ListItem onClick={()=>navigate("/help")}>
              <ListItemIcon>
                <HelpIcon/>
              </ListItemIcon>
              {t("settings.help")}
            </ListItem>

            {
              (logged && user.rol === 'admin')
              ? <div>
                <Divider/>
                  <ListItem sx={{fontWeight: 'bold'}}>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon sx={{color: 'black'}}/>
                    </ListItemIcon>
                    {t("header.adminOpt")}
                  </ListItem>
                  <ListItem onClick={()=>navigate('/addVideo')}>
                    <ListItemIcon>
                      <AddToQueueIcon/>
                    </ListItemIcon>
                    {t("header.addVideos")}
                  </ListItem>
                  <ListItem onClick={()=>navigate('/viewPendingRequests')}>
                    <ListItemIcon>
                      <PendingActionsIcon/>
                    </ListItemIcon>
                    {t("header.requests")}
                  </ListItem>
                </div>
              : null
            }

            {
              (logged && user.rol === 'trainer')
              ? <div>
              <Divider/>
                <ListItem sx={{fontWeight: 'bold'}}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon sx={{color: 'black'}}/>
                  </ListItemIcon>
                  {t("header.trainerOpt")}
                </ListItem>
                <ListItem onClick={()=>navigate('/viewPendingRequests')}>
                  <ListItemIcon>
                    <PendingActionsIcon/>
                  </ListItemIcon>
                  {t("header.requests")}
                </ListItem>
              </div>
              : null
            }
          </List>
        </Box>
      );

    //Contenedor en el que se encontrará el drawer  
    const container = window !== undefined ? () => window().document.body : undefined;

      

    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className="header" component="nav" color="transparent" sx={{boxShadow: 'none'}} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
           <MenuIcon/>
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
          >

            <NavLink to='/' className='logoLinkHeader'>
              <img className='headerSvg' src={LogoSvg}/>
            </NavLink>

            <NavLink to='/trainings' className='navLinks poppins-medium'>{t("header.training-videos")}</NavLink>
            <NavLink to='/forum' className='navLinks poppins-medium'>{t("header.forum")}</NavLink>
            <NavLink to='/registerTraining' className='navLinks poppins-medium'>{t("header.record-training")}</NavLink>
            <NavLink to='/ranking' className='navLinks poppins-medium'>{t("header.ranking")}</NavLink>
            <NavLink to='/personalizedTraining' className='navLinks poppins-medium'>{t("header.personalized-training")}</NavLink>

          </Typography>

          

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '15px' }}>

            {(logged) 
            ? <>
              </>
            :<>
                <Button sx={{fontSize:'12px', backgroundColor: theme.palette.green300, ':hover': {backgroundColor: theme.palette.green400}}}>
                  <NavLink to='/login' className='header-link-black poppins-medium'>{t("header.login")}</NavLink>
                </Button>

                <Button sx={{fontSize:'12px', backgroundColor: theme.palette.green600, ':hover': {backgroundColor: theme.palette.green500}}}>
                  <NavLink to='/register' className='header-link poppins-medium'>{t("header.register")}</NavLink>
                </Button>
              </>
            }
            
            <AppSettings />
            
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      
      </Box>
    )
}
