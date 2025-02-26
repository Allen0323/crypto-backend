import React, { useState, useEffect } from 'react';
import { Table, Card } from 'antd';
import axios from 'axios';

const StrategyList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8282/getStrategy');
            console.log(response);
            const listData = response.data.data.rows.map((item) => ({
                key: item.id,
                userId: item.userId,
                symbol: item.symbol,
                strategyCode: item.strategyCode,
                interVal: item.interVal,
                dayAutoBuyLimit: item.dayAutoBuyLimit,
                dayAutoSellLimit: item.dayAutoSellLimit,
                autoBuyLimit: item.autoBuyLimit,
                autoSellLimit: item.autoSellLimit,
                shortEma: item.shortEma,
                longSma: item.longSma,
                shortMacd: item.shortMacd,
                longMacd: item.longMacd,
                emaMacd: item.emaMacd,
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
            title: '间隔',
            dataIndex: 'interVal',
            key: 'interVal',
        },
        {
            title: '日内买入',
            dataIndex: 'dayAutoBuyLimit',
            key: 'dayAutoBuyLimit',
        },
        {
            title: '日内卖出',
            dataIndex: 'dayAutoSellLimit',
            key: 'dayAutoSellLimit',
        },
        {
            title: '买入',
            dataIndex: 'autoBuyLimit',
            key: 'autoBuyLimit',
        },
        {
            title: '卖出',
            dataIndex: 'autoSellLimit',
            key: 'autoSellLimit',
        },
        {
            title: 'shortEma',
            dataIndex: 'shortEma',
            key: 'shortEma',
        },
        {
            title: 'longSma',
            dataIndex: 'longSma',
            key: 'longSma',
        },
    ];

    return (
        <Card title="策略管理" style={{ width: '100%' }}>
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <div className="scroll-content">
                    <Table
                        columns={columns}
                        dataSource={data}
                        size="small"
                    />
                </div>
            </div>
        </Card>
    );
};

export default StrategyList;