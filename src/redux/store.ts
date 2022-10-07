import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import alertsSlice from "./alertsSlice"
import userSlice from "./userSlice"

export const store = configureStore({
  reducer: {
    alerts: alertsSlice,
    user: userSlice
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
