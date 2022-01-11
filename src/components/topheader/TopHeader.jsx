import React from 'react'
import {
 Layout, Dropdown, Menu, Avatar,
} from 'antd'
import {
 UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const { Header } = Layout

 function TopHeader(props) {
   const propss = props
    const changeCollapsed = () => {
      // 改变state的状态
          console.log(props)
          propss.changeCollapsed()
    }

    const menu = (
      <Menu>
        <Menu.Item key={1}>
         超级管理员
        </Menu.Item>
        <Menu.Item key={2} danger onClick={() => { localStorage.removeItem('token'); propss.history.replace('/login') }}>退出</Menu.Item>
      </Menu>
    )

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
          {
            propss.isCollapsde ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }
          <div style={{ float: 'right' }}>
            <span>欢迎admin回来</span>
            <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
    )
}
const mapStateToProps = ({ CollapsedReduser: { isCollapsed } }) => ({
      isCollapsde: isCollapsed,
     })
const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: 'change_collapsed',
    }
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader))
