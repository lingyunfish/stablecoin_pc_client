import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import usersService from '../../api/users';
import { useAlert } from '../../context/alertContext';

const UserForm = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { setAlert } = useAlert();

  useEffect(() => {
    if (id && id !== 'new') {
      const fetchUser = async () => {
        try {
          const userData = await usersService.getUserById(id);
          setUser({
            username: userData.username,
            email: userData.email,
            password: '',
            role: userData.role || 'user'
          });
        } catch (error) {
          setAlert('获取用户信息失败', 'danger');
        }
      };
      fetchUser();
    }
  }, [id, setAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id === 'new') {
        await usersService.createUser(user);
        setAlert('用户创建成功', 'success');
      } else {
        await usersService.updateUser(id, user);
        setAlert('用户信息更新成功', 'success');
      }
      navigate('/users');
    } catch (error) {
      setAlert(`操作失败: ${error.message}`, 'danger');
    }
  };

  return (
    <div className="container-main">
      <Card className="card-custom">
        <Card.Header>
          <h5>{id === 'new' ? '添加新用户' : '编辑用户信息'}</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>用户名</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>邮箱地址</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>密码</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder={id === 'new' ? '请输入密码' : '留空则不修改密码'}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>角色</Form.Label>
              <Form.Select
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <option value="user">普通用户</option>
                <option value="merchant">商户</option>
                <option value="admin">管理员</option>
              </Form.Select>
            </Form.Group>
            
            <Button variant="primary" type="submit" className="me-2">
              保存
            </Button>
            <Button variant="secondary" onClick={() => navigate('/users')}>
              取消
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserForm;
