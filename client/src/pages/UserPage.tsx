import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext, RantData } from "../types";
import { UserContext } from "../context/Context";

// Components
import UserContent from "./components/UserContent";
import Rant from "./components/Rant";

// Axios
import axios from "axios";
import { SET_LOADING, CLEAR_LOADING } from "../context/ReducerTypes";

// type ImageUploadData = { [k: string]: any | string | Blob };

interface Props {
  match: any;
}

export const Profile: React.FC<Props> = ({ match }) => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  const [user, setUser] = useState<{ [k: string]: any }>({});
  const [rants, setRants] = useState<Array<RantData>>([]);

  useEffect(() => {
    dispatch({ type: SET_LOADING });
    axios
      .get(`/user/${match.params.handle}`)
      .then((res: any) => {
        setUser(res.data.userData.user);
        setRants(rants => rants.concat(res.data.userData.rants));
        dispatch({ type: CLEAR_LOADING });
      })
      .catch((error: Error) => console.log(error));
  }, []);

  // History to Push Page
  const history = useHistory();

  return (
    <div className="main-home-content">
      <h1>PROFILE</h1>
      <div className="profile-card">
        <UserContent setImage={false} isAuth={false} data={user} />
      </div>
      <h1>RANTS</h1>
      <div className="profile-card">
        {rants &&
          rants.map((rant: RantData) => <Rant key={rant.rantID} data={rant} />)}
        {rants.length === 0 && <h4 className="text-center">No Rants</h4>}
        <div style={{ marginBottom: "20px" }}></div>
      </div>
    </div>
  );
};

export default Profile;
