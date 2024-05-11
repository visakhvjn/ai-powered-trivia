import React from "react";

const Loader: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full mt-20 p-20">
        <div className="w-12 h-12 border-t-4 border-secondary dark:border-primary rounded-full animate-spin"></div>
        <p className="text-secondary dark:text-primary font-semibold mt-10">
          Getting the Next Question
        </p>
      </div>
    </>
  );
};

export default Loader;
