import { USER_LOGIN, USER_SIGNUP, USER_LOGOUT, CANCEL_ERROR, USER_CONFIRM_ACCOUNT, USER_LOGIN_FAILED, ERROR, SUCCESS, REDIRECT } from "../types";

export const authReducer = (
    state = {
        token : localStorage.getItem('token') || '',
        userId: localStorage.getItem('userId') || '',
        expiryDate: localStorage.getItem('expiryDate') || '',
        isAuth: Boolean(localStorage.getItem('isAuth')) || false,
        isAdmin: Boolean(localStorage.getItem('isAdmin')) || false,
        isOwner: Boolean(localStorage.getItem('isOwner')) || false,
        loading: false,
        error: null,
        status: null,
        confirmAccountStatus: null,
        redirect: null
    }, 
    action
) => {


    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId, 
                isAdmin: action.payload.isAdmin,
                isOwner: action.payload.isOwner,
                isAuth: true
            }
        case USER_SIGNUP: {
            return {
                ...state,
                userId: action.payload.userId,
                loading: false,
                error: action.payload.message,
                status: action.status,
                redirect: action.status === 200 ? true : false
            }
        }
        case USER_CONFIRM_ACCOUNT: {
            return {
                ...state,
                confirmAccountStatus: action.status,
                redirect: null
            }
        }
        case USER_LOGOUT:
            return {
                token: null,
                userId: null,
                isAuth: false,
                expiryDate: null
            }
        case CANCEL_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        case SUCCESS: {
            return {
                ...state,
                status: action.status,
                redirect: action.status === 200 ? true : false
            }
        }
        case REDIRECT: {
            return {
                ...state,
                redirect: null
            }
        }
        case ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
            return state;
    }
}

