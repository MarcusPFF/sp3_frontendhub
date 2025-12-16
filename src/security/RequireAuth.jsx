import { Navigate, useLocation } from "react-router";
import { useAuth } from "./Auth";

export default function RequireAuth({ element }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
}