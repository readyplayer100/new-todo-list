import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Form } from 'antd';

const { Item } = Form;
export const Register = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    //event.preventDefault();

    // 用户ID（电话号码）正则表达式验证
    const userIdRegex = /^1\d{10}$/;
    // 检查用户ID是否为合法电话号码
    if (!userId.match(userIdRegex)) {
      console.error("User ID must be a valid 11-digit phone number starting with 1.");
      setError("User ID must be a valid 11-digit phone number starting with 1.");
      return;
    }

    // 密码正则表达式验证，至少8个字符，包括一个大写字母、一个小写字母、一个数字和一个特殊字符
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      console.error("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
      setError("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    // 确认密码是否一致
    if (password !== password_confirmation) {
      console.error("Password doesn't match.");
      setError("Password doesn't match.");
      return;
    }


    const user = {
      userId: userId,
      password: password
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(user)
    };

    console.error(requestOptions);
    fetch('http://127.0.0.1:8080/register', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
          setError('ERROR!');
          return;
        }
        console.log(data);
        if (data.userId != null) {
          navigate('/');
        } else {
          setError('Cannot register, user ID already existed! ');
        }
      })
      .catch(error => {
        setError('Registration failed.');
        console.error('There was an error!', error);
      });

  };


  return (

    <Card title="New User Register" className="RegisterCard">
      <Form onFinish={handleSubmit} className="Form">
        <Item label="USER ID" className='space10' name="userId">
          <Input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </Item>
        <Item label="PASSWORD" className='space10' name="password">
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Item>
        <Item label="CONFIRM PASSWORD" className='space10' name="password_confirmation">
          <Input type="password" placeholder="Confirm your password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </Item>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Item>
          <Button className='registerBtn' type="primary" htmlType="submit">SignUp</Button>
        </Item>
      </Form>
    </Card>
  );
};

export default Register;