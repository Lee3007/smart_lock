import { useNavigation } from "@react-navigation/native"
import { Warning, ButtonTitle, Container, InputArea, InputInfo, RegisterButton, LoginInputContainer, Logo, Motto, CancelButton, Title, Wrapper } from "./styles"
import { getAxiosClient } from '../../Services/Axios'
import { useState } from "react";
import LoadingModal from '../LoadingModal'
import { Text } from "react-native";

export default function RegisterBox(){
    const navigation = useNavigation();
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loadingVisibility, setLoadingVisibility] = useState(false);
    const [warning, setWarning] = useState([]);

    async function registerUser(){
        setLoadingVisibility(true);
        const client = getAxiosClient();

        try {
            const response = await client.post('/users', {
                name: nameInput.trim(),
                email: emailInput.trim(),
                password: passwordInput
            });

            setEmailInput('');
            setPasswordInput('');

            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginPage' }],
            });
        }

        catch (error){
            setWarning(error.response.data.message)
        }
        setLoadingVisibility(false);
    }

    return(
        <Container>
            <LoadingModal visibility={loadingVisibility}/>
            <Logo>SMARTLOCK</Logo>
            <Motto>Your safety is our primary concern.</Motto>
            <Wrapper>
                <Title>Register</Title>
                {
                    warning.map( (message)=>{
                        return(
                            <Warning key={message}>Error: {message}</Warning>
                        );
                    } )
                }
                <LoginInputContainer>
                    <InputInfo>Name:</InputInfo>
                    <InputArea 
                        onChangeText={newText => setNameInput(newText)}
                        defaultValue={nameInput}
                    ></InputArea>
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
                    <RegisterButton onPress={()=>{registerUser()}}><ButtonTitle>Register</ButtonTitle></RegisterButton>
                    <CancelButton onPress={()=>{navigation.pop()}}><ButtonTitle>Cancel</ButtonTitle></CancelButton>
                </LoginInputContainer>
            </Wrapper>
        </Container>

    )
}