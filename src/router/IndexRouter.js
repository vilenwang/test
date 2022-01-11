import React from 'react'
import {
 HashRouter, Route, Switch, Redirect,
} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
    return (
        <HashRouter>
            <Switch>
            <Route path="/login" component={Login} />
            {/* <Route path='/' component={NewsSandBox}></Route> */}
            {/* 可以写三目运算符 */}
            <Route path="/" render={() => (localStorage.getItem('token') ? <NewsSandBox /> : <Redirect to="/login" />)} />
            </Switch>
        </HashRouter>
    )
}
