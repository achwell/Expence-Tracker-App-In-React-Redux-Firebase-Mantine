import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import {persistReducer} from "redux-persist"
import {combineReducers} from "redux"
import storage from "redux-persist/lib/storage"
import thunk from 'redux-thunk'
import alertsSlice from "./alertsSlice"
import userSlice from "./userSlice"

const reducers = combineReducers({
    alerts: alertsSlice,
    user: userSlice
})
const persistedReducer = persistReducer({key: "main-root", storage}, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
