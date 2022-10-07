import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from "@mantine/notifications"
import App from './App'
import reportWebVitals from './reportWebVitals'
import {store} from "./redux/store"

import "@fontsource/montserrat"
import "@fontsource/montserrat/500.css"
import './index.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <NotificationsProvider position="top-right">
                <Provider store={store}>
                    <App/>
                </Provider>
            </NotificationsProvider>
        </MantineProvider>
    </React.StrictMode>
)
reportWebVitals()
