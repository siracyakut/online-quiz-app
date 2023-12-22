import { useAuth } from "~/store/auth/hooks";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function GuestRoute({ children }) {
  const { email } = useAuth();

  return email.length > 0 ? <Navigate to="/" /> : children;
}

GuestRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
