import { createGlobalStyle } from 'styled-components';

import oggRegularWoff from './fonts/Ogg-Regular.woff';
import oggRegularWoff2 from './fonts/Ogg-Regular.woff2';
import zurichSansRegular from './fonts/ZurichSans-Regular.ttf';
import zurichSansMedium from './fonts/ZurichSans-Medium.ttf';

export const theme = {
  lightBlue: '#91bfe3',
  midBlue: '#5495cf',
  zurichBlue: '#2167ae',
  skyBlue: '#1fb1e6',
  darkBlue: '#26366A',
  mint: '#a6e9ab',
  teal: '#19bab6',
  peach: '#ff7569',
  white: 'white'
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Ogg-Regular';
    src: local('Ogg-Regular'), local('OggRegular'),
    url(${oggRegularWoff2}) format('woff2'), 
    url(${oggRegularWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Zurich Sans';
    src: local('Zurich Sans'), local('ZurichSans'),
    url(${zurichSansRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Zurich Sans';
    src: local('Zurich Sans'), local('ZurichSans'),
    url(${zurichSansMedium}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  body {
    margin: 0;
    font-family: 'Zurich Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.zurichBlue};
    color: white;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;