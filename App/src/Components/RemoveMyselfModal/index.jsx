import { useEffect, useState } from 'react';
import { UserEmail } from '../LockOptionsMenu/styles';
import { Warning, Wrapper, Container, Title, RemoveUserButton, ButtonTitle, CancelButton } from './styles'
import { getAxiosClient } from '../../Services/Axios';
import localRepo from '../../LocalStorage/LocalRepository';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../LoadingModal'

export default function RemoveMyselfModal({setShowModal, user, lock}){
    const [warning, setWarning] = useState('');
    const client = getAxiosClient();
    const navigation = useNavigation();
    const [loadingVisibility, setLoadingVisibility] = useState('');

    async function removeMyself(){
        setLoadingVisibility(true);
        try{
            const {user: localUser, token: userToken} = await localRepo.authorizeUser();
        
            if(!lock.data.owner){
                const response = await client.delete(`/relations?userID=${localUser.id}&lockID=${lock.data.id}`, {
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    }
                })

                if( response.status == "200"){
                    const token = await localRepo.getUserToken();
                    await localRepo.refreshToken(token);
    
                    setShowModal(false);
    
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomePage' }],
                    });
                    
                    setShowModal(false)
                }
            }
            else{
                setWarning("You cannot remove yourself because you are the owner. You will have to transfer the ownership before removing yourself.")
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
                <Title>Are you sure you want to remove yourself from the lock?</Title>
                <Warning>{warning}</Warning>

                <RemoveUserButton onPress={()=>{removeMyself()}}><ButtonTitle>Remove Myself from Lock</ButtonTitle></RemoveUserButton>
                <CancelButton onPress={()=>{setShowModal(false)}}><ButtonTitle>Cancel</ButtonTitle></CancelButton>
            </Container>
        </Wrapper>

    );
    
}