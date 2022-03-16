import "../App.css";
import React, { useEffect, useState } from "react";

function Loading() {
  const delay = 1000;
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingVisible(false);
    }, delay);
  }, []);

  return loadingVisible ? (
    <div className="Loading">Loading...</div>
  ) : (
    <div></div>
  );
}

export default Loading;
