import React from 'react'
import {Route, Redirect} from 'react-router-dom';

interface Props {
    component: any;
    authenticated: Boolean;
    exact: Boolean;
    path: string;
}

export const AuthRoute: React.FC<Props> = ({ exact, path, component, authenticated}) => {
    return (
        //<Route {...exact} path = {path} render = {() => authenticated === true ? <Redirect to = '/home' /> : <Route {...exact} path = {path} />} />
        <div>
            {authenticated === true ? <Redirect to = '/home' /> : <Route {...exact} path = {path} component = {component} />}
        </div>
    )
}
