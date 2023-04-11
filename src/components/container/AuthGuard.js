import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/context/AuthContext';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isFetchingUserData, userData } = useContext(AuthContext);

  useEffect(() => {
    if (isFetchingUserData) return;
    if (!userData?.id) navigate('/auth/login');
  }, [window.location.href, isAuthenticated, isFetchingUserData]);

  return !isFetchingUserData && userData?.id ? children : null;
};

export default AuthGuard;
