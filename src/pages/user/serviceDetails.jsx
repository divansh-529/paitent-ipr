import React from "react";
import { useParams } from "react-router-dom";

export default function UserServiceDetails() {
  const { type } = useParams();

  return (
    <div className="min-h-screen bg-[#F6F9FF] p-6">
      <h1 className="text-2xl font-extrabold text-slate-900">
        Service: {type}
      </h1>
      <p className="mt-2 text-slate-600">
        Waiting for mr varun {type}.
      </p>
    </div>
  );
}
