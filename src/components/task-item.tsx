import * as React from 'react'
import { Box, themeTools, useColorModeValue, useTheme } from 'native-base'
import { Pressable } from 'react-native'
import AnimatedCheckbox from './animated-checkbox'

type Props = {
  isDone: boolean
  onToggle: () => void
}

const TaskItem = ({ isDone, onToggle }: Props) => {
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
  )
}

export default TaskItem
