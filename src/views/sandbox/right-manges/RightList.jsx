import React, { useState, useEffect } from 'react'
import {
    Table, Tag, Button, Modal, Popover, Switch,
} from 'antd'
import axios from 'axios'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

export default function RightList() {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/rights?_embed=children').then((res) => {
            const list = res.data
            list.forEach((item) => {
                const a = item
                if (item.children.length === 0) {
                    a.children = ''
                }
            })
            setDataSource(list)
        })
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>,
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => <Tag color="lime">{key}</Tag>,
        },
        {
            title: '操作',
            render: (item) => (
                <div>
                    <Popover
                        content={(
                            <div style={{ textAlign: 'center' }}>
                                <Switch checked={!!item.pagepermisson} onChange={() => { switchmethod(item) }} />
                            </div>
                        )}
                        title="页面配置项"
                        trigger={item.pagepermisson === undefined ? '' : 'click'}
                    >
                        <Button type="primary" disabled={item.pagepermisson === undefined}>编辑</Button>
                    </Popover>
                    <Button type="primary" danger onClick={() => myconfirm(item)}>删除</Button>
                </div>
            ),
        },
    ]

    const switchmethod = (item) => {
        const a = item
        a.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        setDataSource([...dataSource])
        if (item.grade === 1) {
            axios.patch(`http://localhost:5000/rights/${item.id}`, {
                pagepermisson: item.pagepermisson,
            })
        } else {
            axios.patch(`http://localhost:5000/children/${item.id}`, {
                pagepermisson: item.pagepermisson,
            })
        }
    }

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
        //  setDataSource(dataSource.filter(item=> item.id!==deleteitem.id)
        if (item.grade === 1) {
            setDataSource(dataSource.filter((date) => item.id !== date.id))
            axios.delete(`http://localhost:5000/rights/${item.id}`)
        } else {
            // console.log(item.rightId);
            const list = dataSource.filter((data) => data.id === item.rightId)
            list[0].children = list[0].children.filter((data) => data.id !== item.id)
            setDataSource([...dataSource])
            axios.delete(`http://localhost:5000/children/${item.id}`)
        }
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    )
}
