import React, { useEffect } from "react";
import { Auth0LoginButton, Logo } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const onLogin = () => {
    navigate("/categories");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/categories");
    }
  }, []);

  return (
    <div className="border justify-center items-center p-20 space-y-10 shadow-md">
      <Logo />
      <Auth0LoginButton onLogin={onLogin} />
    </div>
  );
};

export default Login;
