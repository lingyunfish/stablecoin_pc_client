import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import transactionsService from '../../api/transactions';
import { useAlert } from '../../context/alertContext';
import { useAuth } from '../../context/authContext';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = user.username; // 假设用户信息结构
        console.log('getTransactionsByUserId:', userId);
        const data = await transactionsService.getTransactionAll();
        setTransactions(data);
      } catch (error) {
        setAlert('获取交易记录失败', 'danger');
      }
    };
    
    fetchTransactions();
  }, [user, setAlert]);

  const formatDateTime = (dateString) => {
    console.log('dateString:', dateString);
    const date = new Date(dateString * 1000);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="container-main">
      <Card className="card-custom">
        <Card.Header>
          <h5>交易记录</h5>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>时间</th>
                <th>交易类型</th>
                <th>金额</th>
                <th>对方账户</th>
                <th>状态</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} onClick={() => navigate(`/transactions/${transaction.id}`)} style={{ cursor: 'pointer' }}>
                  <td>{formatDateTime(transaction.timestamp)}</td>
                  <td>{transaction.type === 'transfer' ? '转账' : '收款'}</td>
                  <td className={transaction.type === 'transfer' ? 'text-danger' : 'text-success'}>
                    {transaction.type === 'transfer' ? '-' : '+'}{transaction.amount} USDT
                  </td>
                  <td>{transaction.counterparty}</td>
                  <td>
                    <span className={`badge ${transaction.status === 'completed' ? 'bg-success' : transaction.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                      {transaction.status === 'completed' ? '已完成' : transaction.status === 'pending' ? '处理中' : '失败'}
                    </span>
                  </td>
                  <td>{transaction.memo || '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TransactionList;
