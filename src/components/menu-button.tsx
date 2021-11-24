import { Feather } from '@expo/vector-icons'
import { Button, IButtonProps, Icon, useColorModeValue } from 'native-base'
import React from 'react'

interface Props extends IButtonProps {
  active: boolean
  icon: string
  children: React.ReactNode
}

const MenuButton = ({ active, icon, children, ...props }: Props) => {
  const colorMode = useColorModeValue('blue', 'darkBlue')
  const inactiveTextColor = useColorModeValue('blue.500', undefined)
  const pressedBgColor = useColorModeValue('primary.100', 'primary.600')

  return (
    <Button
      size="lg"
      colorScheme={colorMode}
      bg={active ? undefined : 'transparent'}
      _pressed={{
        bg: pressedBgColor,
      }}
      _text={{
        color: active ? 'blue.50' : inactiveTextColor,
      }}
      variant="solid"
      justifyContent="flex-start"
      leftIcon={<Icon as={Feather} name={icon} size="sm" opacity={0.5} />}
      {...props}
    >
      {children}
    </Button>
  )
}

export default MenuButton
