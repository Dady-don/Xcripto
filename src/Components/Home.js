import { Box,Image,Text } from '@chakra-ui/react'
import React from 'react'
import img from '../Images/btc.png'
import {motion} from 'framer-motion'


const Home = () => {
  return (
    
    <Box className='box' bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
     <motion.div style={{
      height:'80vh',
     }}
     animate={{
      translateY:'20px'
     }}
     transition={{
      duration:2,
      repeat:Infinity,
      repeatType:'reverse'

     }}>

     <Image w={'full'} h={'full'} objectFit={'contain'} src={img} filter={'grayscale(1)'} />
     </motion.div>

      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'whiteAlpha.700'} zIndex={10} mt={-20} >Xcripto</Text>
    </Box>
  )
}

export default Home
