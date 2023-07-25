import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container, HStack } from '@chakra-ui/react'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard'
import ErrorComponent from './ErrorComponent'


const Exchanges = () => {

  const [exchanges,setExchanges]= useState([])//default value as empty array
  const [loading,setLoading] =useState(true)
  const [error,setError]= useState(false)

  useEffect(()=>{

    const fetchExchanges= async()=>{

      try {
        const {data}= await axios.get(`${server}/exchanges`) //fetching the array of crypto exchange data using coingecko api.
      // console.log(data)
      setExchanges(data) //setting the fetched data in the state variable
      setLoading(false )
      } catch (error) {
        setLoading(false)
        setError(true)
        
        
      }
      
    }

    
    fetchExchanges() //calling the function as soon as the component mounts.

  },[])

//Component to display if error occurs

  if(error){
    return <ErrorComponent message={'Error while fetching Exchanges'}/>
  }


  return (
    <Container maxW={'container.xl'}>

      {loading? <Loader/>:<>
      
      <HStack wrap={'wrap'} justifyContent={'space-evenly'}> {/**Responsive design */}

        {exchanges.map((i)=>(
            <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url}/>
            
        ))
        }
      </HStack>
      </>} 
    </Container>
  )
}


export default Exchanges
