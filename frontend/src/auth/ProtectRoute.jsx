import { Navigate } from "react-router-dom";
function ProtectedRoute({ element, path, user }) {
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Route path={path} element={element} />;
}

export default ProtectedRoute;
