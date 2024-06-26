import * as Icons from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import MenuConfig from "../../config"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {selectMenuList} from "../../store/reducers/tab"
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
  const navigate=useNavigate()
  const dispatch=useDispatch()
  //添加数据到store
  const settabList=(val)=>{
    dispatch(selectMenuList(val))
  }
  const selectMenu=(e)=>{
    console.log(e);
    let data
    MenuConfig.forEach(item=>{
      if(item.path===e.keyPath[e.keyPath.length -1]){
        data=item
        if(e.keyPath.length>1){
          data=item.children.find(child=>{
            return child.path==e.key
          })
        }
      }
    })
    settabList({
      path:data.path,
      name:data.name,
      label:data.label
      
    })
    navigate(e.key)
  }
  console.log("collapsed",collapsed);
  return (
    <Sider trigger={null} collapsed={collapsed} >
      <h3 className='app-name'>{!collapsed ? "通用后台管理系统" : "后台" }</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        onClick={selectMenu}
      />
    </Sider>
  )
}
export default CommonAside;
