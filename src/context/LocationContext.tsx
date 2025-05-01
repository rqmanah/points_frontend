import { createContext, ReactNode, useEffect, useState } from "react";

interface LocationContextType {
  location: LocationState;
  getUserLocation: () => void;
}
interface LocationState {
  latitude: number | null;
  longitude: number | null;
  country: string | null;
  error: string | null;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    country: null,
    error: null,
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLocation((prevLocation) => ({
            ...prevLocation,
            latitude,
            longitude,
            error: null,
          }));

          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              const country = data.address?.country || "Unknown";
              setLocation((prevLocation) => ({
                ...prevLocation,
                country,
              }));
            })
            .catch((error) => {
              setLocation((prevLocation) => ({
                ...prevLocation,
                country: null,
                error: "Failed to retrieve country name",
              }));
            });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            country: null,
            error: "User denied Geolocation",
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        country: null,
        error: "Geolocation is not supported by this browser",
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, getUserLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
