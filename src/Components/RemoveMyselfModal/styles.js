import styled from 'styled-components/native';

export const Wrapper = styled.View`
    background-color: rgba(40,42,54,0.8);
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
`;

export const Container = styled.View`
    background-color: #44475a;
    width: 80%;
    height: auto;
    border-radius: 10px;

    justify-content: center;
    align-items: center;
    padding: 30px;
    box-shadow: 0px 60px 60px black;
`;

export const Title = styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: #f8f8f2;
    margin-bottom: 5px;
`;

export const RemoveUserButton = styled.Pressable`
    width: 75%;
    height: 40px;
    border-radius: 4px;
    background-color: #50fa7b;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonTitle = styled.Text`
    font-size: 15px;
    color: #282A36;
`;

export const CancelButton = styled.Pressable`
    margin-top: 15px;
    width: 75%;
    height: 40px;
    border-radius: 4px;
    background-color: #ff5555;

    display: flex;
    align-items: center;
    justify-content: center;

`;

export const Warning = styled.Text`
    font-weight: 300;
    font-size: 16px;
    color: #ff5555;
    margin-top: 6px;
    margin-bottom: 20px;
    text-align: center;
`;