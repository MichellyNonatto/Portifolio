'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#86458e',
    },
    secondary: {
      main: '#6b586b',
    },
    background: {
      default: '#FFF7FA', 
      paper: '#FFF7FA',
    }
  },
});
export default theme;
