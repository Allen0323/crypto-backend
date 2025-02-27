import React, { useState, useEffect } from 'react';
import { Table, Card, Button, message } from 'antd';
import axios from 'axios';

const ContractList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const takeProfit = async (id) => {
        console.log(id);
        const url = 'http://127.0.0.1:8282/takeProfit?id=' + id;

        try {
            const response = await axios.post(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("order", response);
        } catch (error) {
            console.error('请求出错:', error);
            message.error('error', error);
        }
    }


    const handleViewDetail = async (record) => {
        try {
            console.log("data", record.key);
            setLoading(true);
            await takeProfit(record.key);
        } catch (err) {
            console.log("error", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8282/queryContractOrder');
            const listData = response.data.data.rows.map((stock) => ({
                key: stock.id,
                name: stock.symbol,
                markPrice: stock.markPrice,
                contractType: stock.contractType,
                profitAmount: stock.profitAmount,
                price: stock.currentPrice, // 随机生成价格
                change: stock.profit, // 随机生成涨跌幅
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
        console.log("queryStart");
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
            title: '币种',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '方向',
            dataIndex: 'contractType',
            key: 'contractType',
            render: (text) => {
                const change = parseFloat(text);
                const color = change == 0 ? 'green' : 'red';
                const textStr = change == 0 ? '开多' : '开空';
                return <span style={{ color }}>{textStr}</span>;
            },
        },
        {
            title: '开仓价格',
            dataIndex: 'markPrice',
            key: 'markPrice',
        },
        {
            title: '当前价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '盈利($)',
            dataIndex: 'profitAmount',
            key: 'profitAmount',
        },
        {
            title: '盈利比',
            dataIndex: 'change',
            key: 'change',
            render: (text) => {
                const change = parseFloat(text);
                const color = change >= 0 ? 'green' : 'red';
                return <span style={{ color }}>{change}%</span>;
            },
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button type="link" onClick={() => handleViewDetail(record)}>
                    止盈
                </Button>
            ),
        }
    ];

    return (
        <Card title="合约实时数据" style={{ width: '100%' }}>
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <div className="scroll-content">
                    <Table
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={false} // 禁用分页
                        size="small"
                    />
                </div>
            </div>
        </Card>
    );
};

export default ContractList;