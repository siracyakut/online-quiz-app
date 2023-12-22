import PropTypes from "prop-types";
import { useAuth } from "~/store/auth/hooks";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { email } = useAuth();

  return email.length > 0 ? children : <Navigate to="/" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
