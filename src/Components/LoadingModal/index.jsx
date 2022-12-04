import { ActivityIndicator, Modal } from "react-native";
import { Wrapper, Container } from "./styles";


export default function LoadingModal({visibility}){

    return(
        <Modal transparent visible={visibility}>
            <Wrapper>
                <Container>
                    <ActivityIndicator size="large" color="#f8f8f2"/>
                </Container>
            </Wrapper>
        </Modal>
    );


}