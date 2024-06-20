
import { useState } from 'react'
import { SnackbarContext } from './SnackbarContext';
import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const SnackbarProvider = ({children}) => {

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [openWarningSnackbar, setOpenWarningSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');

    const [t] = useTranslation("global");

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway'){
            return;
        }

        setOpenSnackbar(false);
    }

    const handleCloseErrorSnackbar = (event, reason) => {
        if (reason === 'clickaway'){
            return;
        }

        setOpenErrorSnackbar(false);
    }

    const handleCloseWarningSnackbar = (event, reason) => {
        if (reason === 'clickaway'){
            return;
        }

        setOpenWarningSnackbar(false);
    }

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleOpenErrorSnackbar = () => {
        setOpenErrorSnackbar(true);
    }

    const handleOpenWarningSnackbar = () => {
        setOpenWarningSnackbar(true);
    }

  return (
    <SnackbarContext.Provider value={{
        setMessage,
        setWarningMessage,
        handleOpenSnackbar,
        handleOpenErrorSnackbar,
        handleOpenWarningSnackbar
    }}>
        {children}
        <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
        >
        {message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseErrorSnackbar}
     >
        <Alert
            onClose={handleCloseErrorSnackbar}
            severity='error'
            variant='filled'
            sx={{ width: '100%' }}
        >
            {t("serverSideErrorMessage")}
        </Alert>
     </Snackbar>  

     <Snackbar
        open={openWarningSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseWarningSnackbar}
     >
        <Alert
            onClose={handleCloseWarningSnackbar}
            severity='warning'
            variant='filled'
            sx={{ width: '100%' }}
        >
            {warningMessage}
        </Alert>
     </Snackbar>  
    </SnackbarContext.Provider>
  )
}
