import React, { PropsWithChildren } from "react";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 w-full items-center flex p-4">
      {children}
    </div>
  );
};

export default Header;
