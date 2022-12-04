import styled from "styled-components/native";

export const Wrapper = styled.View`
    height: 100%;
    width: 100%;
    background-color: #282a36;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
`;

export const Container = styled.View`
    height: 100%;
    width: 100%;
    background-color: #282a36;
    border-radius: 4px;

    flex-direction: column;
    justify-content: flex-start;
    /* align-items: flex-start; */
    align-content: center;
    flex-wrap: wrap;

`;

export const HeaderTitle = styled.Text`
    font-size: 26px;
    color: #f8f8f2;
    font-weight: 600;
`;

export const Header = styled.View`
    width: 100%;
    height: 60px;
    background-color: #6272a4;
    padding: 10px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const AddButton = styled.Pressable`
    width: 60px;
    height: 40px;
    background-color: #50fa7b;
    border-radius: 4px;

    align-items: center;
    justify-content: center;
    margin-left: 10px;

`;

export const LogOutButton = styled.Pressable`
    width: 60px;
    height: 40px;
    background-color: #ff5555;
    border-radius: 4px;

    align-items: center;
    justify-content: center;
    
`;

export const RefreshButton = styled.Pressable`
    width: 60px;
    height: 40px;
    background-color: #ffb86c;
    border-radius: 4px;

    align-items: center;
    justify-content: center;
    margin-left: 10px;
`;

export const AddButtonText = styled.Text`
    font-size: 26px;
    color: #282a36;

`;
export const LogOutButtonText = styled.Text`
    font-size: 12px;
    color: #282a36;

`;
export const RefreshButtonText = styled.Text`
    font-size: 12px;
    color: #282a36;

`;

export const ListContainer = styled.FlatList`
    height: auto;
    width: 100%;

    flex-direction: column;
`;

export const ListItem = styled.View`
    height: 140px;
    background-color: #44475a;
    border-radius: 10px;
    /* border: 1px solid #f8f8f2; */
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 20px;

    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const ListItemTitle = styled.Text`
    text-align: left;
    width: 100%;
    color: #f8f8f2;
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 16px;
    padding-left: 6px;
`;

export const ListItemUnlockButton = styled.Pressable`
    width: 80%;
    height: 46px;
    background-color: #f1fa8c;
    border-radius: 15px;
    margin-right: 20px;

    justify-content: center;
    align-items: center;
`;

export const ListItemUnlockText = styled.Text`
    color: #282a36;
`;

export const ListItemOptionsButton = styled.Pressable`
    height: 40px;
    width: 40px;

    justify-content: center;
    align-items: center;
    background-color: #282a36;
    border-radius: 25px;
`;

export const ListItemOptionsText = styled.Text`
    color: #f8f8f2;
    font-weight: 900;
    
`;