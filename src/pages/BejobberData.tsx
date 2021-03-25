import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';


export default function BejobberData() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [psswd, setPsswd] = useState('');
    const [confirmPsswd, setConfirmPsswd] = useState('');
    const [address, setAddress] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [services, setServices] = useState('');
    const [working_hours, setWorkingHours] = useState('');
    const [work_on_weekends, setWorkOnWeekends] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [extImage, setExtImage] = useState<string[]>([]);

    async function handleSelectImages() {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

        if (status !== 'granted') {
            alert('Ops, precisamos acessas suas fotos para ilustrar seu serviço :(');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });

        if (result.cancelled)
            return;

        const { uri: image } = result;
        const imageArray = image.split('.');

        setExtImage([...extImage, imageArray[imageArray.length - 1]])

        setImages([...images, image]);
    }

    function handleExcludeImage(imageIndex: number) {
        const arrayExtImage = extImage.filter((value, index) => {
            return index !== imageIndex
        });

        const arrayImages = images.filter((value, index) => {
            return index !== imageIndex
        });

        setImages(arrayImages);
        setExtImage(arrayExtImage);
    }

    async function handleCreateJobber() {
        if (!loading)
            setLoading(true);

        if (confirmPsswd !== psswd) {
            alert('A confirmação de senha não é igual a senha digita, por favor, digite ambas novamente');
            setLoading(false);
            return;
        }

        if (psswd.length < 6) {
            alert('Senha deve possuir no mínimo 6 caracteres');
            setLoading(false);
            return;
        }

        const data = new FormData();

        data.append('name', name);
        data.append('cpf', cpf);
        data.append('phone', phone);
        data.append('bio', bio);
        data.append('email', email);
        data.append('psswd', psswd);
        data.append('address', address);
        data.append('houseNumber', houseNumber);
        data.append('city', city);
        data.append('state', state);
        data.append('services', services);
        data.append('working_hours', working_hours);
        data.append('work_on_weekends', String(work_on_weekends));

        images.forEach((image, index) => {
            data.append('images', {
                name: `image_${index}.${extImage[index]}`,
                type: `image/jpeg`,
                uri: image
            } as any)
        })

        try {
            const response = await api.post(process.env.REACT_APP_API + '/users', data, {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            })
            console.log(response);

            setLoading(false);
            navigation.navigate('BejobberMap');

        } catch (error) {
            console.log(error);

            alert('Email ou CPF já cadastrados!');
            setLoading(false);
            return;
        }


        navigation.navigate('BejobberMap');
    }

    if (loading) {
        return (
            <ShimmerPlaceHolder
                visible={true}
            >
                <Text></Text>
            </ShimmerPlaceHolder>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <Text style={styles.title}>Dados</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>CPF</Text>
            <TextInput
                style={styles.input}
                value={cpf}
                onChangeText={setCpf}
                maxLength={11}
            />

            <Text style={styles.label}>Sobre você</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={bio}
                onChangeText={setBio}
            />

            <Text style={styles.label}>Telefone Whatsapp</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                maxLength={12}
                placeholder="DDD9xxxxxxxx"
            />

            <Text style={styles.title}>Localização</Text>

            <Text style={styles.label}>Logradouro, Nº</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Endereço, número"
            />

            <Text style={styles.label}>Cidade</Text>
            <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
            />

            <Text style={styles.label}>Estado - Sigla</Text>
            <TextInput
                style={styles.inputState}
                value={state}
                onChangeText={setState}
                placeholder="MG"
            />

            <Text style={styles.title}>E-mail e Senha</Text>

            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                value={email}
                textContentType="emailAddress"
                autoCompleteType="email"
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.input}
                value={psswd}
                textContentType="password"
                onChangeText={setPsswd}
                secureTextEntry={true}
                placeholder="Minimo de 6 caracteres"
            />

            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
                style={confirmPsswd === psswd ? styles.input : styles.inputConfirmPassword}
                textContentType="password"
                value={confirmPsswd}
                onChangeText={setConfirmPsswd}
                secureTextEntry={true}
            />

            <Text style={styles.title}>Serviços</Text>

            <Text style={styles.label}>Palavras Chaves para ser encontrado</Text>
            <TextInput
                style={styles.input}
                value={services}
                onChangeText={setServices}
                autoCapitalize="words"
                placeholder="Separe cada termo com virgula"
            />

            <Text style={styles.label}>Fotos de Você e de seus serviços</Text>

            {images.length !== 0 && (
                <View style={styles.uploadedImagesContainer}>
                    {images.map((image, index) => {
                        return (
                            <LinearGradient
                                colors={['#FFC2D8', '#A1E9C5']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }} locations={[0, 1]}
                                key={image}
                                style={styles.uploadedImageMenu}
                            >
                                <Image
                                    source={{ uri: image }}
                                    style={styles.uploadedImage}
                                />
                                <Text style={styles.uploadedImageText}>Image Selecionada</Text>
                                <Feather name="x" size={30} color="red" style={styles.excludeImage} onPress={() => handleExcludeImage(index)} />
                            </LinearGradient>
                        )
                    })}
                </View>
            )}

            <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
                <Feather name="plus" size={24} color="#15B6D6" />
            </TouchableOpacity>


            <Text style={styles.label}>Horario de Funcionamento</Text>
            <TextInput
                style={styles.input}
                value={working_hours}
                onChangeText={setWorkingHours}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch
                    thumbColor="#fff"
                    trackColor={{ false: '#ccc', true: '#39CC83' }}
                    value={work_on_weekends}
                    onValueChange={setWorkOnWeekends}
                />
            </View>

            <RectButton style={styles.nextButton} onPress={handleCreateJobber}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    title: {
        color: '#5c8599',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#D3E2E6'
    },

    label: {
        color: '#8fa7b3',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8,
    },

    comment: {
        fontSize: 11,
        color: '#8fa7b3',
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    inputConfirmPassword: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#FFC2D8',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    inputState: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        width: 70,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    uploadedImageMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderRadius: 20,
        marginBottom: 10,
    },

    uploadedImagesContainer: {
        flexDirection: 'column',
        backgroundColor: '#f2f3f5',
        marginBottom: 10,
        borderRadius: 20,

        justifyContent: 'center',
    },

    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginRight: 8
    },

    uploadedImageText: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#0089a5',
    },

    excludeImage: {
        marginRight: 10,
    },


    imagesInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderStyle: 'dashed',
        borderColor: '#96D2F0',
        borderWidth: 1.4,
        borderRadius: 20,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    }
})