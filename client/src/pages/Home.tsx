import React from "react";

// CSS
import './Home.css';

// Components
import Header from "./components/Header/Header";
import { Rant } from "./components/Rant/Rant";

export default function Home() {
    return (
        <div style = {{display: 'block'}}>
            <Header />
            <div className = 'search-bar'></div>
            <Rant title = 'Hello'/>
            <Rant title = 'World'/>
            <div className = 'footer'>
                <p>Created by Advaith Nair</p>
            </div>
        </div>
    );
}
