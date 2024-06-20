import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './assets/styles/theme.js'
import { ParallaxProvider } from 'react-scroll-parallax';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

import './index.css'
import { AppRouter } from './AppRouter.jsx'

import { ThemeProvider } from '@emotion/react'

import { AuthProvider } from './contexts/Auth/AuthProvider.jsx';
import { SnackbarProvider } from './contexts/Snackbar/SnackbarProvider.jsx';

i18next.init({
  interpolation: {escapeValue: false},
  lng: 'es',
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          {/* Parallax provider */}
          <ParallaxProvider>
            {/* i18next Provider */}
            <I18nextProvider i18n={i18next}>

              <SnackbarProvider>

                <AppRouter />

              </SnackbarProvider>

            </I18nextProvider>
            
          </ParallaxProvider>
          
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>,
)
