import { Box, HStack, Text } from 'native-base'
import React, { useEffect, memo } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  strikethrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: React.ReactNode
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedHStack = Animated.createAnimatedComponent(HStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

const AnimatedTaskLabel = memo(
  ({
    strikethrough,
    textColor,
    inactiveTextColor,
    onPress,
    children,
  }: Props) => {
    const hstackOffset = useSharedValue(0)
    const hstackAnimatedStyles = useAnimatedStyle(
      () => ({
        transform: [{ translateX: hstackOffset.value }],
      }),
      [strikethrough]
    )

    const textColorProgress = useSharedValue(0)
    const textAnimatedStyles = useAnimatedStyle(
      () => ({
        color: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor]
        ),
      }),
      [strikethrough, textColor, inactiveTextColor]
    )

    const strikethroughWidth = useSharedValue(0)
    const strikethroughAnimatedStyles = useAnimatedStyle(
      () => ({
        width: `${strikethroughWidth.value * 100}%`,
        borderBottomColor: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor]
        ),
      }),
      [strikethrough, textColor, inactiveTextColor]
    )

    useEffect(() => {
      const easing = Easing.out(Easing.quad)
      if (strikethrough) {
        hstackOffset.value = withSequence(
          withTiming(4, { duration: 125, easing }),
          withTiming(0, { duration: 125, easing })
        )
        textColorProgress.value = withDelay(
          400,
          withTiming(1, { duration: 250, easing })
        )
        strikethroughWidth.value = withTiming(1, { duration: 250, easing })
      } else {
        hstackOffset.value = withSequence(
          withTiming(4, { duration: 125, easing }),
          withTiming(0, { duration: 125, easing })
        )
        strikethroughWidth.value = withTiming(0, { duration: 250, easing })
        textColorProgress.value = withDelay(
          400,
          withTiming(0, { duration: 250, easing })
        )
      }
      return () => {}
    })

    return (
      <Pressable onPress={onPress}>
        <AnimatedHStack alignItems="center" style={[hstackAnimatedStyles]}>
          <AnimatedText
            fontSize={19}
            noOfLines={1}
            isTruncated
            px={1}
            style={[textAnimatedStyles]}
          >
            {children}
          </AnimatedText>
          <AnimatedBox
            position="absolute"
            h={1}
            borderBottomWidth={1}
            style={[strikethroughAnimatedStyles]}
          />
        </AnimatedHStack>
      </Pressable>
    )
  }
)

export default AnimatedTaskLabel
