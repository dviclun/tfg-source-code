import { createTheme } from "@mui/material";
import { orange } from '@mui/material/colors';
import Poppins from '../fonts/Poppins-Regular.ttf'

export const theme = createTheme({
    status: {
        danger: orange[500],
      },
    palette: {
        slate100: '#f1f5f9',
        slate300:'#cbd5e1',
        green300: '#86efac',
        green400: '#4ade80',
        green500: '#22c55e',
        green600: '#16a34a',
        green700: '#047857', 
        green900: '#14532d',
        red400: '#f87171',
        red500: '#ef4444',
        zinc200: '#e4e4e7',
        zinc300: '#d4d4d8',
        zinc400: '#a1a1aa',
        rose400: '#fb7185',
        rose500: '#f43f5e',
        purple400: '#c084fc',
        purple500: '#a855f7',
        blue300: '#93c5fd',
        blue400: '#60a5fa',
        gray100: '#f3f4f6',
        neutral100: '#f5f5f5',
        neutral200: '#e5e5e5',
        emerald100: '#d1fae5'
    },
});