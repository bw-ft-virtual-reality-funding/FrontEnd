import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//Will work on this more tomorrow 
const initialFunder = []

export default function FindFunder () {
  const [funders, setFunders] = useState(initialFunder)

  const capital = (str) => {
        const firstLetter = str.substring(0, 1);

        if (firstLetter == firstLetter.toUpperCase()) {
            return true
        } else return false
  }
  

  useEffect (() => {

      axiosWithAuth().get('https://virtual-reality-fundraising.herokuapp.com/api/users')

      .then(response =>{
          console.log(response.data)
          setFunders(response.data)
          setFunders(funders.filter(data => capital(data.name)));
      })

      .catch(err =>{
          console.log(err, 'This did not work')
      })
  }, [])

  console.log(funders)
 
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