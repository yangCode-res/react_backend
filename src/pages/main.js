
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Layout, theme } from 'antd';
import CommonAside from '../components/commonAsid';
import CommonHeader from '../components/commonHeader';
import {useSelector} from 'react-redux'
const { Header, Content } = Layout;

const Main=()=>{
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //获取展开收起的状态
  const collapsed=useSelector(state=>state.tab.isCollapse)
  return (
    <Layout className='main-container '>
      <CommonAside collapsed={collapsed}/>
      <Layout>
       <CommonHeader collapsed={collapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}
export default Main