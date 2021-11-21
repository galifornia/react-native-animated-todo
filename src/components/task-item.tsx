import * as React from 'react'
import {
  Box,
  HStack,
  themeTools,
  useColorModeValue,
  useTheme,
  Icon,
} from 'native-base'
import { Pressable } from 'react-native'
import AnimatedCheckbox from './animated-checkbox'
import AnimatedTaskLabel from './animated-task-label'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import SwipableView from './swipable-view'
import { Feather } from '@expo/vector-icons'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isDone: boolean
  onToggle: () => void
  onPressLabel?: () => void
  onRemove?: () => void
  subject: string
}

const TaskItem = ({
  isDone,
  onToggle,
  onPressLabel,
  onRemove,
  subject,
  simultaneousHandlers,
}: Props) => {
  const theme = useTheme()
  const highlightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.400')
  )
  const boxStroke = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500')
  )
  const checkmarkColor = themeTools.getColor(theme, 'white')
  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  )
  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600')
  )

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}
        >
          <Icon color="white" as={<Feather name="trash-2" />} size="sm"></Icon>
        </Box>
      }
    >
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggle}>
            <AnimatedCheckbox
              checked={isDone}
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxStroke={boxStroke}
            />
          </Pressable>
        </Box>
        <AnimatedTaskLabel
          textColor={activeTextColor}
          inactiveTextColor={doneTextColor}
          strikethrough={isDone}
        >
          {subject}
        </AnimatedTaskLabel>
      </HStack>
    </SwipableView>
  )
}

export default TaskItem
