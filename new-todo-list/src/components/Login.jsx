import '../App.css';
import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';

export const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState('');


  const handleSubmit = (event) => {
    //event.preventDefault();

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
    fetch('http://127.0.0.1:8080/login', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        // check for error response
        if (!response.ok) {
          setError('ERROR!');
          return;
        }

        console.error(data.userId);
        console.error(data.token);
        if (data.userId != null) {
          setUserId(data.userId);
          setToken(data.token);
          sessionStorage.setItem("userId", data.userId);
          sessionStorage.setItem("accessToken", data.token);

          navigate('/todo');
        } else {
          setError('Cannot login, please check your user ID and password!');
        }
      })
      .catch(error => {
        setError('Login failed.');
        console.error('There was an error!', error);
      });

  };

  return (
      <Card title="LOGIN" className="card-login">
          <Form onFinish={handleSubmit}>
            <Form.Item label="USER ID" className='space20'>
              <Input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="USER ID"
                required
                className="LoginUserIDInput"
              />
            </Form.Item>
            <Form.Item label="PASSWORD" className='space20'>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD"
                required
                className="LoginPasswordInput"
              />
            </Form.Item>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <Form.Item>
              <Button className='loginBtn' type="primary" htmlType="submit" >
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </Card>
  );
};

export default Login;
