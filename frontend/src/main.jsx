import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import { Notifications } from "@mantine/notifications";
import '@mantine/core/styles.css'
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { theme } from './theme/theme'; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme='light' >
        <Notifications position='top-right' zIndex={9999} />
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
