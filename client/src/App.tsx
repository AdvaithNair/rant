import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/Home';

// Material UI
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const rantTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#F341CB',
      main: '#F012BE',
      dark: '#A80C85',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#60D6D6',
      main: '#39CCCC',
      dark: '#278E8E',
      contrastText: '#FFF'
    },
    info: {
      light: '#D6D6D6',
      main: '#CCCCCC',
      dark: '#8E8E8E',
      contrastText: '#FFF'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={rantTheme}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
