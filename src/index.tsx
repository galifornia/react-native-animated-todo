import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import Sidebar from './components/sidebar'
import About from './screens/about'
import Main from './screens/main'

const Drawer = createDrawerNavigator()
const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="main"
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
      }}
    >
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  )
}

export default App
