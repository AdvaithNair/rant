import React from 'react'

// CSS
import './Header.css';

// Material Imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BlurCircularRoundedIcon from '@material-ui/icons/BlurCircularRounded';

// Logo
import RantLogo from '../../../assets/images/RantLogoTransparent.png';

// Header Color Palette
const headerTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#D6D6D6',
            main: '#CCCCCC',
            dark: '#8E8E8E',
            contrastText: '#FFF'
        },
        secondary: {
            light: '#60D6D6',
            main: '#39CCCC',
            dark: '#278E8E',
            contrastText: '#FFF'
        }
    }
})

export default function Header() {
    return (
        <div className = 'header'>
            <ThemeProvider theme={headerTheme}>
                <AppBar color='primary'>
                    <Toolbar>
                        <div className='header-content'>
                            <img src={RantLogo} className='header-logo' alt='Rant Logo'></img>
                            <div className='content-right'>
                                <div className='spacer'><AddCircleIcon color="action" style={{ fontSize: 40 }} /></div>
                                <div className='spacer'><BlurCircularRoundedIcon color="action" style={{ fontSize: 40 }} /></div>
                                <div className='spacer'><AccountCircleIcon color="action" style={{ fontSize: 40 }} /></div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar >
            </ThemeProvider>
        </div>
    )
}

/*
        <div className='header_bar'>
<div className='header-content'>
                <div className='left-content'>

                </div>
                <div className='right-content'>
                    <p>Hi2</p>
                </div>
            </div></div>*/
