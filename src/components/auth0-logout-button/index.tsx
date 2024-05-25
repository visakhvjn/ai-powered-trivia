/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

type Auth0LogoutButtonProps = {
  onLogout: () => void;
};

const Auth0LogoutButton: React.FC<Auth0LogoutButtonProps> = ({ onLogout }) => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      onLogout();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <button
        disabled={!isAuthenticated}
        onClick={handleLogout}
        className="px-4 bg-white text-black border border-black py-1 hover:bg-black hover:text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Auth0LogoutButton;
