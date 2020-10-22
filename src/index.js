import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore ,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux/reducers'
import ReduxThunk from 'redux-thunk'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'

const store=createStore(reducers, applyMiddleware(ReduxThunk))

const theme=createMuiTheme({
  palette: {
    primary: {
      main: '#ff8f00',
      dark: '#e65100'
    },
    secondary: {
      main: '#b71c1c'
    }
  }
})

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
