import React, { useEffect } from "react";

const DownloadUploadedBankData: React.FC = () => {

  useEffect(() => {
    console.log("SamplePage loaded");
  }, []);

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div className="container mt-4">
      <h2>Sample Page</h2>

      <p>This is a blank TypeScript (TSX) page setup.</p>

      <button className="btn btn-primary" onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};

export default DownloadUploadedBankData;
