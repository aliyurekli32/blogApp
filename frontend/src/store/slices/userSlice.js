import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name: "user",
    initialState: {
        id:"",
        refresh:"",
        access:"",
        username:"",
        first_name:"",
        last_name:"",
        email:"",
        bio:"",
        image:"",
        superA: false,
        action: 0
    },
    reducers:{
        getUser: (state,action)=>{
            state.id=action.payload?.id || state.id
            state.username=action.payload?.username || state.username
            state.access=action.payload?.access || state.access
            state.refresh=action.payload?.refresh || state.refresh
            state.first_name=action.payload?.first_name || state.first_name
            state.last_name=action.payload?.last_name || state.last_name
            state.email=action.payload?.email || state.email
            state.bio=action.payload?.bio || state.bio
            state.superA=action.payload?.is_superuser || state.superA
            state.image=action.payload?.image || state.image

        },
        logoutUser: (state)=>{
            state.id=""
            state.username=""
            state.access=""
            state.refresh=""
            state.first_name=""
            state.last_name=""
            state.email=""
            state.bio=""
            state.image=""
            state.superA=false
        },
        actionGet: (state)=>{
            console.log(state.action)
            state.action = state.action + 1
        },
    
    }
})

export const {actionGet,getUser,logoutUser}=userSlice.actions;
export default userSlice.reducer;