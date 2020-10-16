import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator();

import BejobberMap from './pages/BejobberMap'
import OrphanageDetails from './pages/OrphanageDetails';
import Landing from './pages/Landing';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="BejobberMap" component={BejobberMap} />
                <Screen name="OrphanageDetails" component={OrphanageDetails} />
            </Navigator>
        </NavigationContainer>
    )
}