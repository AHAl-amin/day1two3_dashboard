// components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const PrivetRoute = () => {
    
  const token = localStorage.getItem('access_token');
 
  if (!token) {
    return <Navigate to="/" replace />;
  }
 
//   if (allowedRoles.includes(token)) {
//     return children;
//   }

  
  return <Outlet />;
  
};

export default PrivetRoute;


