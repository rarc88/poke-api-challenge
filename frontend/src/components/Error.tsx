import React from "react";

interface Props {
  error: string;
}

export const Error = ({ error }: Props) => {
  return (
    <div className="d-flex justify-content-center my-4 py-4">
      <h3>{error}</h3>
    </div>
  );
};
