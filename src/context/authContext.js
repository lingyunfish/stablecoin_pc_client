import { createContext, useContext, useReducer } from 'react';
import { getCurrentUser, login, logout } from '../api/auth';

const AuthContext = createContext();

const initialState = {
  user: getCurrentUser(),
  isAuthenticated: false,
  isLoading: true,
  error: null
};

if (initialState.user) {
  initialState.isAuthenticated = true;
  initialState.isLoading = false;
} else {
  initialState.user = null;
  initialState.isLoading = false;
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        error: null
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    try {
      // 这里通常会有一个API调用来验证token的有效性
      const user = getCurrentUser();
      console.log('获取当前用户:', user);
      if (user) {
        dispatch({ type: 'USER_LOADED', payload: user });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: 'No user found' });
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
    }
  };

  const loginAndSetUser = async (username, password) => {
    try {
      const userData = await login(username, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      return userData;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.message });
      throw error;
    }
  };

  const logoutAndClear = async () => {
    await logout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: loginAndSetUser,
        logout: logoutAndClear,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
