import { PromoteUserButtonText, PromoteUserButton, UserInfoContainer, DeleteLockButton, UserEmail, UserName, DeleteUserButton, DeleteUserButtonText, ButtonText, AddUserButton, Wrapper, Container, Title, HashedId, Description, OwnershipText, UsersList, UserItem, RemoveMyselfButton } from './styles'
import { Modal } from 'react-native'
import { useState, useEffect } from 'react'
import AddNewUserToLockModal from '../AddNewUserToLockModal';
import RemoveUserFromLockModal from '../RemoveUserFromLockModal';
import { getAxiosClient } from '../../Services/Axios';
import localRepo from '../../LocalStorage/LocalRepository';
import DeleteLockModal from '../DeleteLockModal';
import PromoteUserModal from '../PromoteUserModal'
import RemoveMyselfModal from '../RemoveMyselfModal'

function AddUserPopUp({showModal, setShowModal, lock}){

    return(
        <Modal transparent visible={showModal}>
            <AddNewUserToLockModal setShowModal={setShowModal} lock={lock}></AddNewUserToLockModal>
        </Modal>
    );
}

function RemoveUserPopUp({showModal, setShowModal, user, lock, refresh, setRefresh}){
    return(
        <Modal transparent visible={showModal}>
            <RemoveUserFromLockModal setShowModal={setShowModal} user={user} lock={lock} refresh={refresh} setRefresh={setRefresh}></RemoveUserFromLockModal>
        </Modal>
    );
}

function PromoteUserPopUp({showModal, setShowModal, user, lock}){
    return(
        <Modal transparent visible={showModal}>
            <PromoteUserModal setShowModal={setShowModal} user={user} lock={lock}></PromoteUserModal>
        </Modal>
    );
}

function DeleteLockPopUp({showModal, setShowModal, lock}){
    return(
        <Modal transparent visible={showModal}>
            <DeleteLockModal setShowModal={setShowModal} lock={lock}></DeleteLockModal>
        </Modal>
    );
}

function RemoveMyselfPopUp({showModal, setShowModal, lock}){
    return(
        <Modal transparent visible={showModal}>
            <RemoveMyselfModal setShowModal={setShowModal} lock={lock}></RemoveMyselfModal>
        </Modal>
    );
}

export default function LockOptionsMenu(lock){
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
    const [showPromoteUserModal, setShowPromoteUserModal] = useState(false);
    const [showDeleteLockModal, setShowDeleteLockModal] = useState(false);
    const [showRemoveMyselfModal, setShowRemoveMyselfModal] = useState(false);
    const [toRemoveUser, setToRemoveUser] = useState();
    const [toPromoteUser, setToPromoteUser] = useState();
    const [usersList , setUsersList] = useState([]);
    const [refreshUserList, setRefreshUserList] = useState(false);
    const client = getAxiosClient();
    
    async function getUsersList(){
        if(lock.data.owner){
            try{
                const token = await localRepo.getUserToken();
                const response = await client.get(`/locks/users/${lock.data.id}`,{
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setUsersList(response.data.data);
            }
            catch(error){
                console.log(error.request);
            }
        }

    }
    useEffect(()=>{ getUsersList()}, [refreshUserList]);

    function removeUserFromLock(removingUser){
        setToRemoveUser(removingUser);
        setShowRemoveUserModal(true)
    }

    function promoteUser(promotingUser){
        setToPromoteUser(promotingUser);
        setShowPromoteUserModal(true);
    }

    function deleteLock(){
        setShowDeleteLockModal(true);
    }

    function addUserToLock(){
        setShowAddUserModal(true)
    }

    function removeMyself(){
        setShowRemoveMyselfModal(true);
    }

    function showOwnerOptions(isOwner){
        if(isOwner){
            return (
                <>
                    <Description>Command Hash</Description>
                    <HashedId selectable={true}>{lock.data.commandHash}</HashedId>

                    <Description>Users that have acess to this lock.</Description>
                    <UsersList>
                        {
                            usersList.map( user=>{
                                return (
                                <UserItem key={user.id}>
                                    <UserInfoContainer>
                                        <UserName >{user.name}</UserName>
                                        <UserEmail selectable={true}>{user.email}</UserEmail>
                                    </UserInfoContainer>
                                    

                                    <PromoteUserButton onPress={()=>{promoteUser(user)}}><PromoteUserButtonText>Transfer Ownership</PromoteUserButtonText></PromoteUserButton>
                                    <DeleteUserButton onPress={()=>{removeUserFromLock(user)}}><DeleteUserButtonText>X</DeleteUserButtonText></DeleteUserButton>
                                
                                </UserItem>
                                );
                            })
                        }

                        <RemoveUserPopUp showModal={showRemoveUserModal} setShowModal={setShowRemoveUserModal} user={toRemoveUser} lock={lock} refresh={refreshUserList} setRefresh={setRefreshUserList}></RemoveUserPopUp>
                        <PromoteUserPopUp showModal={showPromoteUserModal} setShowModal={setShowPromoteUserModal} user={toPromoteUser} lock={lock}></PromoteUserPopUp>

                    </UsersList>

                    <AddUserButton onPress={()=>{ addUserToLock() }}><ButtonText>Add User</ButtonText></AddUserButton>
                    <AddUserPopUp showModal={showAddUserModal} setShowModal={setShowAddUserModal} lock={lock}></AddUserPopUp>
                    
                    <DeleteLockButton onPress={()=>{deleteLock()}} ><ButtonText>Delete Lock</ButtonText></DeleteLockButton>
                    <DeleteLockPopUp showModal={showDeleteLockModal} setShowModal={setShowDeleteLockModal} lock={lock}></DeleteLockPopUp>
                </>
            );
        }

        return (<></>);

    }


    return(
        <Wrapper>
            <Container>
                <Title>{lock.data.name}</Title>
                <OwnershipText>You are {lock.data.owner ? "" : "not "}the owner of this lock.</OwnershipText>
                
                {
                    showOwnerOptions(lock.data.owner)
                }

                <RemoveMyselfButton onPress={()=>{removeMyself()}}><ButtonText>Remove Myself from Lock</ButtonText></RemoveMyselfButton>
                <RemoveMyselfPopUp showModal={showRemoveMyselfModal} setShowModal={setShowRemoveMyselfModal} lock={lock}></RemoveMyselfPopUp>
                
            </Container>
        </Wrapper>
    );
}