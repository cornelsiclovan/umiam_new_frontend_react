import { CANCEL_ERROR, ERROR, REDIRECT, SUCCESS, USER_CONFIRM_ACCOUNT, USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from "../types";
import { useNavigate } from "react-router-dom";


export const signup = (user) => async (dispatch) => {

    const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const data = await res.json();
    const status = await res.status;

    dispatch({
        type: USER_SIGNUP,
        payload: data,
        status: status
    });
}

export const userConfirm = (registryToken) => async (dispatch) => {
    
    try {
        const res = await fetch("http://localhost:8080/confirm-account-registry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registryToken)
        });  

    const data = await res.json();
    const status = await res.status;

    if(res.status !== 200) {
        //console.log("here");
        throw new Error("Please review token!")
    }

        dispatch({
            type: USER_CONFIRM_ACCOUNT,
            payload: data,
            status: status
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
    
    
}

export const resetPassword = (email) => async (dispatch) => {
    try {
        const res = await fetch("http://localhost:8080/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        });

        if(res.status !== 200) {
            const data = await res.json();
            throw new Error(
                data.message
            )
        }


        dispatch({
            type: SUCCESS,
            status: res.status
        });
        
    } catch(error) {
       
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
}

export const changePassword = (passwordObject) => async (dispatch) => {
    try {
        const res = await fetch("http://localhost:8080/new-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passwordObject)
        });

        if(res.status !== 200) {
            const data = await res.json();
            throw new Error(
                data.message
            )
        }

        dispatch ({
            type: SUCCESS,
            status: res.status
        })

        

    } catch( error ) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    } 
}

export const login =(user) => async (dispatch) => {
    
    try {
        const res = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

            
        if(res.status !== 200) {
            throw new Error("Authentication failed")
        }

        const data = await res.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId)
        localStorage.setItem("isAuth", true)
        localStorage.setItem("isAdmin", data.isAdmin);
        localStorage.setItem("isOwner", data.isOwner);

        dispatch({
            type: USER_LOGIN,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "Username or password are incorrect"
        })
    }
  
}

export const autoLogout = () => (dispatch) => {
    
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate')
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isOwner');
    
    dispatch({
        type: USER_LOGOUT,
        payload: false
    });
}

export const cancelError = () => (dispatch) => {
    dispatch({
        type: CANCEL_ERROR
    })
}


export const autoRedirect = () => (dispatch) => {
    dispatch({
        type: REDIRECT
    })
}