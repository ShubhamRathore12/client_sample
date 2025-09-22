import { useEffect } from 'react';
const useFrameBuster = () => {
  useEffect(() => {
    try {
      // Check if the app is embedded in an iframe
      if (window.self !== window.top) {
        window.top?.location.replace(window.location.href);
      }
    } catch (error) {
      // Handle cross-origin access errors gracefully
      console.error("Frame busting failed:", error);
    }
  }, []);
};
export default useFrameBuster;