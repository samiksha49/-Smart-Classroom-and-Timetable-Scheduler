import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const RoleProtectedRoute = ({
  roles,
  children,
}) => {
  const role = useAuthStore(
    (state) => state.auth?.role
  );

  if (!roles.includes(role)) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};

export default RoleProtectedRoute;