import LockOptionsMenu from "../Components/LockOptionsMenu";

export default function LockOptionsPage({ route, navigation }){
    const data = route.params;
    return (
            <LockOptionsMenu data={data}/>
    )
}