import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import About from './screens/about'
import Main from './screens/main'

const Drawer = createDrawerNavigator()
const App = () => {
  return (
    <Drawer.Navigator initialRouteName="main">
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  )
}

export default App
