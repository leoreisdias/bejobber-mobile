import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';


interface AccessProviderProps {
  children: ReactNode;
}

interface AccessContextProps {
  isFirstVisit: Boolean;
  handleFirstVisit: () => void;
}

export const AccessContext = createContext({} as AccessContextProps)

export const AccessProvider = ({ children }: AccessProviderProps) => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const checkVisit = async () => {
      const value = await AsyncStorage.getItem('@storage_key')

      if (value)
        setIsFirstVisit(false)
    }

    checkVisit();

  }, [])

  async function handleFirstVisit() {
    setIsFirstVisit(false);
    await AsyncStorage.setItem('@storage_key', JSON.stringify(true));
  }

  return (
    <AccessContext.Provider
      value={{
        isFirstVisit,
        handleFirstVisit
      }}
    >
      {children}
    </AccessContext.Provider>
  )
}