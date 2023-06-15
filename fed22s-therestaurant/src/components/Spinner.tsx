import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <ClipLoader
          color={"rgb(0, 183, 255)"}
          loading={loading}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div></div>
      )}
    </>
  );
};
