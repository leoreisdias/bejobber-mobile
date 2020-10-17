import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

interface HeaderProp {
    title: string;
    showCancel?: boolean;
}

const Header: React.FC<HeaderProp> = ({ title, showCancel = true }) => {
    const navigation = useNavigation();

    function handleGoBackToAppHomePage() {
        navigation.navigate('Landing')
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15b6d6" />
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>

            {showCancel ? (
                <BorderlessButton onPress={handleGoBackToAppHomePage}>
                    <Feather name="x" size={24} color="#ff669d" />
                </BorderlessButton>
            ) : (
                    <View />
                )
            }
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#964EDE',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#F7F9FC',
        fontSize: 20,
    }
})