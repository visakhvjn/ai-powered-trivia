import React from "react";
import { BrainIcon } from "../../assets";

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img className="border border-black rounded-full p-4" src={BrainIcon} />
      <br />
      <div className="flex flex-col">
        <span className="text-shadow-md text-6xl font-bold">
          &nbsp;trivia.ai
        </span>
        <span>Discover Smart, Fun, Endless Knowledge</span>
      </div>
    </div>
  );
};

export default Logo;
