
import PropTypes from "prop-types";
import { createContext, FC, useEffect, useState } from "react";
import React from "react";

interface UserLocation {
  latitude: number | null;
  longitude: number | null;
}

export interface UserLocationContextValue {
  location: UserLocation;
  saveLocation: (latitude: number, longitude: number) => void;
}

interface UserLocationProviderProps {
  children?: React.ReactNode;
}

const initialLocation: UserLocation = {
  latitude: null,
  longitude: null,
};

// Function to restore location from local storage
export const restoreLocation = (): UserLocation => {
  try {
    const storedData = window.localStorage.getItem("userLocation");
    return storedData ? JSON.parse(storedData) : initialLocation;
  } catch (err) {
    console.error(err);
    return initialLocation;
  }
};

// Function to store location in local storage
export const storeLocation = (location: UserLocation): void => {
  window.localStorage.setItem("userLocation", JSON.stringify(location));
};

export const UserLocationContext = createContext<UserLocationContextValue>({
  location: initialLocation,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  saveLocation: () => {},
});

export const UserLocationProvider: FC<UserLocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<UserLocation>(initialLocation);

  useEffect(() => {
    const restoredLocation = restoreLocation();
    setLocation(restoredLocation);
  }, []);

  const saveLocation = (latitude: number, longitude: number): void => {
    const newLocation = { latitude, longitude };
    setLocation(newLocation);
    storeLocation(newLocation);
  };

  return (
    <UserLocationContext.Provider value={{ location, saveLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};

UserLocationProvider.propTypes = {
  children: PropTypes.node,
};
