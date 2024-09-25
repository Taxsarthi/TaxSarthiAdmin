import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center mt-60">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
        <p className="mt-4 text-lg text-slate-900 font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
