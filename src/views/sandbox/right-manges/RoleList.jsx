import React, { useState, useEffect } from 'react'
import {
    Table, Button, Modal, Tree,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'

const { confirm } = Modal

export default function RoleList() {
    const [dataSource, setdataSource] = useState([])
    const [isVisble, setIsVisble] = useState(false)
    const [treeDate, settreedate] = useState([])
    // 权限是否被选中状态
    const [currentrights, setcurrentrights] = useState([])
    const [currentId, setcurrentId] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:5000/roles').then((res) => {
            setdataSource(res.data)
        })
    }, [])
    // 树形结构的请求
    useEffect(() => {
        axios.get('http://localhost:5000/rights?_embed=children').then((res) => {
            settreedate(res.data)
        })
    }, [])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>,
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render: (item) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            setIsVisble(true)
                            setcurrentrights(item.rights)
                            setcurrentId(item.id)
                        }}
                    >
                        编辑
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            myconfirm(item)
                        }}
                    >
                        删除
                    </Button>
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

    // 删除权限
    const deleteMethod = (item) => {
        setdataSource(dataSource.filter((date) => item.id !== date.id))
        axios.delete(`http://localhost:5000/roles/${item.id}`)
    }
    const handleOk = () => {
        console.log(currentrights)
        setIsVisble(false)
        setdataSource(dataSource.map((item) => {
            if (item.id === currentId) {
                return {
                    ...item,
                    rights: currentrights,
                }
            }
            return item
        }))
        axios.patch(`http://localhost:5000/roles/${currentId}`, {
            rights: currentrights,
        })
    }
    const handleCancel = () => {
        setIsVisble(false)
    }
    const onCheck = (cheackkeys) => {
        setcurrentrights(cheackkeys)
    }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} />
            <Modal title="权限分配" visible={isVisble} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    treeData={treeDate}
                    checkedKeys={currentrights}
                    onCheck={onCheck}
                />
            </Modal>
        </div>
    )
}
