import React, { useState, useEffect } from 'react';
import { Table, Card, Modal, Button } from 'antd';
import axios from 'axios';

const SpotGoodList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // 点击“查看详情”按钮
    const handleViewDetail = async (record) => {
        try {
            console.log("data", record);
            setLoading(true);
            const data = await queryBackTest(record.billCode);
            setSelectedRecord(data.data); // 设置选中的行数据
            setIsModalOpen(true); // 打开 Modal
        } catch (err) {
            console.log("error", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 关闭 Modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const queryBackTest = async (billCode) => {
        const response = await axios.get('http://localhost:8282/getUserOrderDetail?billCode=' + billCode);
        return response.data;
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8282/getAutoSpotList');
            console.log(response);
            const listData = response.data.data.rows.map((item) => ({
                key: item.id,
                userId: item.userId,
                symbol: item.symbol,
                strategyCode: item.strategyCode,
                quantity: item.quantity,
                side: item.side,
                price: item.price,
                billCode: item.billCode,
                status: item.status,
                createTime: item.createTime,
                updateTime: item.updateTime,
            }));
            console.log(listData);
            setData(listData);
        } catch (err) {
            console.log("error", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    //   };

    // 更新数据
    const updateData = () => {
        console.log("queryStrategy");
        fetchData();
    };

    // 定时刷新数据
    useEffect(() => {
        updateData(); // 初始化数据
        const interval = setInterval(updateData, 3000); // 每 3 秒刷新一次
        return () => clearInterval(interval); // 清除定时器
    }, []);

    // 表格列配置
    const columns = [
        {
            title: '用户',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '币种',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: '策略代码',
            dataIndex: 'strategyCode',
            key: 'strategyCode',
        },
        {
            title: '账单号',
            dataIndex: 'billCode',
            key: 'billCode',
        },
        {
            title: '下单价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '下单数量',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: '方向',
            dataIndex: 'side',
            key: 'side',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button type="link" onClick={() => handleViewDetail(record)}>
                    详情
                </Button>
            ),
        }
    ];

    return (
        <div>
            <Card title="现货交易" style={{ width: '100%' }}>
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <div className="scroll-content">
                        <Table
                            columns={columns}
                            dataSource={data}
                            size="small"
                            loading={loading}
                        />
                    </div>
                </div>
            </Card>
            {/* 详情 Modal */}
            <Modal
                title="详情"
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="close" onClick={handleCloseModal}>
                        关闭
                    </Button>,
                ]}
            >
                {selectedRecord && (
                    <div>
                        <p>币对: {selectedRecord.symbol}</p>
                        <p>账单号: {selectedRecord.billCode}</p>
                        <p>交易所账单号: {selectedRecord.serviceBillCode}</p>
                        <p>状态: {selectedRecord.statusStr}</p>
                        <p>方向: {selectedRecord.side}</p>
                    </div>
                )}
            </Modal>
        </div>

    );
};

export default SpotGoodList;