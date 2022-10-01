import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import User from "../types/User";

const initialState = {
    username: {} as User,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUser: (state, action: PayloadAction<User>) => {
            state.username = action.payload
            return state
        }
    }
})

export const { changeUser } = userSlice.actions;
export default userSlice.reducer;