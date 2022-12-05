import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAxiosClient } from '../Services/Axios'

class LocalRepository{

    storeUserToken = async (value) => {
        try {
            await AsyncStorage.setItem('userToken', value);
            await AsyncStorage.setItem('userTokenTimestamp', Date.now().toString());
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    getUserToken = async () => {
        try {
            let token = await AsyncStorage.getItem('userToken');
            const timeStamp = parseInt( await AsyncStorage.getItem('userTokenTimestamp') );

            if (Date.now() > timeStamp+1680000) {
                const newToken = await this.refreshToken(token)
                token = newToken;
            }

            if(token !== null) {
                return token;
            }
            else{
                throw new Error("userToken not found");
            }
        } catch(error) {
            console.log(error);
        }
    }

    refreshToken = async (token) => {
        const client = getAxiosClient();

        const {data:{ data } } = await client.post('/refresh', {}, {
            headers:{
                "Authorization": token
            }
        });
        
        await this.storeUserToken(data);
        return data;
    }

    //returns token and user object
    authorizeUser = async () => {

        try{
            const client = getAxiosClient();
            const token = await localRepo.getUserToken();

            const {data: {data}} = await client.post('/verify', {}, {
                headers: {
                    "Authorization": token
                }
            });

            return {
                token: token,
                user: data.user
            }
        }

        catch(error){
            console.log(error);
        }

    }


}

const localRepo = new LocalRepository();
Object.freeze(localRepo);

export default localRepo;