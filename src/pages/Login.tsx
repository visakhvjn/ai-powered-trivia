import React, { useEffect } from "react";
import { Auth0LoginButton } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BrainIcon } from "../assets/index";

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
    <div className="flex flex-col justify-center items-center">
      <img className="border border-black rounded-full p-4" src={BrainIcon} />
      <div className="flex flex-col mb-10">
        <span className="text-shadow-md text-6xl font-bold">
          &nbsp;trivia.ai
        </span>
        <span>Discover Smart, Fun & Endless Knowledge</span>
      </div>
      <Auth0LoginButton onLogin={onLogin} />
    </div>
  );
};

export default Login;
