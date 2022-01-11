import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import SideMenu from '../../components/sidemenu/SideMenu'
import TopHeader from '../../components/topheader/TopHeader'
// import UserList from './userlist/UserList'
// import RoleList from './right-manges/RoleList'
// import RightList from './right-manges/RightList'
// import NoPermission from './nopermission/NoPermission'

// layout布局的css文件
import './NewsSandBox.css'
// import Home from './home/Home' 路由懒加载
const Home = lazy(() => import('./home/Home'))
const UserList = lazy(() => import('./userlist/UserList'))
const RoleList = lazy(() => import('./right-manges/RoleList'))
const RightList = lazy(() => import('./right-manges/RightList'))
const NoPermission = lazy(() => import('./nopermission/NoPermission'))

// antd

const { Content } = Layout

export default function NewsSandBox() {
    return (

        <Layout>
            <SideMenu />
                <Layout className="site-layout">
                    <TopHeader />

                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    overflow: 'auto',
                    }}
                >
                  <Suspense fallback={<h1>Loding....</h1>}>
                    <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/user-manage/list" component={UserList} />
                            <Route path="/right-manage/role/list" component={RoleList} />
                            <Route path="/right-manage/right/list" component={RightList} />
                            <Redirect from="/" exact to="/home" />
                            <Route path="*" component={NoPermission} />
                    </Switch>
                  </Suspense>
                </Content>
                </Layout>
        </Layout>

    )
}
