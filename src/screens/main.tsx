import * as React from 'react'
import { Center, Box, Text, VStack, useColorModeValue } from 'native-base'
import ThemeToggle from '../components/theme-toggle'

const Main = () => (
  <Center
    _dark={{ bg: 'blueGray.900' }}
    _light={{ bg: 'blueGray.50' }}
    px={4}
    flex={1}
  >
    <VStack space={5} alignItems="center">
      <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
        <Text>Hola</Text>
      </Box>
      <ThemeToggle />
    </VStack>
  </Center>
)

export default Main
