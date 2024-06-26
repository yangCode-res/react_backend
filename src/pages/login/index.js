import React from "react";
import { Button, Form, Input ,message} from "antd"
import "./login.css"
import {getMenu} from '../../api'
import { useNavigate,Navigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate()
    if(localStorage.getItem('token')){
        return <Navigate to='/home'></Navigate>
    }
    
    const handleSubmit = (val) => {
        console.log(val);
        if(!val.password || !val.username){
            return message.open({
                type:'warning',
                content:"请输入用户名和密码"
            })
        }
        getMenu(val).then(({data})=>{
               localStorage.setItem('token',data.data.token)
               navigate("/home")
        })
    }
    return (
        <Form className="login-container" onFinish={handleSubmit}>
            <div className="login_title">
                系统登陆
            </div>
            <Form.Item label="账号" name="username"> 
            <Input placeholder="请输入账号"/>
            </Form.Item>
            <Form.Item label="密码" name="password">
                <Input.Password placeholder="请输入密码"></Input.Password>
            </Form.Item>
            <Form.Item className="login-button">
                <Button type="primary" htmlType="submit">登陆</Button>
            </Form.Item>
        </Form>
    )
}
export default Login;