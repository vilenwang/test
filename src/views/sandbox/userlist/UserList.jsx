import React, { useState, useEffect, useRef } from 'react'
import {
 Table, Button, Modal, Switch,
} from 'antd'
import axios from 'axios'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../../../components/user-meage/UserForm'

const { confirm } = Modal

export default function UserList() {
    const [dataSource, setDataSource] = useState([])
    const [isVisible, setisVisible] = useState(false)
    const [roleList, setroleList] = useState([])
    const [regionList, setregionList] = useState([])
    const addForm = useRef(null)
    useEffect(() => {
        axios.get('http://localhost:5000/users?_expand=role').then((res) => {
            const list = res.data
            setDataSource(list)
        })
    }, [])
        // 区域列表的数据
    useEffect(() => {
        axios.get('http://localhost:5000/roles').then((res) => {
            const list = res.data
            setroleList(list)
        })
    }, [])
        // 角色列表的数据
    useEffect(() => {
        axios.get('http://localhost:5000/regions').then((res) => {
            const list = res.data
            setregionList(list)
        })
    }, [])

    const columns = [
        {
          title: '区域',
          dataIndex: 'region',
         render: (region) => <b>{region === '' ? '全球' : region}</b>,
        },
        {
          title: '角色名称',
          dataIndex: 'role',
          render: (role) => role.roleName,
        },
        {
          title: '用户名',
          dataIndex: 'username',
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
           render: (roleState, item) => <Switch checked={roleState} disabled={item.default} />,
        },
        {
            title: '操作',
            render: (item) => (
                            <div>
                                <Button type="primary" disabled={item.default}>编辑</Button>
                                <Button type="primary" danger onClick={() => myconfirm(item)} disabled={item.default}>删除</Button>
                            </div>
            ),
        },
    ]

     const myconfirm = (item) => {
        confirm({
            title: '你确定要删除吗',
            icon: <ExclamationCircleOutlined />,
            onOk() {
              // console.log('OK');
               deleteMethod(item)
            },
            onCancel() {
              // console.log('Cancel');
            },
          })
    }
    const deleteMethod = (item) => {
        setDataSource(dataSource.filter((date) => date.id !== item.id))
        axios.delete(`http://localhost:5000/users/${item.id}`)
    }
     // 删除权限
     const addFormOK = () => {
        addForm.current.validateFields().then((value) => {
            // console.log(value)

            setisVisible(false)

            addForm.current.resetFields()
            // post到后端，生成id，再设置 datasource, 方便后面的删除和更新
            axios.post('http://localhost:5000/users', {
                ...value,
                roleState: true,
                default: false,
            }).then((res) => {
                console.log(res.data)
                setDataSource([...dataSource, {
                    ...res.data,
                    role: roleList.filter((item) => item.id === value.roleId)[0],
                }])
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <Button type="primary" style={{ marginBottom: '10px' }} onClick={() => setisVisible(true)}>添加用户</Button>
           <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={(item) => item.id} />
                <Modal
                visible={isVisible}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                onCancel={() => {
                    setisVisible(false)
                }}
                onOk={() => addFormOK()}
                >
                <UserForm regionList={regionList} roleList={roleList} ref={addForm} />
                </Modal>
        </div>
    )
}
