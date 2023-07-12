import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
    username: string;
}

const initialState: UserState = {
    username: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUsernameSlice: (state: { username: string; }, action:PayloadAction<string>) => {
            state.username = action.payload
        }
    }
})

export const { setUsernameSlice } = userSlice.actions

export default userSlice.reducer



