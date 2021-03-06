import * as React from 'react'
import { VStack, useColorModeValue, Fab, Icon } from 'native-base'

import { AntDesign } from '@expo/vector-icons'
import shortid from 'shortid'
import TaskList from '../components/task-list'
import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy milk',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Buy tickets for movie',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Publish daily post',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Yesterdays post',
    done: true,
  },
]

const Main = () => {
  const [data, setData] = React.useState(initialData)
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null)

  const handleToggleTaskItem = React.useCallback((item) => {
    setData((prevData) => {
      const newData = [...prevData]
      const idx = prevData.indexOf(item)
      newData[idx] = {
        ...item,
        done: !item.done,
      }

      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = React.useCallback((item, newSubject) => {
    setData((prevData) => {
      const newData = [...prevData]
      const idx = prevData.indexOf(item)
      newData[idx] = {
        ...item,
        subject: newSubject,
      }

      return newData
    })
  }, [])

  const handleFinishEditingTaskItem = React.useCallback((item) => {
    setEditingItemId(null)
  }, [])

  const handlePressTaskItem = React.useCallback((item) => {
    setEditingItemId(item.id)
  }, [])

  const handleRemoveItem = React.useCallback((item) => {
    setData((prevData) => {
      const newData = prevData.filter((i) => item !== i)
      return newData
    })
  }, [])

  return (
    <AnimatedColorBox
      bg={useColorModeValue('warmGrey.50', 'primary.900')}
      w="full"
      flex={1}
    >
      <Masthead title="What's up" image={require('../assets/masthead.png')}>
        <Navbar />
      </Masthead>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        borderTopLeftRadius={20}
        borderRightRadius={20}
        mt={-20}
        pt={30}
        p={4}
      >
        <TaskList
          data={data}
          editingItemId={editingItemId}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressedLabel={handlePressTaskItem}
          onRemoveItem={handleRemoveItem}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([{ id, subject: '', done: false }, ...data])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}

export default Main
