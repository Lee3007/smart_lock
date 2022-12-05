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
    height: 300px;
    border-radius: 10px;

    justify-content: center;
    align-items: center;
    box-shadow: 0px 60px 60px black;
`;

 const Title = styled.Text`
    padding: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 900;
    color: #f8f8f2;
    margin-bottom: 20px;
`;

 const NameInputContainer = styled.View`
    height: 70%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

`;

const DeleteLockButton = styled.Pressable`
    width: 75%;
    height: 40px;
    border-radius: 4px;
    background-color: #ff5555;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const ButtonTitle = styled.Text`
    font-size: 15px;
    color: #282A36;
`;

const CancelButton = styled.Pressable`
    width: 75%;
    height: 40px;
    border-radius: 4px;
    background-color: #f1fa8c;

    display: flex;
    align-items: center;
    justify-content: center;

`;

export { DeleteLockButton, Wrapper, Container, Title, NameInputContainer, ButtonTitle, CancelButton };