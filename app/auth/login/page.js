// Auth/Login.js
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 引入Next.js的useRouter Hook

const Login = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 用于显示错误信息
  const router = useRouter(); // 初始化Next.js的useRouter Hook

  const handleSubmit = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/token/`, { // 注意这里的URL可能需要和你的后端设置匹配
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // 存储认证信息（JWT令牌）
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      
      // 导航到主页或其他页面
      router.push('/'); // 假设'/home'是你的主页路由
    } else {
      // 显示错误信息
      setErrorMessage(data.detail || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {errorMessage && <p>{errorMessage}</p>} {/* 显示错误信息 */}
    </div>
  );
};

export default Login;
