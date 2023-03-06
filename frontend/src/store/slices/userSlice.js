import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name: "user",
    initialState: {
        id:"",
        refresh: false,
        username:"",
        first_name:"",
        last_name:"",
        email:"",
        bio:"",
        image:"",
        superA: false,
        action: 0,
        accessExpire:"",
        refreshExpire:"",
    },
    reducers:{
        getUser: (state,action)=>{
            state.id=action.payload?.id || state.id
            state.refresh=action.payload?.refresh || state.refresh
            state.username=action.payload?.username || state.username
            state.first_name=action.payload?.first_name || state.first_name
            state.last_name=action.payload?.last_name || state.last_name
            state.email=action.payload?.email || state.email
            state.bio=action.payload?.bio || state.bio
            state.superA=action.payload?.is_superuser || state.superA
            state.image=action.payload?.image || state.image

        },
        logoutUser: (state)=>{
            state.id=""
            state.refresh=false
            state.username=""
            state.first_name=""
            state.last_name=""
            state.email=""
            state.bio=""
            state.image=""
            state.superA=false
            state.accessExpire=""
            state.refreshExpire=""
        },
        actionGet: (state)=>{

            state.action = state.action + 1
        },
        setTokTime: (state,action)=>{
            state.accessExpire=action?.payload?.accessExpire || state.accessExpire
            state.refreshExpire=action?.payload?.refreshExpire || state.refreshExpire
        },
        setAccess: (state,action)=>{
            state.accessExpire=action?.payload?.accessExpire || state.accessExpire
        }
    
    }
})

export const {actionGet,getUser,logoutUser,setTokTime,setAccess}=userSlice.actions;
export default userSlice.reducer;