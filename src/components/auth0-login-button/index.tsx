/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

type Auth0LoginButtonProps = {
  onLogin: () => void;
};

const Auth0LoginButton: React.FC<Auth0LoginButtonProps> = ({ onLogin }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  useEffect(() => {
    if (isAuthenticated) {
      onLogin();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <button disabled={isAuthenticated} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Auth0LoginButton;
