import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    const previousToken = await AsyncStorage.getItem('pushtoken');
    console.log(previousToken);

    if (previousToken) {
        return;
    } 

    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
        return;
    }

    const token = await Notifications.getExponentPushTokenAsync();
    await axios.post(PUSH_ENDPOINT, { token: { token } });
    AsyncStorage.setItem('pushtoken', token);
};
