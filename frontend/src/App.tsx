import * as React from 'react';

import jsonServerProvider from 'ra-data-json-server'
import {Admin, ListGuesser, Resource} from "react-admin";
import {apiUrl} from "./backend-config.json";
import {TodoList} from "./todos";
import Dashboard from "./Dashboard";

const dataProvider = jsonServerProvider(apiUrl)
const App = () =>
    <Admin dashboard={Dashboard} dataProvider={dataProvider}>
        <Resource name="todos" list={TodoList} />
    </Admin>

export default App;
