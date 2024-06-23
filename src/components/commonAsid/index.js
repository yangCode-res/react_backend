import * as Icons from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import MenuConfig from "../../config"
import React from 'react';
const { Header, Sider, Content } = Layout;
//动态获取icon组建
const icon2Element = (name) => React.createElement(Icons[name])
//处理菜单的数据
const items = MenuConfig.map(item => {
  //判断有无子菜单
  const child = {
    key: item.path,
    icon: icon2Element(item.icon),
    label: item.label
  }
  if (item.children) {
    child.children = item.children.map(childItem => {
      return {
        key: childItem.path,
        icon: icon2Element(childItem.icon),
        label: childItem.label
      }
    })
  }
  return child
})

const CommonAside = ({collapsed}) => {
  console.log("collapsed",collapsed);
  return (
    <Sider trigger={null} collapsed={collapsed} >
      <h3 className='app-name'>{!collapsed ? "通用后台管理系统" : "后台" }</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </Sider>
  )
}
export default CommonAside;
