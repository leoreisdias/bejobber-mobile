import React, { useContext } from 'react';

import { AccessContext } from '../contexts/AccessContext';
import AppRoutes from './app.routes';
import OnboardingRoutes from './onboarding.routes';


export default function Routes() {
    const { isFirstVisit } = useContext(AccessContext)
    console.log(isFirstVisit);

    return !isFirstVisit ? <AppRoutes /> : <OnboardingRoutes />
}