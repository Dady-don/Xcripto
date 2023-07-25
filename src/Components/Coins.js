import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'


const Coins = () => {

  const [coins,setCoins]= useState([])//default value as empty array
  const [loading,setLoading] =useState(true)
  const [error,setError]= useState(false)
  const[page,setPage]= useState(1)
  const [currency,setCurrency]=useState('inr')

  const currencySymbol= currency==='inr'?'₹':currency==='eur'?'€':'$';

  const changePage=(page)=>{

    
    setLoading(true)
    setPage(page)
    // setPage(event.selected)
    
  }

  const btns= new Array(110).fill(1) //creating a new array of length 132 and filling all of them with 1


  useEffect(()=>{

    const fetchCoins= async()=>{
     
      try {
        const {data}= await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`) //fetching the array of crypto coins data using coingecko api.
        // console.log(data)
        setCoins(data) //setting the fetched data in the state variable
        
        setLoading(false )
      } catch (error) {
        setLoading(false)
        setError(true)
        
        
      }
      
    }

    
    fetchCoins() //calling the function as soon as the component mounts.

  },[currency,page]) //fetch again if the value of currency or page changes.

//Component to display if error occurs

  if(error){
    return <ErrorComponent message={'Error while fetching Coins'}/>
  }

  // const itemsPerPage= 100;
  // const pageCount=Math.ceil(coins.length/itemsPerPage);
  // console.log(pageCount)

  return (
    <Container maxW={'container.xl'}>

      {loading? <Loader/>:<>

      <RadioGroup value={currency} onChange={setCurrency} p={8}>
        <HStack spacing={4}>
          <Radio value={'inr'}>₹ INR </Radio>
          <Radio value={'eur'}>€ EUR</Radio>
          <Radio value={'usd'}>$ USD</Radio>
          
        </HStack>
      </RadioGroup>
      
      <HStack wrap={'wrap'} justifyContent={'space-evenly'}> {/**Responsive design */}

        {coins.map((i)=>( //Preparing card for each element
            <CoinCard key={i.id} id={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price} currencySymbol={currencySymbol}/>
            
        ))
        }
      </HStack>
      <HStack w={'full'} overflowX={'auto'} p={8}>
        {
          btns.map((item,index)=>(
            <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}>{index+1}</Button>
          ))
        }
      </HStack>
    {/* <HStack w={'full'} overflowX={'auto'} p={8}>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={changePage}
        initialPage={0}
        pageRangeDisplayed={5}
        pageCount={132}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      /> */}

    {/* </HStack> */}
      
      </>} 
    </Container>
  )
}


export default Coins
