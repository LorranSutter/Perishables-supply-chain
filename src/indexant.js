import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import { BaseStyles, theme } from "rimble-ui";
import { ThemeProvider } from "styled-components";
import * as serviceWorker from './serviceWorker';

const customTheme = {
  /*
  theme={Object.assign({}, theme, {
    colors: {
      ...theme.colors, // keeps existing colors
      text: "#EEE", // sets color for text
      background: "#222", // sets color for background
      primary: "#3259D6" // sets primary color
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64], // sets font scale
    space: [0, 4, 8, 16, 32, 64, 128, 256], // sets spacing scale
  })} 
  */
};


ReactDOM.render(

  <ThemeProvider theme={customTheme}>
    <BaseStyles>
      <App />
    </BaseStyles>
  </ThemeProvider>,
 
 document.getElementById('root')
);

/*
ReactDOM.render(

    <App />,
 
  document.getElementById('root')
);
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();