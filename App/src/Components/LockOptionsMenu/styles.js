import styled from 'styled-components/native'

export const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #282a36;

    justify-content: center;
    align-items: center;
`;

export const Container = styled.View`
    background-color: #44475a;
    width: 90%;
    height: 90%;
    border-radius: 10px;
    padding: 30px;

    align-items: center;
`;

export const Title = styled.Text`
    font-weight: 900;
    font-size: 24px;
    color: #f8f8f2;
    margin-bottom: 2px;
`;

export const OwnershipText = styled.Text`
    font-size: 12px;
    color: #f8f8f2;
    text-align: center;
    width: 100%;
    margin-bottom: 10px;

`;

export const Description = styled.Text`
    font-size: 14px;
    color: #f8f8f2;
    text-align: left;
    width: 100%;
    margin-bottom: 2px;
`;

export const HashedId = styled.Text`
    background-color: #282a36;
    font-weight: 400;
    font-size: 18px;
    color: #f8f8f2;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 6px;
`;

export const UsersList = styled.ScrollView`
    width: 100%;
    height: 10px;
    background-color: #44475a;
    padding: 6px;
    border-radius: 6px;
`;

export const UserItem = styled.View`
    width: 100%;
    height: 60px;
    background-color: #282a36;
    margin-bottom: 6px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 6px;

`;

export const UserInfoContainer = styled.View`
    width: 61%;

    justify-content: center;
    /* align-items: center; */
`;

export const UserName = styled.Text`
    color: #f8f8f2;
    font-size: 16px;
    font-weight: 600;
`;

export const UserEmail = styled.Text`
    color: #696E8C;
    font-size: 12px;
    font-weight: 600;
    margin-top: 2px;
`;

export const DeleteUserButton = styled.Pressable`
    height: 40px;
    width: 30px;
    background-color: #ff5555;

    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

export const PromoteUserButton = styled.Pressable`
    height: 40px;
    width: 60px;
    background-color: #bd93f9;

    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-right: 10px;
`;

export const PromoteUserButtonText = styled.Text`
    margin: 2px;
    text-align: center;
    color: #f8f8f2;
    font-size: 11px;
    font-weight: 600;
    overflow: scroll;
`;

export const DeleteUserButtonText = styled.Text`
    color: #f8f8f2;
    font-size: 16px;
    font-weight: 600;
    overflow: scroll;

`;

export const AddUserButton = styled.Pressable`
    background-color: #50fa7b;
    width: 100%;
    height: 40px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
`;

export const RemoveMyselfButton = styled.Pressable`
    background-color: #ffb86c;
    width: 100%;
    height: 40px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
`;

export const DeleteLockButton = styled.Pressable`
    background-color: #ff5555;
    width: 100%;
    height: 40px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
`;

export const ButtonText = styled.Text`
    font-size: 16px;
    color: #282a36;
    font-weight: 500;

`;