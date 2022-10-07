import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from "@mantine/notifications"
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import reportWebVitals from './reportWebVitals'
import {store} from "./redux/store"
import App from './App'

import "@fontsource/montserrat"
import "@fontsource/montserrat/500.css"
import 'remixicon/fonts/remixicon.css'
import './index.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <NotificationsProvider position="top-right">
                <Provider store={store}>
                    <PersistGate persistor={persistStore(store)}>
                        <App/>
                    </PersistGate>
                </Provider>
            </NotificationsProvider>
        </MantineProvider>
    </React.StrictMode>
)
reportWebVitals()
