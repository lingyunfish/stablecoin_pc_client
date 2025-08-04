import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import stablecoinService from '../../api/stablecoin';
import { useAlert } from '../../context/alertContext';

const Transfer = () => {
  const [transferData, setTransferData] = useState({
    from: '',
    to: '',
    amount: '',
    memo: ''
  });
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { setAlert } = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!transferData.from|| !transferData.to || !transferData.amount) {
      setAlert('请填写所有必填字段', 'warning');
      return;
    }
    
    if (parseFloat(transferData.amount) <= 0) {
      setAlert('转账金额必须大于0', 'warning');
      return;
    }
    
    try {
      await stablecoinService.transfer(transferData);
      setSuccess(true);
      setAlert('转账成功', 'success');
      setTransferData({
        from: '',
        to: '',
        amount: '',
        memo: ''
      });
    } catch (error) {
      setSuccess(false);
      setAlert('转账失败', 'danger');
    }
  };

  return (
    <div className="container-main">
      <Card className="card-custom">
        <Card.Header>
          <h5>稳定币转账</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>转出用户ID</Form.Label>
              <Form.Control
                type="text"
                name="from"
                placeholder="请输入转出用户ID"
                value={transferData.from}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>转入用户ID</Form.Label>
              <Form.Control
                type="text"
                name="to"
                placeholder="请输入转入用户ID"
                value={transferData.to}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>转账金额</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="请输入转账金额"
                value={transferData.amount}
                onChange={handleChange}
                required
                min="0.01"
                step="0.01"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>备注信息（可选）</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="memo"
                placeholder="请输入备注信息"
                value={transferData.memo}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              确认转账
            </Button>
          </Form>
          
          {success === true && (
            <Alert variant="success" className="mt-4">
              <h4 className="alert-heading">转账成功</h4>
              <hr />
              <p className="mb-0">已成功将 <strong>{transferData.amount}</strong> USDT 从用户 <strong>{transferData.from}</strong> 转账至用户 <strong>{transferData.to}</strong></p>
            </Alert>
          )}
          
          {success === false && (
            <Alert variant="danger" className="mt-4">
              <h4 className="alert-heading">转账失败</h4>
              <hr />
              <p className="mb-0">转账操作未能完成，请检查用户信息和余额后重试</p>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Transfer;
