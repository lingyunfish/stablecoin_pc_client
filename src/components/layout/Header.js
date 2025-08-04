import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log('当前 user:', user);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Navbar className="navbar-custom navbar-expand-lg fixed-top">
      <Container>
        <Navbar.Brand href="/" className="text-white">客户端</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link href="/users" className="text-white">用户管理</Nav.Link>
                <Nav.Link href="/merchants" className="text-white">商户管理</Nav.Link>
                <Nav.Link href="/balance" className="text-white">余额查询</Nav.Link>
                <Nav.Link href="/transfer" className="text-white">转账</Nav.Link>
                <Nav.Link href="/transactions" className="text-white">交易记录</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user && (
              <Nav.Link onClick={handleLogout} className="text-white">注销</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
