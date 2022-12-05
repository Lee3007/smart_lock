import styled from 'styled-components/native';

 const Wrapper = styled.View`
    background-color: rgba(40,42,54,0.8);
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
`;

 const Container = styled.View`
    background-color: #44475a;
    width: 80%;
    height: 350px;
    border-radius: 10px;

    justify-content: center;
    align-items: center;
    padding: 30px;
    box-shadow: 0px 60px 60px black;
`;

 const Title = styled.Text`
    font-size: 26px;
    font-weight: 900;
    color: #f8f8f2;
`;

 const NameInputContainer = styled.View`
    height: 70%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

`;

 const InputInfo = styled.Text`
    color: #F8F8F2;
    font-size: 15px;
    text-align: left;
    width: 75%;
    margin-bottom: 5px;
`;

 const InputArea = styled.TextInput`
    height: 40px;
    width: 75%;
    padding: 10px;
    background-color: #F8F8F2;
    border: solid 1px #282A36;
    border-radius: 4px;
    margin-bottom: 40px;
`;

const CreateNewButton = styled.Pressable`
    width: 75%;
    height: 40px;
    border-radius: 4px;
    background-color: #50fa7b;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -50px;
`;

const ButtonTitle = styled.Text`
    font-size: 15px;
    color: #282A36;
`;

const CancelButton = styled.Pressable`
    margin-top: 15px;
    width: 75%;
    height: 40px;
    border-radius: 4px;
    background-color: #ff5555;

    display: flex;
    align-items: center;
    justify-content: center;

`;

const Warning = styled.Text`
    color: #ff5555;
    font-size: 16px;
`;

export { Warning, Wrapper, Container, Title, NameInputContainer, InputInfo, InputArea, CreateNewButton, ButtonTitle, CancelButton };