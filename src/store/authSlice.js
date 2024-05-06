import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,  //to track user authenicated or not
    userData: null //stores the userData when authenticated
    
}

const authSlice = createSlice({
    name: "auth", //name of slice
    initialState, //sets initial state
    reducers: {  //inside reducers obj,2 reducer functions login and logout responsible for updating state based on dispatched actions
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData; //action.payload.userdata contains userdata while logged in 
        },
        logout: (state) => {
            state.status = false;
            state.userData = null; ////action.payload.userdata contains userdata while logged out
        }
     }
})

export const {login, logout} = authSlice.actions;  //export reducer functions using authslice.actions

export default authSlice.reducer;