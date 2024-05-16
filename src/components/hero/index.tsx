import React, { PropsWithChildren } from 'react';


const Hero: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className='flex flex-col w-full mb-10'>{children}</div>;
};

export default Hero;