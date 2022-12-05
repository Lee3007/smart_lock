import { useEffect, useState } from 'react';
import { ErrorMessage, Wrapper, Container, Title, NameInputContainer, InputInfo, InputArea, CreateNewButton, ButtonTitle, CancelButton } from './styles'
import { getAxiosClient } from '../../Services/Axios';
import localRepo from '../../LocalStorage/LocalRepository';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../LoadingModal'

export default function AddNewUserToLockModal({setShowModal, lock}){
    const [userEmail, setUserEmail ] = useState('');
    const [errorMessage, setErrorMessage ] = useState('');
    const client = getAxiosClient();
    const navigation = useNavigation();
    const [loadingVisibility, setLoadingVisibility] = useState('');

    async function AddNewUserToLock(){
        setLoadingVisibility(true);
        try{
            const {token: userToken} = await localRepo.authorizeUser();

            const response = await client.post("/invite", {
                email: userEmail,
                lockID: lock.data.id,
            }, {headers:{
                "Authorization": `Bearer ${userToken}`
            }});

            console.log(response.status);

            if(response.status == "201"){
                const token = await localRepo.getUserToken();
                await localRepo.refreshToken(token);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomePage' }],
                });
                
                setShowModal(false);     
            }
        }
        catch(error){
            if(error.response)
                setErrorMessage("Error: "+error.response.data.message);
            else
                console.log(error);    
        }
        setLoadingVisibility(false);
    }

    return(
        <Wrapper>
            <LoadingModal visibility={loadingVisibility}/>
            <Container>
                <Title>Add New User to Lock</Title>
                <ErrorMessage>{errorMessage}</ErrorMessage>

                <NameInputContainer>
                    <InputInfo>User Email</InputInfo>
                    <InputArea 
                        onChangeText={newText => setUserEmail(newText)}
                        defaultValue={userEmail}
                    ></InputArea>
                </NameInputContainer>

                <CreateNewButton onPress={()=>{AddNewUserToLock() }}><ButtonTitle>Add User</ButtonTitle></CreateNewButton>
                <CancelButton onPress={()=>{setShowModal(false)}}><ButtonTitle>Cancel</ButtonTitle></CancelButton>
            </Container>
        </Wrapper>

    );
    
}