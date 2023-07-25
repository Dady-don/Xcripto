import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'

ChartJS.register( //doesnt work without this step{mandatory}
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Chart = ({arr=[],currency,days}) => {
    // console.log(arr)
    const prices=[]
    const date=[]

    //Looping through the array fetched from chartData
    for (let index = 0; index < arr.length; index++) {

        //If days is set to 24 hours show the data time wise else date wise
        if(days==="24h"){ 
         date.push(new Date(arr[index][0]).toLocaleTimeString())
         
        }
        else{
            date.push(new Date(arr[index][0]).toLocaleDateString()) //toLocaleString() provides only the date, ignores the rest.
        }
        
        prices.push(arr[index][1])
        // console.log(date.toLocaleTimeString())
        
    }
    

  return (
    <>
    <Line options={{
        responsive:true,
    }}
    data={{labels:date, //x-direction label of the chart
        datasets:[{  //No of datasets equals no of graphs
            label:`Price in ${currency}`,
            data: prices,
            borderColor:'rgb(255,99,132)',
            backgroundColor:'rgba(255,99,132,0.5)'
        }]
    }}
    />
    
    
    </>
  )
}

export default Chart

