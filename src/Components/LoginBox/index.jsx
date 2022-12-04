import { useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication'
import { useNavigation } from "@react-navigation/native";
import {Container,
        Logo,
        Motto,
        Wrapper,
        Title,
        LoginInputContainer,
        InputInfo,
        InputArea,
        LoginButton,
        ButtonTitle,
        RegisterButton,
        BiometricButton,
        AlertText } from "./styles";
import localRepo from "../../LocalStorage/LocalRepository";
import LoadingModal from '../LoadingModal'

import { getAxiosClient } from '../../Services/Axios'

export default function LoginBox(){
    const navigation = useNavigation();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [loadingVisibility, setLoadingVisibility] = useState('');

    async function defaultAuth(){
        setLoadingVisibility(true);
        const client = getAxiosClient();

        try {
            const response = await client.post('/authenticate', {
                email: emailInput,
                password: passwordInput
            });
            
            localRepo.storeUserToken(response.data.token)
            setAlertMessage('');
            setEmailInput('');
            setPasswordInput('');

            // navigation.navigate('HomePage');
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage' }],
            });
        }
        catch (error){
            if(error.response)
                setAlertMessage(error.response.data.message)
            else
                setAlertMessage(error.message);
        }

        setLoadingVisibility(false);
    }

    return(
        <Container>
            <LoadingModal visibility={loadingVisibility}/>
            <Logo>SMARTLOCK</Logo>
            <Motto>Your safety is our primary concern.</Motto>
            <Wrapper>
                <Title>Login</Title>
                <LoginInputContainer>
                    <InputInfo>Email:</InputInfo>
                    <InputArea 
                        onChangeText={newText => setEmailInput(newText)}
                        defaultValue={emailInput}
                    ></InputArea>
                    <InputInfo>Password:</InputInfo>
                    <InputArea 
                        secureTextEntry={true}
                        onChangeText={newText => setPasswordInput(newText)}
                        defaultValue={passwordInput}
                    ></InputArea>

                    <AlertText>{alertMessage}</AlertText>

                    <LoginButton onPress={()=>{defaultAuth()}}><ButtonTitle>Login</ButtonTitle></LoginButton>
                    {/* <BiometricButton onPress={()=>{handleBiometricAuth()}}><ButtonTitle>Biometric Authentication</ButtonTitle></BiometricButton> */}
                    <RegisterButton onPress={()=>{navigation.navigate('RegisterPage')}}><ButtonTitle>Don't have an account?</ButtonTitle></RegisterButton>
                </LoginInputContainer>
            </Wrapper>
        </Container>
    );
}
