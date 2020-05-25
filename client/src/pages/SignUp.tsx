import React from "react";

// Logo
import RantLogo from '../assets/images/RantLogoTransparent.png';

// Main Theme Import
import { mainTheme } from '.././assets/themes/Themes'

// Material UI
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';

export default function SignUp() {
    return (
        <ThemeProvider theme={mainTheme}>
            <div style={{ display: 'block' }}>
                <div className='background-image'></div>
                <div className='signup-content'>
                    <img src={RantLogo} className='signup-logo' alt='Rant Logo'></img>
                </div>
            </div>
        </ThemeProvider>
    );
}
