import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
    FB_LOGIN_SUCCESS,
    FB_LOGIN_FAIL
} from './types';

const APPID = '117019982325377';

export const facebookLogin = () => async dispatch => {
    const token = await AsyncStorage.getItem('fb_token');
    if (token) {
        // Dispatch an action saying Fb login is done
        dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
    } else {
        //Strat up FB Login process
        doFacebookLogin(dispatch);
    }
};


const doFacebookLogin = async dispatch => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(APPID, {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FB_LOGIN_FAIL });
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
};
