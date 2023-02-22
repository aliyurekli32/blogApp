import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name: "user",
    initialState: {
        refresh:"",
        access:"",
        username:"",    
    },
    reducers:{
        getUser: (state,action)=>{
            state.username=action.payload?.username || ""
            state.access=action.payload?.access
            state.refresh=action.payload?.refresh
        },
        logoutUser: (state)=>{
            state.username=""
            state.access=""
            state.refresh=""
        }
    
    }
})

export const {getUser,logoutUser}=userSlice.actions;
export default userSlice.reducer;