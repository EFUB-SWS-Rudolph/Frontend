import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PrivateRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
    };

    checkAuth();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
