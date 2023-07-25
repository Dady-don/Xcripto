import { Badge, Box, Button, Container, Progress, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, VStack } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../index'
import ErrorComponent from './ErrorComponent'
import { HStack,Radio,RadioGroup,Text,Image } from '@chakra-ui/react'
import Chart from './Chart'




const CoinDetails = () => {
  const params=useParams()

  const [coin,setCoin]= useState([])//default value as empty array
  const [loading,setLoading] =useState(true)
  const [error,setError]= useState(false)
  const [currency,setCurrency]=useState('inr')
  const [days,setDays]=useState('24h')
  const [chartArray,setChartArray]=useState([])

  const currencySymbol= currency==='inr'?'₹':currency==='eur'?'€':'$';

  const btns=['24h','7d','14d','30d','60d','200d','1y','max']

  const switchChartStats=(key)=>{
    switch (key) {
      case '24h':
        setDays('24h')
        setLoading(true)
        break;
        case '7d':
        setDays('7d')
        setLoading(true)
        break;
        case '14d':
        setDays('14d')
        setLoading(true)
        break;
        case '30d':
        setDays('30d')
        setLoading(true)
        break;
        case '60d':
        setDays('60d')
        setLoading(true)
        break;
        case '200d':
        setDays('200d')
        setLoading(true)
        break;
        case '1y':
        setDays('1y')
        setLoading(true)
        break;
        case 'max':
        setDays('max')
        setLoading(true)
        break;
    
      default:
        setDays('24h')
        setLoading(true)
        break;
    }
  }

  useEffect(()=>{

    const fetchCoin= async()=>{

      try {
        const {data}= await axios.get(`${server}/coins/${params.id}`) //fetching the array of crypto exchange data using coingecko api.

        const {data:chartData}= await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)


        // console.log(chartData)
        setChartArray(chartData.prices)
        setCoin(data) //setting the fetched data in the state variable
        setLoading(false )
      } catch (error) { 
        setLoading(false)
        setError(true)
        
        
      }
      
    }

    
    fetchCoin() //calling the function as soon as the component mounts.

  },[params.id,currency,days]) //fetch again if the value of id changes.

//Component to display if error occurs

if(error){
  return <ErrorComponent message={'Error while fetching Coins'}/>
}


  return (
    <Container maxW={'container.xl'}>
      {
        loading? <Loader/>: <>

        <Box borderWidth={'1'} width={'full'} >
        <Chart arr={chartArray} currency={currencySymbol} days={days}/>
        </Box>
        
        {/**button */}

        <HStack p={4} overflowX={'auto'}>
       { btns.map((i)=>(
          <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
        ))}
        </HStack>



        <RadioGroup value={currency} onChange={setCurrency} p={8}>
        <HStack spacing={4}>
          <Radio value={'inr'}>₹ INR </Radio>
          <Radio value={'eur'}>€ EUR</Radio>
          <Radio value={'usd'}>$ USD</Radio>
          
        </HStack>
      </RadioGroup>

      <VStack spacing={4} p={16} alignItems={'flex-start'}>

        <Text fontSize={'small'} alignSelf={'center'} opacity={0.7}> Last updated on {coin.market_data.last_updated.split('G')[0]}</Text>  {/**Splits the current date in two index, we need only the first part */}

        <Image src={coin.image.large} w={16} h={16} objectFit={'contain'}/> {/**currency image */}

        <Stat>
          <StatLabel>{coin.name}</StatLabel>
          <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber> {/**Getting the current price in current currency */}

          <StatHelpText>
            <StatArrow type={coin.market_data.price_change_percentage_24h>0?'increase':'decrease'}/>
            {coin.market_data.price_change_percentage_24h}%
          </StatHelpText>
        </Stat>

        <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
          {`#${coin.market_cap_rank}`} {/**gets the rank of the current crypto */}
        </Badge>

        <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/> {/**fetching the 24 hour high and low rates and passing as high and low */}

          <Box w={'full'} p={4}>
          <Item  title={'Max Supply'} value={coin.market_data.max_supply}/>

          <Item  title={'Circulating Supply'} value={coin.market_data.circulating_supply}/>

          <Item  title={'Market Capital'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>

          <Item  title={'All time low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
          <Item  title={'All time high'} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>

          </Box>
          
          

      </VStack>
        
        
        </>
      }
    </Container>
  )
}

const CustomBar=({high,low})=>(
  <VStack w={'full'}>
    <Progress value={50} colorScheme={'teal'} w={'full'}/> {/**Show the progress bar */}
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme={'red'} /> {/**Things that we need to wrap are passed as children  */}
      <Text fontSize={'sm'} >24H Range</Text>
      <Badge children={high} colorScheme={'green'}/>
    </HStack>
  </VStack>
)

const Item=({title,value})=>(
  <HStack justifyContent={'space-between'} w={'full'} my={4}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

export default CoinDetails
