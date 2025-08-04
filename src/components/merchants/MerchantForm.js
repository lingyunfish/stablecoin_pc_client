import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import merchantsService from '../../api/merchants';
import { useAlert } from '../../context/alertContext';

const MerchantForm = () => {
  const [merchant, setMerchant] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { setAlert } = useAlert();

  useEffect(() => {
    if (id && id !== 'new') {
      const fetchMerchant = async () => {
        try {
          const merchantData = await merchantsService.getMerchantById(id);
          setMerchant({
            name: merchantData.name,
            contactPerson: merchantData.contactPerson,
            phone: merchantData.phone,
            address: merchantData.address
          });
        } catch (error) {
          setAlert('获取商户信息失败', 'danger');
        }
      };
      fetchMerchant();
    }
  }, [id, setAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMerchant(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id === 'new') {
        await merchantsService.createMerchant(merchant);
        setAlert('商户创建成功', 'success');
      } else {
        await merchantsService.updateMerchant(id, merchant);
        setAlert('商户信息更新成功', 'success');
      }
      navigate('/merchants');
    } catch (error) {
      setAlert(`操作失败: ${error.message}`, 'danger');
    }
  };

  return (
    <div className="container-main">
      <Card className="card-custom">
        <Card.Header>
          <h5>{id === 'new' ? '添加新商户' : '编辑商户信息'}</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>商户名称</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={merchant.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>联系人</Form.Label>
              <Form.Control
                type="text"
                name="contactPerson"
                value={merchant.contactPerson}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>联系电话</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={merchant.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>地址</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={merchant.address}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="me-2">
              保存
            </Button>
            <Button variant="secondary" onClick={() => navigate('/merchants')}>
              取消
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MerchantForm;
