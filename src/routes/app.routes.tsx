import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import BejobberMap from '../pages/BejobberMap'
import Landing from '../pages/Landing';
import BejobberDetail from '../pages/BejobberDetail';
import Header from '../components/Header';
import BejobberData from '../pages/BejobberData';

const { Navigator, Screen } = createStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
      <Screen name="Landing" component={Landing} />
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
  )
}