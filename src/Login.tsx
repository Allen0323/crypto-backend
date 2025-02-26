import React, { useState } from 'react';
import './Login.css'; // 导入样式文件
import { useHistory } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import { Button, Input, Cell, hooks, Toast } from 'react-vant';


const showMessage = Symbol('showMessage')

function Login() {
  const navigate = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, updateState] = hooks.useSetState({
    text: '',
    tel: '',
    digit: '',
    num: '',
    password: '',
  })
  const handleUsernameChange = (e) => {
    console.log(e);
    setUsername(e.text);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.text);
  };

  const handleLogin = () => {
  
    if (username === 'admin' && password === '123456') {
      // 跳转到首页
      navigate.push('/home');
      return;
    }
    // 处理登录逻辑
    Toast.fail('失败文案');

  };
  return (
    <div className='main'>
      <div className="login-page">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="spin-logo" alt="React logo" />
        </a>
        <h2>登录</h2>
        <div className="card">
          <div className='r1'>
            <label htmlFor="username">账户:</label>
          </div>
          <div className='r2'>
            <Cell>
              <Input
                onChange={text => handleUsernameChange({ text })}
                placeholder='account'
                clearable
              />
            </Cell>
          </div>
        </div>
        <div className="card">
          <div className='r1'>
            <label htmlFor="password">密码:</label>
          </div>
          <div className='r2'>
            <Cell>
              <Input
                onChange={text => handlePasswordChange({ text })}
                placeholder='password'
                clearable
              />
            </Cell>
          </div>
        </div>
        <div className='demo-button'>
          <Button onClick={handleLogin} className='sign-in' color='linear-gradient(to right,rgb(52, 154, 255),rgb(238, 10, 173))'>登录</Button>
        </div>
      </div>
    </div>
  )
}

export default Login;

