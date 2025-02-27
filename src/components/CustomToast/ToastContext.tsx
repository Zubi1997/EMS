import React, {createContext, useContext, useState, ReactNode} from 'react';
import CustomToast from './index';

type ToastType = 'success' | 'error';

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [toastDuration, setToastDuration] = useState(2000);

  const showToast = (
    message: string,
    type: ToastType,
    duration: number = 2000,
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastDuration(duration);
    setToastVisible(true);
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      <CustomToast
        type={toastType}
        message={toastMessage}
        visible={toastVisible}
        onClose={closeToast}
        duration={toastDuration}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
