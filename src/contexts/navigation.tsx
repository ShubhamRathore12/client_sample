import React from "react";


export type NavigationContextValue = {
  callback?: () => void;
  setPrevCallback?: (show: boolean, callback?: () => void) => void;
  prevHref?: string;
  setPrevHref?: React.Dispatch<React.SetStateAction<string>>;
  isCallback?: boolean;
  preventRedirect?: boolean;
  setPreventRedirect?: React.Dispatch<React.SetStateAction<boolean>>;
  prevStage?: string;
  setPrevStage?: React.Dispatch<React.SetStateAction<string>>;
};

export const NavigationContext = React.createContext<NavigationContextValue>({});
export const NavigationProvider = NavigationContext.Provider;
export const NavigationConsumer = NavigationContext.Consumer;
