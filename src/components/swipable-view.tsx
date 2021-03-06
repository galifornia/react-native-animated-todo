import { Box } from 'native-base'
import React from 'react'
import { Dimensions } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { makeStyledComponent } from '../utils/styled'

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  children: React.ReactNode
  backView?: React.ReactNode
  onSwipeLeft?: () => void
}

const StyledView = makeStyledComponent(Animated.View)

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2

const SwipableView = ({
  children,
  backView,
  onSwipeLeft,
  simultaneousHandlers,
}: Props) => {
  const translateX = useSharedValue(0)
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (ev) => {
      translateX.value = Math.max(-128, Math.min(0, ev.translationX))
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        onSwipeLeft && runOnJS(onSwipeLeft)()
      } else {
        translateX.value = withTiming(0)
      }
    },
  })

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }))

  return (
    <StyledView w="full">
      {backView && (
        <Box position="absolute" left={0} right={0} top={0} bottom={0}>
          {backView}
        </Box>
      )}
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <StyledView style={facadeStyle}>{children}</StyledView>
      </PanGestureHandler>
    </StyledView>
  )
}

export default SwipableView
