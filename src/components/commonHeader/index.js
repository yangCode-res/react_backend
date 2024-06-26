import React from "react"
import { Button, Layout, Avatar, Dropdown } from 'antd';
import './index.css'
import {
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { UseDispatch, useDispatch } from "react-redux";
import {collapseMenu} from "../../store/reducers/tab"
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const CommonHeader = ({collapsed}) => {
    const navigate=useNavigate()
    const logout = () => {
            localStorage.removeItem("token")
            navigate('/login')

    }
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" >
                    个人中心
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={() => logout()}>
                    退出
                </a>
            )
        },
    ];
    //创建dispatch
    const dispatch=useDispatch()
    //点击展开收起按钮
    const setCollapsed=()=>{
        dispatch(collapseMenu())
    }
    return (
        <Header className="header-container" >
            <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={()=>setCollapsed()}
                // onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: "#fff"
                }}
            />
            <Dropdown menu={{items}}>
                <Avatar size={36} src={<img src={require("../../assets/images/user.png")}></img>} />
            </Dropdown>

        </Header>
    )
}
export default CommonHeader
