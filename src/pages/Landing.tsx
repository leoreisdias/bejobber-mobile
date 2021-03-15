import React from 'react';
import { Image, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


import logoImg from '../images/Logo.png'
import { useNavigation } from '@react-navigation/native';

const Landing: React.FC = () => {
    const navigation = useNavigation();

    function handleSearchServices() {
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
        backgroundColor: '#0B69D8',
        borderRadius: 10,

        justifyContent: 'center',
        alignItems: 'center',

        elevation: 5
    },

    searchServiceText: {
        fontSize: 30,
        paddingBottom: 2,
        fontFamily: 'Nunito_700Bold',
        color: '#fff'
    },

    signUpButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#4A8FE2',
        borderRadius: 10,

        justifyContent: 'center',
        alignItems: 'center',

        elevation: 5
    },

    signUpText: {
        fontSize: 30,
        paddingBottom: 2,
        fontFamily: 'Nunito_700Bold',
        color: '#fff'
    }
})
