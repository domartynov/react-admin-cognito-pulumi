import * as React from 'react';

import jsonServerProvider from 'ra-data-json-server'
import {Admin, Resource} from "react-admin";
import {apiUrl} from "./backend-config.json";
import {TodoList} from "./todos";
import {Dashboard} from "./Dashboard";
import {authProvider} from "./authProvider";
import {Route} from 'react-router-dom';
import {NewPasswordRequired} from "./NewPasswordRequired";
import {LoginPage} from "./auth";

const dataProvider = jsonServerProvider(apiUrl)

const customRoutes = [
    <Route path="/new-password-required" component={NewPasswordRequired} />
]

const App = () =>
    <Admin dashboard={Dashboard}
           loginPage={LoginPage}
           authProvider={authProvider}
           dataProvider={dataProvider}
           customRoutes={customRoutes}>
        <Resource name="todos" list={TodoList} />
    </Admin>

export default App;
