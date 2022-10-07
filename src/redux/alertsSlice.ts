import {createSlice} from "@reduxjs/toolkit"

export interface AlertsState {
    loading: boolean
}

const initialState: AlertsState = {
    loading: false
}


const alertsSlice = createSlice({
        name: "alerts",
        initialState,
        reducers: {
            ShowLoading: state => {
                state.loading = true
            },
            HideLoading: state => {
                state.loading = false
            }
        }
    }
)
export const {ShowLoading, HideLoading} = alertsSlice.actions
export default alertsSlice.reducer
