import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';


import logoImg from '../images/Logo.png'
import { useNavigation } from '@react-navigation/native';

const Landing: React.FC = () => {
    const navigation = useNavigation();
    const [onboardingFlag, setOnboardingFlag] = useState(true)

    useEffect(() => {
        const storeData = async () => {
            try {
                const value = await AsyncStorage.getItem('@storage_key')

                if (value !== null)
                    setOnboardingFlag(false)
                else
                    await AsyncStorage.setItem('@storage_key', "checked")
            } catch (e) {
                // Tratativa
            }
        }

        storeData();

    }, [])

    function handleSearchServices() {
        if (onboardingFlag)
            navigation.navigate('FirstOnboarding')
        else
            navigation.navigate('BejobberMap')
    }

    function handleSignUp() {
        navigation.navigate('BejobberData')
    }

    return (
        <LinearGradient
            colors={['#6C54FF', '#15B89B']} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} locations={[0, 1]} style={styles.container}>
            <Image source={logoImg} style={styles.logoImg} />
            <TouchableOpacity style={styles.searchServiceButton} onPress={handleSearchServices}>
                <Text style={styles.searchServiceText}>Procurar Serviço</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpText}>Cadastrar-se</Text>
            </TouchableOpacity>

        </LinearGradient>
    );
}

export default Landing;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#6C54FF'
    },

    logoImg: {
        marginTop: 100,
        width: 200,
        height: 200,
    },

    searchServiceButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#15C3D6',
        borderRadius: 36,

        justifyContent: 'center',
        alignItems: 'center'
    },

    searchServiceText: {
        fontSize: 20,
        paddingBottom: 2,
        fontFamily: 'Nunito_700Bold',
        color: '#fff'
    },

    signUpButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#C683FB',
        borderRadius: 36,

        justifyContent: 'center',
        alignItems: 'center'
    },

    signUpText: {
        fontSize: 20,
        paddingBottom: 2,
        fontFamily: 'Nunito_700Bold',
        color: '#fff'
    }
})
