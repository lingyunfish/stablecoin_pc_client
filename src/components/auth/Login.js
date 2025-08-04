import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/alertContext';
import { useAuth } from '../../context/authContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { setAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(username, password);
      setAlert('登录成功', 'success');
      navigate('/');
    } catch (error) {
      setAlert('登录失败，请检查用户名和密码', 'danger');
    }
  };

  return (
    <div className="container-main">
      <Card className="card-custom">
        <Card.Header>
          <h3 className="text-center">用户登录</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>用户名</Form.Label>
              <Form.Control
                type="text"
                placeholder="请输入用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>密码</Form.Label>
              <Form.Control
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100">
              登录
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
