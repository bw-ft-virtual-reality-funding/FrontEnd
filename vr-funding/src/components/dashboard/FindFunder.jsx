import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import gsap from 'gsap'
import { Button, Avatar } from '@material-ui/core'

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
      })

      .catch(err =>{
          console.log(err, 'This did not work')
      })
  }, [])

  console.log(funders)

funders.filter(data => {
    capital(data.name);
})
 
    return (
        <div className="full">
            <h2>Find a User</h2>
            <p>Here is a list of our current users</p>
       {funders.map((funder) =>{
           return (
               <>
            <div>{funder.name} -- {funder.role}</div>
            {/* <Button color="primary">Im a button</Button>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            </>
           )
       })}
      </div>
    )
}