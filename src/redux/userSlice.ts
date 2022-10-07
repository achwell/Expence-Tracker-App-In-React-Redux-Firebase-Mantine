import {createSlice} from "@reduxjs/toolkit"
import UserType from "../types/UserType"

export interface UserState {
    user?: UserType
}

const initialState: UserState = {
    user: undefined
}


const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
            setUser: (state, action) => {
                state.user = action.payload
            }
        }
    }
)
export const {setUser} = userSlice.actions
export default userSlice.reducer
