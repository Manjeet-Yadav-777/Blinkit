import React from "react";

const CardLoading = () => {
  return (
    <div className="shadow p-2 bg-white min-w-40 lg:w-52 grid gap-2">
      <div className="min-h-20 bg-blue-50"></div>
      <div className="bg-blue-50 h-5 w-24"></div>
      <div className="bg-blue-50 h-5"></div>{" "}
      <div className="bg-blue-50 h-5"></div>
      <div className="grid grid-cols-2 h-5 gap-3">
        <div className="bg-blue-50 h-5"></div>
        <div className="bg-blue-50 h-5"></div>
      </div>
    </div>
  );
};

export default CardLoading;
