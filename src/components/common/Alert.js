import { Alert } from 'react-bootstrap';
import { useAlert } from '../../context/alertContext';

const AlertComponent = () => {
  const { message, type } = useAlert();
  
  if (!message) return null;

  return (
    <Alert variant={type} className="alert-custom">
      {message}
    </Alert>
  );
};

export default AlertComponent;
