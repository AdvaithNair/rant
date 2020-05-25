import React from "react";
import { Link } from 'react-router-dom';

// Logo
import RantLogo from '../assets/images/RantLogoTransparent.png';

// Main Theme Import
import { mainTheme } from '.././assets/themes/Themes'

// Material UI
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';

export default function Landing() {
    return (
        <ThemeProvider theme={mainTheme}>
            <div style={{ display: 'block' }}>
                <div className='background-image'></div>
                <div className='landing-content'>
                    <img src={RantLogo} className='landing-logo' alt='Rant Logo'></img>
                    <div className='landing-button' style={{ backgroundColor: '#F012BE' }}><Button component = {Link} to = '/signup' style={{ fontSize: '25px', color: 'white', fontFamily: 'Montserrat', fontWeight: 550 }} fullWidth>Sign Up</Button></div>
                    <div className='landing-button' style={{ backgroundColor: '#39CCCC' }}><Button style={{ fontSize: '25px', color: 'white', fontFamily: 'Montserrat', fontWeight: 550 }} fullWidth>Log In</Button></div>
                </div>
            </div>
        </ThemeProvider>
    );
}
