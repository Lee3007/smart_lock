import LocksMenu from "../Components/LocksMenu";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from "react-native";

{/* <SafeAreaView> */}

export default function HomePage(){
    return (
        <SafeAreaView style={safeAreaStyle.container}>
            <LocksMenu/>
        </SafeAreaView>
    )
}

const safeAreaStyle = StyleSheet.create({
    container: {
        backgroundColor: "#6272a4",
    }
});