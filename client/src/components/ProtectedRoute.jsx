import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("fh_user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role check
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard/default" />;
  }

  return children;
}