import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import FirstOnboarding from '../pages/Onboarding/FirstOnboarding';
import SecondOnboading from '../pages/Onboarding/SecondOnboarding';

const { Navigator, Screen } = createStackNavigator();

export default function OnboardingRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
      <Screen name="FirstOnboarding" component={FirstOnboarding} />
      <Screen name="SecondOnboarding" component={SecondOnboading} />
    </Navigator>
  )
}