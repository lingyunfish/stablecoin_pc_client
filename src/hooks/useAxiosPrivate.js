import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../context/authContext';

const useAxiosPrivate = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [user]);

  return axios;
};

export default useAxiosPrivate;
