import { useCallback, useEffect, useState } from "react";

interface UseResendTimerOptions {
  duration?: number; // default = 60 seconds
}

export const useResendTimer = ({
  duration = 60,
}: UseResendTimerOptions = {}) => {
  const [timer, setTimer] = useState(duration);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Start or restart the timer
  const startTimer = useCallback(() => {
    setTimer(duration);
    setIsResendDisabled(true);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

  return {
    timer,
    isResendDisabled,
    startTimer,
    setIsResendDisabled,
  };
};
