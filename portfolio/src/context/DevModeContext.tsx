"use client";

import React, { createContext, useContext, useState } from "react";

interface Credentials {
  username: string;
  password: string;
}

interface DevModeContextValue {
  isDev: boolean;
  credentials?: Credentials;
  enableDev: (creds: Credentials) => void;
  disableDev: () => void;
}

const DevModeContext = createContext<DevModeContextValue | undefined>(
  undefined
);

export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDev, setIsDev] = useState(false);
  const [credentials, setCredentials] = useState<Credentials | undefined>();

  const enableDev = (creds: Credentials) => {
    setIsDev(true);
    setCredentials(creds);
  };

  const disableDev = () => {
    setIsDev(false);
    setCredentials(undefined);
  };

  return (
    <DevModeContext.Provider
      value={{ isDev, credentials, enableDev, disableDev }}
    >
      {children}
    </DevModeContext.Provider>
  );
};

export function useDevMode() {
  const ctx = useContext(DevModeContext);
  if (!ctx) throw new Error("useDevMode must be used within DevModeProvider");
  return ctx;
}
