import React, { useEffect } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Tag, Space } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {closeTab,setCurrentMenu} from "../../store/reducers/tab"
import { useLocation } from 'react-router-dom';

import './index.css'
const CommonTag = () => {
    const navigate=useNavigate()
    const disptch=useDispatch()
    const tabList=useSelector(state=>state.tab.tabList)
    const currentMenu=useSelector(state=>state.tab.currentMenu)
    const action=useLocation()
    console.log(tabList,"tablist");
    console.log(currentMenu,"current");
    const handleClose=(tag,index)=>{
        let length=tabList.length-1
        console.log(tabList);
        disptch(closeTab(tag))
        //关闭的是当前的tag
       if(tag.path !== action.path){
        return
       }
       if(index===length){
        const curData=tabList[index-1]
        disptch(setCurrentMenu(curData))
        navigate(curData.path)
       }else{
        if(tabList.length>1){
            const nextData=tabList[index+1]
            disptch(setCurrentMenu(nextData))
            navigate(nextData.path)
        }
       }

    }
    const handleChange=(item)=>{
        disptch(setCurrentMenu(item))
        console.log(item);
        navigate(item.path)
    }
    const setTag=(flag,item,index)=>{
        return(
            flag ?
            <Tag color='#55acee' closeIcon  key={item.name} onClose={()=>{handleClose(item,index)}}>
                {item.label}
            </Tag>:
            <Tag key={item.name} onClick={()=>{handleChange(item)}}>{item.label}</Tag>
        )
    }
    useEffect(()=>{
        
    },[currentMenu])
    return (
        <Space className='common-tag' size={[0, 8]} wrap>
            {/* <Tag>首页</Tag>
            <Tag color='#55acee' closeIcon onClose={()=>{handleClose()}}>
                用户
            </Tag> */}
            {
                currentMenu.name && tabList.map((item,index)=>(setTag(item.path===currentMenu.path,item,index)))
            }
        </Space>
    )
}
export default CommonTag