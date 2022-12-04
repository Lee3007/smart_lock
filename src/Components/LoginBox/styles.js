import styled from "styled-components/native";

export const Container = styled.View`
    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: #282A36;
`;

export const Logo = styled.Text`
    font-size: 36px;
    font-weight: 800;
    /* font-family: "Cochin"; */
    color: #f8f8f2;
    margin-bottom: 2px;
    margin-top: -20px;
`;

export const Motto = styled.Text`
    font-size: 16px;
    font-weight: 300;
    /* font-family: "Cochin"; */
    color: #f8f8f2;
    margin-bottom: 40px;
`;

export const Wrapper = styled.View`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* width: 80%; */
    width: 320px;
    /* height: 60%; */
    height: 420px;
    background-color: #44475A;

    border-radius: 10px;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    color: #f8f8f2;
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 20px;
    margin-top: 20px;
    /* font-family: "Arial" */

`;

export const LoginInputContainer = styled.View`
    height: 70%;
    width: 100%;
    margin-top: 20px;
    padding-bottom: 40px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const InputInfo = styled.Text`
    color: #F8F8F2;
    font-size: 15px;
    text-align: left;
    width: 75%;
`;

export const InputArea = styled.TextInput`
    height: 40px;
    width: 75%;
    padding: 10px;
    background-color: #282a36;
    border: solid 1px #282A36;
    border-radius: 4px;
    color: #f8f8f2;

    margin-bottom: 10px;
    margin-top: 3px;
`;

export const LoginButton = styled.Pressable`
    margin-top: 20px;
    width: 75%;
    height: 30px;
    border-radius: 4px;
    background-color: #50fa7b;

    display: flex;
    align-items: center;
    justify-content: center;

`;

export const BiometricButton = styled.Pressable`
    width: 75%;
    height: 30px;
    border-radius: 4px;
    background-color: #bd93f9;

    display: flex;
    align-items: center;
    justify-content: center;

`;

export const RegisterButton = styled.Pressable`
    margin-top: 15px;
    width: 75%;
    height: 30px;
    border-radius: 4px;
    background-color: #ffb86c;
    color: #50fa7b;

    display: flex;
    align-items: center;
    justify-content: center;

`;

export const ButtonTitle = styled.Text`
    font-size: 15px;
    color: #282A36;
`;

export const AlertText = styled.Text`
    font-size: 12px;
    font-weight: 300;
    color: #ff5555;
    width: 70%;

`;