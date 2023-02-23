import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name: "user",
    initialState: {
        refresh:"",
        access:"",
        username:"",
        first_name:"",
        last_name:"",
        email:"",
        bio:"",
        image:""

    },
    reducers:{
        getUser: (state,action)=>{
            state.username=action.payload?.username || state.username
            state.access=action.payload?.access || state.access
            state.refresh=action.payload?.refresh || state.refresh
            state.first_name=action.payload?.first_name || state.first_name
            state.last_name=action.payload?.last_name || state.last_name
            state.email=action.payload?.email || state.email
            state.bio=action.payload?.bio || state.bio
            state.image=action.payload?.image || state.image
        },
        logoutUser: (state)=>{
            state.username=""
            state.access=""
            state.refresh=""
            state.first_name=""
            state.last_name=""
            state.email=""
            state.bio=""
            state.image=""
        }
    
    }
})

export const {getUser,logoutUser}=userSlice.actions;
export default userSlice.reducer;