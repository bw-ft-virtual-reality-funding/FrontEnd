import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import gsap from 'gsap'
import { Button } from '@material-ui/core'

//Will work on this more tomorrow 
const initialFunder = []

export default function FindFunder () {
  const [funders, setFunders] = useState(initialFunder)
  

  useEffect (() => {

      axiosWithAuth().get('https://virtual-reality-fundraising.herokuapp.com/api/users')

      .then(response =>{
          console.log(response.data)
          setFunders(response.data)
      })

      .catch(err =>{
          console.log(err, 'This did not work')
      })
  }, [])

  
 
    return (
        <div className="full">
            <h2>Find a User</h2>
            <p>Here is a list of our current users</p>
       {funders.map((funder) =>{
           return (
            <div>{funder.name} -- {funder.role}</div>
           )
       })}
      </div>
    )
}