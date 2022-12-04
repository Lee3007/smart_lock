import { useState } from 'react';
import { Warning, Wrapper, Container, Title, NameInputContainer, InputInfo, InputArea, CreateNewButton, ButtonTitle, CancelButton } from './styles'
import localRepo from '../../LocalStorage/LocalRepository'
import { getAxiosClient } from '../../Services/Axios';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../LoadingModal'

export default function AddNewLockModal({setShowModal}){
    const [nameInput, setNameInput] = useState('');
    const client = getAxiosClient();
    const navigation = useNavigation();
    const [loadingVisibility, setLoadingVisibility] = useState('');
    const [warning, setWarning] = useState('');

    async function createNewLock(){
        setLoadingVisibility(true);
        // console.log("passou auqiasfaf")
        try {
            // if(nameInput === ''){
            //     setNameInput('Error: Lock name should not me empty.');
            //     throw new Error("Lock name should not me empty.")
            // }

            const {user, token} = await localRepo.authorizeUser();

            const {data: {data}} = await client.post('/locks', {
                name: nameInput.trim(),
                websocket: 'TEST'
            });
            
            const response = await client.post('/relations', {
                lockID: data.id,
                userID: user.id,
                owner: true,
            }, {headers:{
                "Authorization": `Bearer ${token}`
            }})

            if(response.status == "201"){
                const token = await localRepo.getUserToken();
                await localRepo.refreshToken(token);

                setShowModal(false);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomePage' }],
                });
            }
            setNameInput('');

        }
        catch(error){
            setWarning(error.response.data.message);
        }
        setLoadingVisibility(false);

    }

    return(
        <Wrapper>
            <LoadingModal visibility={loadingVisibility}/>
            <Container>
                <Title>Add New Lock</Title>
                <Warning>{warning}</Warning>
                <NameInputContainer>
                    <InputInfo>Name Your Lock</InputInfo>
                    <InputArea
                        onChangeText={newText => setNameInput(newText)}
                        defaultValue={nameInput}
                    ></InputArea>
                </NameInputContainer>
                <CreateNewButton onPress={()=>{ createNewLock() }}><ButtonTitle>Create</ButtonTitle></CreateNewButton>
                <CancelButton onPress={()=>{setShowModal(false)}}><ButtonTitle>Cancel</ButtonTitle></CancelButton>
            </Container>
        </Wrapper>

    );
    
}