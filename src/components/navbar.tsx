import React, { useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { HStack, IconButton } from 'native-base'

interface Props {}

const Navbar = ({}: Props) => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])
  return (
    <HStack w="full" h={40} alignItems="center" alignContent="center" p={4}>
      <IconButton
        onPress={handlePressMenuButton}
        borderRadius={100}
        _icon={{ as: Feather, name: 'menu', size: 6, color: 'white' }}
      />
    </HStack>
  )
}

export default Navbar
