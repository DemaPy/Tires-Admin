import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounter] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setMounter(true);
  }, []);

  if (!mounted) return null


  return origin
};
