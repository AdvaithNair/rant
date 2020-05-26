import React, { useState, useEffect } from "react";
import { RantData } from "../types";

// Components
import Header from "./components/Header";
import { Rant } from "./components/Rant";

// Axios
import axios from "axios";

export default function Home() {
  // Setting State for Rant Data
  const [rantData, setRantData] = useState([]);

  // On Component Mount, Request All Rants
  useEffect(() => {
    axios
      .get("/get/all_rants")
      .then(res => {
        setRantData(res.data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  return (
    <div style={{ display: "block" }}>
      <Header />
      <div className="search-bar"></div>
      {rantData.map((rant: RantData) => (
        <Rant key={rant.rantID} data={rant} />
      ))}
      <div className="footer">
        <p>
          A VIB<b>RANT</b> EXPERIENCE
        </p>
      </div>
    </div>
  );
}
