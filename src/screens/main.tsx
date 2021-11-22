import * as React from 'react'
import { Center, Box, Text, VStack, useColorModeValue } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import TaskItem from '../components/task-item'

const Main = () => {
  const [checked, setChecked] = React.useState(false)
  const [subject, setSubject] = React.useState('Task Item')
  const [isEditing, setIsEditing] = React.useState(false)

  const handlePressCheckbox = React.useCallback(() => {
    setChecked((prev) => !prev)
  }, [])
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskItem
          isDone={checked}
          onToggle={handlePressCheckbox}
          subject={subject}
          onChangeSubject={setSubject}
          isEditing={isEditing}
          onPressLabel={() => setIsEditing(true)}
          onFinishEditing={() => setIsEditing(false)}
        />

        <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
          <Text>Hola</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default Main
