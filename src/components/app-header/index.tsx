import React from "react";
import Header from "../header";
import { BrainIcon } from "../../assets";
import Auth0LogoutButton from "../auth0-logout-button";
import { useNavigate } from "react-router-dom";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Header>
      <div className="flex justify-between w-full">
        <div className="flex space-x-2 items-center justify-center">
          <img
            onClick={() => navigate("/categories")}
            className="border border-black rounded-full p-1 h-10 cursor-pointer"
            src={BrainIcon}
          />
          <div className="flex flex-col text-left">
            <span className="text-shadow-md font-bold">trivia.ai</span>
            <span className="text-xs">Endless Knowledge</span>
          </div>
        </div>
        <div>
          <Auth0LogoutButton onLogout={onLogout} />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
