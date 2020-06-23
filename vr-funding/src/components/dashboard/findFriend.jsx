import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import axios from 'axios'


const initialFriend = []

export default function FindFriend () {
  const [friends, setFriends] = useState(initialFriend)
  

  useEffect (() => {

      axios.get('https://virtual-reality-fundraising.herokuapp.com/api/users')

      .then(response =>{
          console.log(response)
          setFriends(response.data)
      })

      .catch(err =>{
          console.log(err, 'This did not work')
      })
  }, [])

  
 
    return (<div>Hello</div>)
}