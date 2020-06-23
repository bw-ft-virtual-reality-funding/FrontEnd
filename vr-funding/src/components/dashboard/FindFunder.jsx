import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//Will work on this more tomorrow 
const initialFunder = []

export default function FindFunder () {
  const [funders, setFunders] = useState(initialFunder)
  

  useEffect (() => {

      axiosWithAuth().get('https://virtual-reality-fundraising.herokuapp.com/api/users')

      .then(response =>{
          console.log(response)
          setFunders(response.data)
      })

      .catch(err =>{
          console.log(err, 'This did not work')
      })
  }, [])


 
    return (
    <div>
       hello
   </div>
    )
}