import { Route, Navigate } from 'react-router-dom';

export  const PrivateRoute = ({ element, ...props }) => {
  // Utilisez le contexte ou le state local pour vérifier l'authentification
  const [jwt] = useContext(AuthContext);

  return (
    <Route
      {...props}
      element={jwt ? element : <Navigate to="/auth/sign" replace />}
    />
  );
};
export default PrivateRoute