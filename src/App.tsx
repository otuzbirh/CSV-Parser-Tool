import './App.css'
import { Router } from './Router'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';


function App() {

  return (
    <>
      <MantineProvider defaultColorScheme="dark">
        <Notifications />
        <Router />
      </MantineProvider>;
    </>
  )
}

export default App
