import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator();

import BejobberMap from './pages/BejobberMap'
import Landing from './pages/Landing';
import BejobberDetail from './pages/BejobberDetail';
import Header from './components/Header';
import BejobberData from './pages/BejobberData';
import FirstOnboarding from './pages/Onboarding/FirstOnboarding';
import SecondOnboading from './pages/Onboarding/SecondOnboarding';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen name="Landing" component={Landing} />

                <Screen name="FirstOnboarding" component={FirstOnboarding} />
                <Screen name="SecondOnboarding" component={SecondOnboading} />

                <Screen name="BejobberMap" component={BejobberMap} />

                <Screen name="BejobberDetail" component={BejobberDetail} options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Perfil do Jobber" />
                }} />

                <Screen name="BejobberData" component={BejobberData} options={{
                    headerShown: true,
                    header: () => <Header showCancel={true} title="Cadastre seus Dados" />
                }} />

            </Navigator>
        </NavigationContainer>
    )
}