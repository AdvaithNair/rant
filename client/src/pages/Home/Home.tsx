import React, { useState, useEffect } from "react";

// CSS
import './Home.css';

// Components
import Header from "../components/Header/Header";
import { Rant } from "../components/Rant/Rant";

// Axios
import axios from 'axios';
import { RantData } from "../../types";

export default function Home() {
    // Setting State for Rant Data
    const [rantData, setRantData] = useState([]);

    // On Component Mount, Request All Rants
    useEffect(() => {
        axios.get('/get/all_rants').then((res) => {
            setRantData(res.data)
        }).catch((err: Error) => console.log(err))
    }, [])

    return (
        <div style={{ display: 'block' }}>
            <Header />
            <div className='search-bar'></div>
            {rantData.map((rant: RantData) => <Rant key={rant.rantID} data={rant} />)}
            <div className='footer'>
                <p>A VIB<u>RANT</u> EXPERIENCE</p>
            </div>
        </div>
    );
}
