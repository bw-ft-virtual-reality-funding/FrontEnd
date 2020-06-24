import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import gsap from "gsap";
import { Button, Avatar } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      height: '100px',
      marginBottom: '10px',
    },
  }));
  




const initialFunder = [];

export default function FindFunder() {
  const classes = useStyles();
  const [funders, setFunders] = useState(initialFunder);

  useEffect(() => {
    axiosWithAuth()
      .get("https://virtual-reality-fundraising.herokuapp.com/api/users")

      .then((response) => {
        // console.log(response.data);
        setFunders(response.data);
      })

      .catch((err) => {
        console.log(err, "This did not work");
      });
  }, []);

  const capital = (str) => {
    const firstLetter = str.substring(0, 1);

    if (firstLetter == firstLetter.toUpperCase()) {
      return true;
    } else return false;
  };
 

  return (
    <div className="full">
      <h2>Find a User</h2>
      <p>Here is a list of our current users</p>

     {funders.map((data) => {
         capital(data.name)
         if(capital(data.name) === true) {
             return (
                 <Card className={classes.root}>
                  <CardHeader>{data.name}</CardHeader>
                 </Card>
                     
             )
         }
     })}
    </div>
  );
}
