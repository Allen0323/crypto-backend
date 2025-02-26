import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from '@ant-design/icons';

import StockTable from './Table.tsx';
import StrategyList from './compents/StrategyList.tsx';
import './Home.css';
import ContractOrderForm from './compents/ContractOrderForm.tsx';
import StrategyForm from './compents/StrategyForm.tsx';
const { Header, Content, Sider } = Layout;

const App = () => {
    // 显示 Modal
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制 Modal 的显示

    const [isStrategyForm, setIsStrategyForm] = useState(false);

    const [showContent, setShowContent] = useState(true);
    const [showContentLayer2, setShowContentLayer2] = useState(false);
    const [showContentLayer3, setShowContentLayer3] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModalByResult = (result) => {
        setIsModalVisible(result);
    };

    const showStrategyForm = () => {
        setIsStrategyForm(true)
    }

    const showStrategyFormResult = (result) => {
        setIsStrategyForm(result)
    };

    const handleMenuClick = (e) => {
        console.log('点击的菜单项:', e.key);
        if (e.key == '1') {
            setShowContent(true);
            setShowContentLayer2(false);
            setShowContentLayer3(false);
        }
        if (e.key == '2') {
            setShowContent(false);
            setShowContentLayer2(true);
            setShowContentLayer3(false);
        }
        if (e.key == '3') {
            setShowContent(false);
            setShowContentLayer2(false);
            setShowContentLayer3(true);
        }

    };

    return (
        <Layout>
            {/* 左侧边栏 */}
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => console.log('响应式断点:', broken)}
            >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={handleMenuClick}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Contract',
                        },
                        {
                            key: '2',
                            icon: <LaptopOutlined />,
                            label: 'SpotGood',
                        },
                        {
                            key: '3',
                            icon: <NotificationOutlined />,
                            label: 'DataAnlyze',
                        },
                    ]}
                />
            </Sider>

            {/* 右侧内容区域 */}
            <Layout show={showContent}>
                <Header style={{ padding: 0, background: '#fff' }}>Quantitative Trading System</Header>
                {showContent && <Content style={{ margin: '24px 16px' }} >
                    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
                        <div className="btn"> <Button type='primary' className='btnStyle' onClick={showModal}>下单</Button></div>
                        <ContractOrderForm isModalVisibleValue={isModalVisible} showModalByResult={showModalByResult}></ContractOrderForm>
                        <StockTable></StockTable>
                    </div>
                </Content>}
                {showContentLayer2 && <Content style={{ margin: '24px 16px' }} >
                    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
                        <div className="btn"> <Button type='primary' className='btnStyle' onClick={showStrategyForm}>新增</Button></div>
                        <StrategyForm isModalVisibleValue={isStrategyForm} showModalByResult={showStrategyFormResult}></StrategyForm>
                        <StrategyList refresh={isStrategyForm}></StrategyList>
                    </div>
                </Content>}
            </Layout>
        </Layout>
    );
};

export default App;