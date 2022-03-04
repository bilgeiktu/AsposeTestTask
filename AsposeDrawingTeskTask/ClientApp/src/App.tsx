import React, {FC} from 'react';
import Home from "./pages/Home";
import Canvas from "./components/Canvas";
import { Layout, Menu, Breadcrumb } from 'antd';


const { Header, Content, Footer } = Layout;

const App:FC = () => {
    return (
            <Layout style={{height:"100vh"}}>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}/>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, height:"100%" }}>
                        <Home/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2022 Created by Bilge Demirsoy</Footer>
            </Layout>
    );
};

export default App;