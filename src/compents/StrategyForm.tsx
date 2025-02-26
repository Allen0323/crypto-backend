
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Radio, InputNumber, Button, message } from 'antd';
import axios from 'axios';
const { Option } = Select;

const StrategyForm = ({ isModalVisibleValue, showModalByResult }) => {
    const [form] = Form.useForm();
    const [selectedValue, setSelectedValue] = useState(null);
    const [options, setOptions] = useState([]); // 存储接口返回的数据
    const [loading, setLoading] = useState(false); // 加载状态
    const [value, setValue] = useState(null); // 存储选中的值

    const handleChangeRadio = (e) => {
        setValue(e.target.value); // 更新选中的值
        console.log('Selected:', e.target.value);
    };

    // 模拟接口调用
    const fetchData = async () => {
        setLoading(true);
        try {
            // 模拟异步请求
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        { value: 'BTCUSDT', label: 'BTCUSDT' },
                        { value: 'ETHUSDT', label: 'ETHUSDT' },
                        { value: 'SOLUSDT', label: 'SOLUSDT' },
                    ]);
                }, 1000);
            });
            setOptions(response); // 将接口数据存储到状态中
        } catch (error) {
            console.error('接口请求失败:', error);
        } finally {
            setLoading(false);
        }
    };

    // 组件挂载时调用接口
    useEffect(() => {
        fetchData();
    }, []);
    const handleChange = (value) => {
        setSelectedValue(value);
        console.log('Selected:', value);
    };

    // 隐藏 Modal
    const handleCancel = () => {
        console.log("cancle");
        showModalByResult(false);
        form.resetFields(); // 重置表单
    };

    const doOrder = async (value) => {
        const url = 'http://127.0.0.1:8282/configStrategy';
        const data = {
            "symbol": value.symbol,
            "strategyCode": value.strategyCode,
            "dayAutoBuyLimit": value.dayAutoBuyLimit,
            "dayAutoSellLimit": value.dayAutoSellLimit,
            "autoBuyLimit": value.autoBuyLimit,
            "autoSellLimit": value.autoSellLimit,
            "shortEma": value.shortEma,
            "longSma": value.longSma,
            "shortMacd": 12,
            "longMacd": 26,
            "emaMacd": 9,
            "interVal": value.interVal
        }

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("order", response);
            if (response.data.code == 0) {
                showModalByResult(false);
                form.resetFields(); // 重置表单
                fetchData();
            } else {
                message.error('下单失败');
            }
        } catch (error) {
            console.error('请求出错:', error);
            message.error('error',error);
        }
    };


    // 表单提交
    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                console.log('表单数据:', values);
                doOrder(values);
            })
            .catch((error) => {
                console.error('表单验证失败:', error);
            });
    };


    return (
        <Modal
            title="新增策略"
            visible={isModalVisibleValue}
            onOk={handleSubmit}
            onCancel={handleCancel}
            footer={[
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    确定
                </Button>,
            ]}
        >
            {/* 表单 */}
            <Form form={form} layout="vertical">
                <Form.Item
                    name="symbol"
                    label="币种"
                    rules={[{ required: true, message: '请选择币种' }]}
                >
                    <Select
                        placeholder="请选择"
                        style={{ width: 200 }}
                        onChange={handleChange}
                        value={selectedValue}
                        loading={loading} // 显示加载状态
                    >
                        {options.map((item) => (
                            <Option key={item.value} value={item.value}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="strategyCode"
                    label="策略"
                    rules={[
                        { required: true, message: '请选择' },
                    ]}
                >
                    <Radio.Group onChange={handleChangeRadio} value={value}>
                        <Radio value="4">T4bj</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="dayAutoBuyLimit"
                    label="dayAutoBuyLimit"
                    rules={[
                        { required: true, message: '请输入数字' },
                        { pattern: /^[0-9]+$/, message: '只能输入数字' },
                    ]}
                >
                    <Input placeholder="请输dayAutoBuyLimit" />
                </Form.Item>
                <Form.Item
                    name="dayAutoSellLimit"
                    label="dayAutoSellLimit"
                    rules={[
                        { required: true, message: '请输入数字' },
                        { pattern: /^[0-9]+$/, message: '只能输入数字' },
                    ]}
                >
                    <Input placeholder="请输dayAutoSellLimit" />
                </Form.Item>
                <Form.Item
                    name="autoBuyLimit"
                    label="autoBuyLimit"
                    rules={[
                        { required: true, message: '请输入数字' },
                        { pattern: /^[0-9]+$/, message: '只能输入数字' },
                    ]}
                >
                    <Input placeholder="请输autoBuyLimit" />
                </Form.Item>
                <Form.Item
                    name="autoSellLimit"
                    label="autoSellLimit"
                    rules={[
                        { required: true, message: '请输入数字' },
                        { pattern: /^[0-9]+$/, message: '只能输入数字' },
                    ]}
                >
                    <Input placeholder="请输autoSellLimit" />
                </Form.Item>
                <Form.Item
                    name="shortEma"
                    label="shortEma"
                    rules={[
                        { required: true, message: '请输入数字' },
                        { pattern: /^[0-9]+$/, message: '只能输入数字' },
                    ]}
                >
                    <Input placeholder="请输ShortEma" />
                </Form.Item>
                <Form.Item
                    name="longSma"
                    label="longSma"
                    rules={[
                        { required: true, message: '请输入数字' },
                        { pattern: /^[0-9]+$/, message: '只能输入数字' },
                    ]}
                >
                    <Input placeholder="请输longSma" />
                </Form.Item>
                <Form.Item
                    name="interVal"
                    label="interVal"
                    rules={[
                        { required: true, message: '请输入' },
                    ]}
                >
                    <Input placeholder="interVal" />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default StrategyForm;
