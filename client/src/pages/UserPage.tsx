import React, { useState, useContext, useEffect } from "react";

// Context
import {
  ReducerContext,
  RantData,
  UserCredentials,
  NetworkData
} from "../types";
import { UserContext } from "../context/Context";
import { SET_LOADING, CLEAR_LOADING } from "../context/ReducerTypes";

// Components
import UserContent from "./components/UserContent";
import UserRant from "./components/UserRant";
import {
  followUser,
  unfollowUser,
  addFriend,
  removeFriend
} from "../context/Actions";

// Axios
import api from '../api';

// Material UI
import Button from "@material-ui/core/Button";

// type ImageUploadData = { [k: string]: any | string | Blob };

interface Props {
  match: any;
}

export const Profile: React.FC<Props> = ({ match }) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  const [user, setUser] = useState<UserCredentials>({
    imageURL: "",
    userName: "",
    handle: "",
    email: "",
    userID: "",
    createdAt: "",
    bio: "",
    website: "",
    followerCount: 0,
    followingCount: 0,
    friendCount: 0,
    followers: [],
    following: [],
    friends: []
  });
  const [rants, setRants] = useState<Array<RantData>>([]);
  const [following, setFollowing] = useState<boolean>(false);
  const [friend, setFriend] = useState<boolean>(false);

  // Submits Follow Request
  const handleFollow = () => {
    const userData: NetworkData = {
      handle: user.handle,
      imageURL: user.imageURL
    };
    if (!following) {
      followUser(dispatch, userData);
      setUser({
        ...user,
        followers: user!.followers!.concat({handle: state.credentials.handle, imageURL: state.credentials.imageURL}),
        followerCount: (user.followerCount ? user.followerCount : 0) + 1
      });
    } else {
      unfollowUser(dispatch, userData);
      setUser({
        ...user,
        followers: user!.followers!.filter((e: NetworkData) => e.handle !== state.credentials.handle),
        followerCount: (user.followerCount ? user.followerCount : 1) - 1
      });
    }
    setFollowing(!following);
  };

  // Submits Friend Request
  const handleFriend = () => {
    const userData: NetworkData = {
      handle: user.handle,
      imageURL: user.imageURL
    };
    if (!friend) {
      addFriend(dispatch, userData);
    } else {
      removeFriend(dispatch, userData);
    }
    setFriend(!friend);
  };

  useEffect(() => {
    console.log('run');
    dispatch({ type: SET_LOADING });
    api
      .get(`/user/${match.params.handle}`)
      .then((res: any) => {
        setUser(res.data.userData.user);
        setRants(rants => rants.concat(res.data.userData.rants));
        setFollowing(
          state!.credentials!.following!.some(
            (e: NetworkData) => e.handle === res.data.userData.user.handle
          )
        );
        setFriend(
          state!.credentials!.friends!.some(
            (e: NetworkData) => e.handle === res.data.userData.user.handle
          )
        );
        dispatch({ type: CLEAR_LOADING });
      })
      .catch((error: Error) => console.log(error));
  }, [match.params.handle, state.authenticated]);

  return (
    <div className="main-home-content">
      <h1>PROFILE</h1>
      <div className="profile-card">
        <UserContent setImage={false} isAuth={false} data={user} />
        <div
          className="edit-profile-button"
          style={{ backgroundColor: following ? "red" : "#39CCCC" }}
        >
          <Button
            style={{
              fontSize: "15px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: 550
            }}
            onClick={handleFollow}
            disabled = {state.UI.loading}
            fullWidth
          >
            {following ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <div
          className="logout-button"
          style={{ backgroundColor: friend ? "red" : "#39CCCC" }}
        >
          <Button
            style={{
              fontSize: "15px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: 550
            }}
            onClick={handleFriend}
            disabled = {state.UI.loading}
            fullWidth
          >
            {friend ? "Remove Friend" : "Add Friend"}
          </Button>
        </div>
      </div>
      <h1>RANTS</h1>
      {rants &&
        user.handle !== "anonymous" &&
        rants.map((rant: RantData) => (
          <UserRant key={rant.rantID} data={rant} />
        ))}
      {rants.length === 0 && user.handle !== "anonymous" && (
        <h4 className="text-center">No Rants</h4>
      )}
      {user.handle === "anonymous" && (
        <h4 className="text-center">Cannot View Anonymous Rants</h4>
      )}
      <div style={{ marginBottom: "20px" }}></div>
    </div>
  );
};

export default Profile;
