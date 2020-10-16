import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

import logoImg from '../images/Logo.png'
import robot from '../../robot.json'
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
        <View style={styles.container}>
            {/* <LottieView resizeMode="contain" autoSize source={robot} autoPlay loop /> */}
            <Image source={logoImg} style={styles.logoImg} />
            <TouchableOpacity style={styles.searchServiceButton} onPress={handleSearchServices}>
                <Text style={styles.searchServiceText}>Procurar Serviço</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpText}>Cadastrar-se</Text>
            </TouchableOpacity>

        </View>
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
