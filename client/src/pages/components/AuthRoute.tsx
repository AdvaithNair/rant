import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

interface Props {
  component: any;
  exact: Boolean;
  path: string;
}

export const AuthRoute: React.FC<Props> = ({ exact, path, component }) => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  return (
    <div>
      {state.authenticated === true ? (
        <Redirect to="/home" />
      ) : (
        <Route {...exact} path={path} component={component} />
      )}
    </div>
  );
};

export default AuthRoute;
