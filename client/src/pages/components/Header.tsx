import React from 'react'

// Material Imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ThemeProvider } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BlurCircularRoundedIcon from '@material-ui/icons/BlurCircularRounded';
import IconButton from '@material-ui/core/IconButton';

// Logo
import RantLogo from '../../assets/images/RantLogoTransparent.png';

// Header Theme
import { headerTheme } from '../../assets/themes/Themes'

export default function Header() {
    return (
        <div className='header'>
            <ThemeProvider theme={headerTheme}>
                <AppBar color='primary'>
                    <Toolbar>
                        <div className='header-content'>
                            <img src={RantLogo} className='header-logo' alt='Rant Logo'></img>
                            <div className='content-right'>
                                <div className='spacer'><IconButton><AddCircleIcon color="action" style={{ fontSize: 40 }} /></IconButton></div>
                                <div className='spacer'><IconButton><BlurCircularRoundedIcon color="action" style={{ fontSize: 40 }} /></IconButton></div>
                                <div className='spacer'><IconButton><AccountCircleIcon color="action" style={{ fontSize: 40 }} /></IconButton></div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar >
            </ThemeProvider>
        </div>
    )
}
