import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import stablecoinService from '../../api/stablecoin';
import { useAlert } from '../../context/alertContext';

const Balance = () => {
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState(null);
  const { setAlert } = useAlert();

  const handleCheckBalance = async () => {
    if (!userId) {
      setAlert('请输入用户ID', 'warning');
      return;
    }
    
    try {
      const data = await stablecoinService.getBalance(userId);
      setBalance(data);
      setAlert('余额查询成功', 'success');
    } catch (error) {
      setBalance(null);
      setAlert('余额查询失败', 'danger');
    }
  };

  return (
    <div className="container-main">
      <Card className="card-custom">
        <Card.Header>
          <h5>余额查询</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>用户ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="请输入要查询的用户ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>
            
            <Button variant="primary" onClick={handleCheckBalance}>
              查询余额
            </Button>
          </Form>
          
          {balance !== null && (
            <Alert variant="success" className="mt-4">
              <h4 className="alert-heading">当前余额</h4>
              <hr />
              <p className="mb-0">用户 <strong>{userId}</strong> 的稳定币余额为：<strong>{balance}</strong> USDT</p>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Balance;
