import { createContext, useContext, useReducer } from 'react';

const AlertContext = createContext();

const initialState = {
  message: null,
  type: null
};

function alertReducer(state, action) {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type
      };
    case 'REMOVE_ALERT':
      return {
        ...state,
        message: null,
        type: null
      };
    default:
      return state;
  }
}

function AlertProvider({ children }) {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (message, type) => {
    dispatch({ type: 'SET_ALERT', payload: { message, type } });
    
    // 3秒后移除提醒
    setTimeout(() => {
      dispatch({ type: 'REMOVE_ALERT' });
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        ...state,
        setAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}

export { AlertProvider, useAlert };
