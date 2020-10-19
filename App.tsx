import React, { useState } from 'react';

import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'
import Routes from './src/routes';
import { StatusBar } from 'react-native';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })

  if (!fontsLoaded) {
    return null;
  }


  return (<>
    <StatusBar hidden={true} />
    <Routes />
  </>
  )
}

