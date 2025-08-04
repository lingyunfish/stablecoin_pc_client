import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AlertComponent from './components/common/Alert';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/layout/Header';
import MerchantForm from './components/merchants/MerchantForm';
import MerchantList from './components/merchants/MerchantList';
import Balance from './components/stablecoin/Balance';
import Transfer from './components/stablecoin/Transfer';
import TransactionList from './components/transactions/TransactionList';
import UserForm from './components/users/UserForm';
import UserList from './components/users/UserList';
import { AlertProvider } from './context/alertContext';
import { AuthProvider } from './context/authContext';

function AppContent() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<PrivateRoute />}>
            {/* <Route path="/users" element={<UserList />} /> */}
            {/* <Route path="/users/:id" element={<UserForm />} />
            <Route path="/users/new" element={<UserForm />} /> */}
            
            {/* <Route path="/merchants" element={<MerchantList />} />
            <Route path="/merchants/:id" element={<MerchantForm />} />
            <Route path="/merchants/new" element={<MerchantForm />} /> */}
            
            {/* <Route path="/balance" element={<Balance />} />
            <Route path="/transfer" element={<Transfer />} />
            
            <Route path="/transactions" element={<TransactionList />} /> */}

            {/* <Route index element={<Balance />} /> */}
          </Route>
          <Route path="/transactions" element={<PrivateRoute><TransactionList /></PrivateRoute>} />
          <Route path="/balance" element={<PrivateRoute><Balance /></PrivateRoute>} />
          <Route path="/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
          <Route path="/merchants" element={<PrivateRoute><MerchantList /></PrivateRoute>} />
          <Route path="/merchants/:id" element={<PrivateRoute><MerchantForm /></PrivateRoute>} />
          <Route path="/merchants/new" element={<PrivateRoute><MerchantForm /></PrivateRoute>} />
          <Route path="/users/new" element={<PrivateRoute><UserForm /></PrivateRoute>} />
          <Route path="/users/:id" element={<PrivateRoute><UserForm /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Balance /></PrivateRoute>} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <AppContent />
          <AlertComponent />
        </Router>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
