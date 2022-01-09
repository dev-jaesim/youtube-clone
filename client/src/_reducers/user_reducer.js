import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../_actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case REGISTER_USER:
            return state;
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload };
        case AUTH_USER:
            return {...state, userData: action.payload };
        case LOGOUT_USER:
            return { userData: action.payload };
        default:
            return state;
    }
};
