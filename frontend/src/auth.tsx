import * as React from 'react'
import {Login, LoginForm} from 'react-admin'
import {StaticContext} from "react-router";
import {TitleComponent} from "ra-core";
import {CardContent} from '@material-ui/core';


export interface LoginProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
    backgroundImage?: string;
    children?: React.ReactNode;
    classes?: object;
    className?: string;
    notification?: React.ComponentType;
    staticContext?: StaticContext;
    theme?: object;
    title?: TitleComponent;
}

export const LoginPage = (props: LoginProps) =>
    <Login {...props}>
        <LoginForm/>
        <CardContent>.</CardContent>
    </Login>


