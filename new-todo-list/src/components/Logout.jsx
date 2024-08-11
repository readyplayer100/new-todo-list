import '../App.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';

const { Paragraph } = Typography;

const Logout = () => {
  const [error, setError] = useState(null);
  const { user_id } = useParams();
  const navigate = useNavigate();
  var loginId = 'guest';

  if (sessionStorage.getItem('userId') != null) {
    loginId = sessionStorage.getItem('userId');
  }


  const handleDelete = async () => {
    setError(null); // Reset errors

    // 从 sessionStorage 删除所有保存的数据
    sessionStorage.clear();
    navigate('/');
  };

  return (
 
      <Card title="LOGOUT" className="card-title" >
        <>
          <Paragraph className="custom-paragraph">User Id: <span className="user-id">{loginId}</span></Paragraph>
          <Paragraph className="custom-paragraph">Do you Want to Logout?</Paragraph>
          <Button type="primary" className="logoutBtn" onClick={handleDelete}>Yes! Logout!</Button>
          {error && <p className="error">{error}</p>}
        </>
      </Card>

  );
};

export default Logout;