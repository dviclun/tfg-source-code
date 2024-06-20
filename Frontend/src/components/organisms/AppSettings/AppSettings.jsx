import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import GroupIcon from '@mui/icons-material/Group';
import spainFlag from '../../../assets/flags/spain.png';
import englandFlag from '../../../assets/flags/england.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';



export const AppSettings = () => {

  const { logged, user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [t, i18n] = useTranslation('global');

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  //Funcion que llama a la acción del logout.
  const onLogout = () => {
    logout(); //Funcion logout del AuthProvider

    navigate('/', {
        replace: true
    })
}

const handleProfileNavigation = () => {
  navigate(`/profile/${user.username}`);
}

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t("settings.icon-tooltip")}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Settings sx={{ width: 32, height: 32 }}></Settings>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          (logged)
          ? 
              <MenuItem onClick={handleProfileNavigation} sx={{display: 'flex', justifyContent: 'center'}}>
                <Avatar src={( user.profile_image !== "") ? `${user.profile_image} ` : ""}/> {user.username} 
              </MenuItem>
              
          : null  
        }
        {(logged)
          ? <Divider/>
          : null
        }
        {
          (logged)
          ? <MenuItem onClick={()=>navigate("/friends")}>
              <ListItemIcon >
                <GroupIcon/>
              </ListItemIcon>
              {t("settings.friendList")}
            </MenuItem>
          : null  
        }

        {
          (logged)
          ? <MenuItem onClick={()=> navigate("/chat")}>
            <ListItemIcon>
              <CommentIcon fontSize="small" />
            </ListItemIcon>
            {t("settings.chat")}
          </MenuItem>
          :null
        }
        
        {
          (logged)
          ? <MenuItem onClick={onLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              {t('settings.logout')}
            </MenuItem>
          : null  
        }
       
        <MenuItem onClick={() => i18n.changeLanguage('es')}>
          <ListItemIcon>
            <img className='flagIcon' src={spainFlag}></img>
          </ListItemIcon>
          {t("spanish")}
        </MenuItem>
        <MenuItem onClick={() => i18n.changeLanguage('en')}>
          <ListItemIcon>
          <img className='flagIcon' src={englandFlag}></img>
          </ListItemIcon>
          {t("english")}
        </MenuItem>

        <MenuItem onClick={()=>navigate("/about")}>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          {t("settings.about")}
        </MenuItem>

        <MenuItem onClick={()=>navigate("/help")}>
              <ListItemIcon>
                <HelpIcon fontSize='small'/>
              </ListItemIcon>
              {t("settings.help")}
            </MenuItem>

        {
          (logged && (user.rol === 'admin' || user.rol === 'trainer'))
          ? <Divider/>
          : null
        }
        {
          (logged && user.rol === 'admin')
          ? <div>
              <MenuItem sx={{fontWeight: 'bold'}}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon sx={{color: 'black'}}/>
                </ListItemIcon>
                {t("header.adminOpt")}
              </MenuItem>
              <MenuItem onClick={()=>navigate('/addVideo')}>
                <ListItemIcon>
                  <AddToQueueIcon/>
                </ListItemIcon>
                {t("header.addVideos")}
              </MenuItem>
              <MenuItem onClick={()=>navigate('/viewPendingRequests')}>
                <ListItemIcon>
                  <PendingActionsIcon/>
                </ListItemIcon>
                {t("header.requests")}
              </MenuItem>
            </div>
          : null  
        }
        {
          (logged && user.rol === 'trainer')
          ? <div>
              <MenuItem sx={{fontWeight: 'bold'}}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon sx={{color: 'black'}}/>
                </ListItemIcon>
                {t("header.trainerOpt")}
              </MenuItem>
              <MenuItem onClick={()=>navigate('/viewPendingRequests')}>
                <ListItemIcon>
                  <PendingActionsIcon/>
                </ListItemIcon>
                {t("header.requests")}
              </MenuItem>
            </div>
          : null  
        }
      </Menu>
    </>
  );
}