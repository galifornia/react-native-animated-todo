import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
  VStack,
} from 'native-base'
import React, { useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import AnimatedColorBox from './animated-color-box'
import MenuButton from './menu-button'
import ThemeToggle from './theme-toggle'

type Props = {} & {
  [prop: string]: any
}

const Sidebar = ({ state, navigation }: DrawerContentComponentProps) => {
  const currentRoute = state.routeNames[state.index]
  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])

  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main')
  }, [navigation])

  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('About')
  }, [navigation])

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'darkBlue.700'),
            }}
          />
        </HStack>
        <Avatar
          source={require('../assets/profile-image.png')}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="secondary.700"
          borderWidth={3}
        />
        <Heading mb={4} size="xl">
          Martin Gomez Loira
        </Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon="inbox"
        >
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === 'About'}
          onPress={handlePressMenuAbout}
          icon="info"
        >
          About
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  )
}

export default Sidebar
