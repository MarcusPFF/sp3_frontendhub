import { Navigate, useLocation } from "react-router";
import { useAuth } from "./Auth";
import facade from "../apiFacade";

export default function RequireAdmin({ element }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!facade.hasUserAccess("admin", isLoggedIn)) {
    return <Navigate to="/" replace />;
  }

  return element;
}