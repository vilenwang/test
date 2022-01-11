import React from 'react'
import {
 Form, Button, Input, message,
} from 'antd'
import './Login.css'
import axios from 'axios'

export default function Login(props) {
    const propss = props
    const onFinish = (val) => {
        console.log(val)
        axios.get(`http://localhost:5000/users?username=${val.username}&password=${val.password}`).then(
            (res) => {
                if (res.data.length === 0) {
                    console.log('消息有误')
                    message.error('用户名密码错误')
                } else {
                    localStorage.setItem('token', res.data[0])
                    propss.history.push('/')
                }
            },
        )
    }
    return (
        <div style={{ backgroundColor: 'rgb(35,39,65)', height: '100%' }}>
            <div className="formContinor">
                <div className="title">新闻发布管理系统</div>

                <Form
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        style={{ color: 'white' }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: '245px' }}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
