import { useEffect, useState } from 'react';
import { UserEmail } from '../LockOptionsMenu/styles';
import { Warning, Wrapper, Container, Title, RemoveUserButton, ButtonTitle, CancelButton } from './styles'
import { getAxiosClient } from '../../Services/Axios';
import localRepo from '../../LocalStorage/LocalRepository';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../LoadingModal'

export default function RemoveUserFromLockModal({setShowModal, user, lock, refresh, setRefresh}){
    const [warning, setWarning] = useState('');
    const client = getAxiosClient();
    const navigation = useNavigation();
    const [loadingVisibility, setLoadingVisibility] = useState('');

    async function removeUser(){
        setLoadingVisibility(true);
        try{
            const {user: localUser, token: userToken} = await localRepo.authorizeUser();
            
            if(localUser.email !== user.email){
                const response = await client.delete(`/relations?userID=${user.id}&lockID=${lock.data.id}`, {
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    }
                })
                
                if(response.status == "200"){
                    const token = await localRepo.getUserToken();
                    await localRepo.refreshToken(token);

                    setRefresh(!refresh)

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomePage' }],
                    });
                    
                    setShowModal(false)
                }
            }

            else{
                setWarning('You cannot remove yourself from the list, please use the "Remove Myself" button.')
            }
        }
        catch(error){
            console.log(error);
        }
        setLoadingVisibility(false);
    }

    return(
        <Wrapper>
            <LoadingModal visibility={loadingVisibility}/>
            <Container>
                <Title>Are you sure you want to remove the user {user.name} from the lock?</Title>
                <Warning>{warning}</Warning>

                <RemoveUserButton onPress={()=>{removeUser()}}><ButtonTitle>Remove User</ButtonTitle></RemoveUserButton>
                <CancelButton onPress={()=>{setShowModal(false)}}><ButtonTitle>Cancel</ButtonTitle></CancelButton>
            </Container>
        </Wrapper>

    );
    
}