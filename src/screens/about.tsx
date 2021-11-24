import { Feather } from '@expo/vector-icons'
import {
  Box,
  Icon,
  Image,
  ScrollView,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base'
import React from 'react'
import AnimatedColorBox from '../components/animated-color-box'
import LinkButton from '../components/link-button'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'

const About = () => (
  <AnimatedColorBox
    flex={1}
    bg={useColorModeValue('warmGray.50', 'warmGray.900')}
    w="full"
  >
    <Masthead
      title="About this app"
      image={require('../assets/about-masthead.png')}
    >
      <Navbar />
    </Masthead>
    <ScrollView
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      borderTopLeftRadius={20}
      borderRightRadius={20}
      mt={-20}
      pt={30}
      p={4}
    >
      <VStack flex={1} space={4}>
        <Box alignItems="center">
          <Image
            source={require('../assets/takuya.jpg')}
            borderRadius="full"
            resizeMode="cover"
            w={120}
            h={120}
            alt={'My image'}
          />
          <Text fontSize="md" w="full" mt={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            mollis lorem malesuada odio vehicula, sit amet posuere nibh
            consequat. Sed et quam ligula. Maecenas interdum ultrices est in
            maximus. Proin fermentum facilisis lorem a sodales. Curabitur
            malesuada pulvinar purus. Fusce fermentum nulla lectus. Mauris dolor
            erat, volutpat eu orci in, fringilla convallis leo. Nam non lorem
            ultricies, interdum nisi vel, rutrum lacus. Phasellus in lorem vitae
            tortor suscipit vehicula.
          </Text>
          <LinkButton
            w="full"
            colorScheme="red"
            size="lg"
            mt={4}
            borderRadius="full"
            leftIcon={
              <Icon as={Feather} name="youtube" size="sm" opacity={0.5} />
            }
            href="https://martingl.dev"
          >
            Go to my site
          </LinkButton>
          <LinkButton
            w="full"
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            size="lg"
            mt={4}
            borderRadius="full"
            leftIcon={
              <Icon as={Feather} name="twitter" size="sm" opacity={0.5} />
            }
            href="https://martingl.com"
          >
            Go to my blog
          </LinkButton>
        </Box>
      </VStack>
    </ScrollView>
  </AnimatedColorBox>
)

export default About
