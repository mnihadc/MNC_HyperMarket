import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/sign-in');
    }
  }, [currentUser, navigate]);

  return currentUser ? null : null;
}

export default PrivateRoute;
