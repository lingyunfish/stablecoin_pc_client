import { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import usersService from '../../api/users';
import { useAlert } from '../../context/alertContext';

const UserList = () => {
  console.log('UserList 组件加载了'); 
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { setAlert } = useAlert();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await usersService.getUsers();
      setUsers(data);
    } catch (error) {
      setAlert('获取用户列表失败', 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      try {
        await usersService.deleteUser(id);
        setAlert('用户删除成功', 'success');
        fetchUsers();
      } catch (error) {
        setAlert('用户删除失败', 'danger');
      }
    }
  };

  return (
    <div className="container-main">
      <Card className="card-custom">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5>用户列表</h5>
          <Button variant="primary" onClick={() => navigate('/users/new')}>
            添加用户
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>角色</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button 
                      variant="info" 
                      size="sm" 
                      onClick={() => navigate(`/users/${user._id}`)}
                      className="me-2"
                    >
                      编辑
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(user._id)}
                    >
                      删除
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserList;
