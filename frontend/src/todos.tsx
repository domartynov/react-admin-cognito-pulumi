import * as React from "react"
import {List, Datagrid, TextField, BooleanField, ListProps} from "react-admin";

export const TodoList = (props: ListProps) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <BooleanField source="done" />
            <TextField source="title" />
        </Datagrid>
    </List>
)