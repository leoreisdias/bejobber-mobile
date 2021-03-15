import React from 'react';

import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'
import Routes from './src/routes/routes';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AccessProvider } from './src/contexts/AccessContext';

export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })

  if (!fontsLoaded) {
    return null;
  }


  return (
    <NavigationContainer>
      <AccessProvider>
        <StatusBar hidden={true} />
        <Routes />
      </AccessProvider>
    </NavigationContainer>
  )
}

