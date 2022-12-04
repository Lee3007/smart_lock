import { useState } from 'react';
import { DeleteLockButton, Wrapper, Container, Title, ButtonTitle, CancelButton } from './styles'
import localRepo from '../../LocalStorage/LocalRepository'
import { getAxiosClient } from '../../Services/Axios';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../LoadingModal'

export default function DeleteLockModal({setShowModal, lock}){
    const client = getAxiosClient();
    const navigation = useNavigation();
    const [loadingVisibility, setLoadingVisibility] = useState('');

    async function deleteLock(){
        setLoadingVisibility(true);
        try {  
            const {token} = await localRepo.authorizeUser();

            const response = await client.delete(`/locks/${lock.data.id}`, {headers:{
                "Authorization": `Bearer ${token}`
            }});

            if (response.status == "200"){
                const token = await localRepo.getUserToken();
                await localRepo.refreshToken(token);

                setShowModal(false);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomePage' }],
                });
            }
        }

        catch (error){
            console.log(error);
        }
        setLoadingVisibility(false);
    }

    return(
        <Wrapper>
            <LoadingModal visibility={loadingVisibility}/>
            <Container>
                <Title>Are you sure you want to delete this lock?</Title>
                <DeleteLockButton onPress={()=>{ deleteLock() }}><ButtonTitle>Delete</ButtonTitle></DeleteLockButton>
                <CancelButton onPress={()=>{ setShowModal(false) }}><ButtonTitle>Cancel</ButtonTitle></CancelButton>
            </Container>
        </Wrapper>

    );
    
}