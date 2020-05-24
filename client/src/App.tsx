import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';

// Main Theme Import
import { mainTheme } from './assets/themes/Themes'

// Material UI
import { ThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
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
