import { useEffect, useState } from 'react';
import { UserEmail } from '../LockOptionsMenu/styles';
import { Warning, Wrapper, Container, Title, PromoteUserButton, ButtonTitle, CancelButton } from './styles'
import { getAxiosClient } from '../../Services/Axios';
import localRepo from '../../LocalStorage/LocalRepository';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../LoadingModal'

export default function PromoteUserModal({ setShowModal, user, lock }) {
    const [warning, setWarning] = useState('');
    const client = getAxiosClient();
    const navigation = useNavigation();
    const [loadingVisibility, setLoadingVisibility] = useState('');

    async function promoteUser() {
        setLoadingVisibility(true);
        try {
            const { user: localUser, token: userToken } = await localRepo.authorizeUser();

            if (localUser.email !== user.email) {

                const response1 = await client.put("/relations", {
                    userID: localUser.id,
                    lockID: lock.data.id,
                    owner: false
                }, {
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    }
                });
                
                const response2 = await client.put("/relations", {
                    userID: user.id,
                    lockID: lock.data.id,
                    owner: true
                }, {
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    }
                });


                if( response1.status == "204" && response2.status == "204"){
                    const token = await localRepo.getUserToken();
                    await localRepo.refreshToken(token);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomePage' }],
                    });

                    setShowModal(false)
                }
                
            }
            else {
                setWarning('You cannot promote yourself! You are already the owner.')
            }
        }
        catch (error) {
            console.log(error);
        }
        setLoadingVisibility(false);
    }

    return (
        <Wrapper>
            <LoadingModal visibility={loadingVisibility}/>
            <Container>
                <Title>Are you sure you want to promote the user {user.name} to Owner of the lock?</Title>
                <Warning>{warning}</Warning>

                <PromoteUserButton onPress={() => { promoteUser() }}><ButtonTitle>Promote User</ButtonTitle></PromoteUserButton>
                <CancelButton onPress={() => { setShowModal(false) }}><ButtonTitle>Cancel</ButtonTitle></CancelButton>
            </Container>
        </Wrapper>

    );

}