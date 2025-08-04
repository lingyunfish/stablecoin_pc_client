import { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import merchantsService from '../../api/merchants';
import { useAlert } from '../../context/alertContext';

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);
  const navigate = useNavigate();
  const { setAlert } = useAlert();

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      const data = await merchantsService.getMerchants();
      setMerchants(data);
    } catch (error) {
      setAlert('获取商户列表失败', 'danger');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('确定要删除这个商户吗？')) {
      try {
        await merchantsService.deleteMerchant(id);
        setAlert('商户删除成功', 'success');
        fetchMerchants();
      } catch (error) {
        setAlert('商户删除失败', 'danger');
      }
    }
  };

  return (
    <div className="container-main">
      <Card className="card-custom">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5>商户列表</h5>
          <Button variant="primary" onClick={() => navigate('/merchants/new')}>
            添加商户
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>商户名称</th>
                <th>联系人</th>
                <th>联系方式</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant, index) => (
                <tr key={merchant._id}>
                  <td>{index + 1}</td>
                  <td>{merchant.name}</td>
                  <td>{merchant.contact_person}</td>
                  <td>{merchant.phone}</td>
                  <td>
                    <Button 
                      variant="info" 
                      size="sm" 
                      onClick={() => navigate(`/merchants/${merchant._id}`)}
                      className="me-2"
                    >
                      编辑
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(merchant._id)}
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

export default MerchantList;
