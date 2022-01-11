import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import './index.css'

const { Sider } = Layout
const { SubMenu } = Menu

function SideMenu(props) {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/rights?_embed=children').then((res) => {
      console.log(res.data)
      setMenu(res.data)
    })
  }, [])

  const checkpage = (item) => item.pagepermisson === 1
  const { history, location, isCollapsed } = props

  const renderMenu = (menuList) => menuList.map((item) => {
    if (item.children?.length > 0 && checkpage(item)) {
      return (
        <SubMenu
          key={item.key}
          icon={item.icon}
          title={item.title}

          // eslint-disable-next-line react/jsx-props-no-multi-spaces
          onTitleClick={() => {
            if (item.id === 1) {
              history.push(item.key)
            }
          }}
        >
          {renderMenu(item.children)}
        </SubMenu>
      )
    }
    return checkpage(item) && (
      <Menu.Item
        key={item.key}
        icon={item.icon}
        onClick={() => {
          history.push(item.key)
        }}
      >
        {item.title}
      </Menu.Item>
    )
  })
  const openKeys = [`/${location.pathname.split('/')[1]}`]
  return (
    <Sider trigger={null} collapsible collapsed={isCollapsed}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo">新闻发布管理系统</div>
        <div style={{ flex: '1', overflow: 'auto' }}>
          <Menu theme="dark" mode="inline" defaultOpenKeys={openKeys} defaultSelectedKeys={[location.pathname]}>
            {/* <Menu.Item key="1" icon={<UserOutlined />}>
                  首页
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  nav 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                  nav 3
                </Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="用户管理">
                    <Menu.Item key="5">Option 3</Menu.Item>
                    <Menu.Item key="6">Option 4</Menu.Item>
                </SubMenu> */}
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
const mapStateToProps = ({ CollapsedReduser: { isCollapsed } }) => ({ isCollapsed })
export default connect(mapStateToProps)(withRouter(SideMenu))
