import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'

import { RefreshButton, RefreshButtonText, ButtonContainer, LogOutButton, ListItemUnlockButton, ListItemUnlockText, ListItemOptionsButton, ListItemOptionsText, Wrapper, Container, AddButtonText, LogOutButtonText, Header, AddButton, HeaderTitle, ListContainer, ListItem, ListItemTitle } from './styles'
import AddNewLockModal from '../AddNewLockModal/index'
import { getAxiosClient } from '../../Services/Axios'
import localRepo from '../../LocalStorage/LocalRepository'
import LoadingModal from '../LoadingModal'

function AddLockPopUp({showModal, setShowModal}){
    return(
        <Modal transparent visible={showModal}>
            <AddNewLockModal setShowModal={setShowModal}></AddNewLockModal>
        </Modal>
    );
}

export default function LocksMenu(){
    const [showModal, setShowModal] = useState(false);
    const [locks, setLocks] = useState([]);
    const navigation = useNavigation();
    const client = getAxiosClient();
    const [loadingVisibility, setLoadingVisibility] = useState('');

    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [hasRecordOfAuth, sethasRecordOfAuth] = useState("Has record of Biometrics");

    // Check if hardware supports biometrics
    useEffect( ()=>{( async () => {
        setLoadingVisibility(true);
        setIsBiometricSupported(await LocalAuthentication.hasHardwareAsync());
        setLoadingVisibility(false);
    })();} ,[]);

    //Checks if it is the owner of the phone through biometrics
    const handleBiometricAuth = async () => {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

        if (!savedBiometrics){
        sethasRecordOfAuth("No record of Biometrics or FaceID found");
        }
        else{
            const authentication = await LocalAuthentication.authenticateAsync({promptMessage: "LogIn to SmartLock"});
            return authentication.success;
        }
    }

    async function getUserLocks(){
        setLoadingVisibility(true);
        try{
            const {user} = await localRepo.authorizeUser();
            setLocks(user.locks);
        }
        catch(error){
            console.log("getUserLocks Error:");
            console.log(error);
        }
        setLoadingVisibility(false);
    }
    useEffect( ()=>{getUserLocks()}, []);

    function logOut(){
        setLoadingVisibility(true);
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }],
        });
        setLoadingVisibility(false);
    }

    async function unlockLock(id){
        setLoadingVisibility(true);
        try{
            const isOwnerOfPhone = await handleBiometricAuth();
            if (!isOwnerOfPhone){
                throw new Error("Couldn't verify Biometric Authentication")
            }
            const token = await localRepo.getUserToken();
            await client.post(`/locks/unlock/${id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        }
        catch(error){
            console.log(error);
        }
        setLoadingVisibility(false);
    }

    async function openOptions(navigation, data){
        setLoadingVisibility(true);
        try{
            const isOwnerOfPhone = await handleBiometricAuth();
            if (!isOwnerOfPhone){
                throw new Error("Couldn't verify Biometric Authentication")
            }
            navigation.navigate('LockOptionsPage', data);
        }
        catch(error){
            console.log(error);
        }
        setLoadingVisibility(false);
    }

    async function refreshPage(){
        setLoadingVisibility(true);
        const token = await localRepo.getUserToken();
        await localRepo.refreshToken(token);

        navigation.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
        });
        setLoadingVisibility(false);
    }

    return(
        <Wrapper>
            <LoadingModal visibility={loadingVisibility}/>
            <AddLockPopUp showModal={showModal} setShowModal={setShowModal}></AddLockPopUp>
            <Container>
                <Header>
                    <HeaderTitle>Locks</HeaderTitle>
                    <ButtonContainer>
                        <LogOutButton onPress={()=>{logOut()}}><LogOutButtonText>Log Out</LogOutButtonText></LogOutButton>
                        <RefreshButton onPress={()=>{refreshPage()}} ><RefreshButtonText>Refresh</RefreshButtonText></RefreshButton>
                        <AddButton onPress={()=>{setShowModal(true)}} ><AddButtonText>+</AddButtonText></AddButton>
                    </ButtonContainer>
                    
                </Header>
                <ListContainer
                    data={locks}
                    renderItem={({ item }) => (
                        <ListItem>
                            <ListItemTitle>{item.name}</ListItemTitle>
                            <ListItemUnlockButton onPress={()=>{unlockLock(item.id)}}><ListItemUnlockText>Unlock</ListItemUnlockText></ListItemUnlockButton>
                            <ListItemOptionsButton onPress={()=>{ openOptions(navigation, item) }}><ListItemOptionsText>...</ListItemOptionsText></ListItemOptionsButton>
                        </ListItem>
                    )}
                    keyExtractor={item => item.id}
                />
            </Container>
        </Wrapper>
    );
};
