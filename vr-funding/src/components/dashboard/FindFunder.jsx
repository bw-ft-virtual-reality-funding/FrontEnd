import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import gsap from "gsap";
import { Card } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: "300px",
    width: "400px",
    marginBottom: "10px",
    textAlign: "center",
  },

  flex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  h2Style: {
    fontSize: "30px",
    padding: "50px 0 20px 0",
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: "40px",
    paddingLeft: '10px',
  },

  pTag: {
    fontSize: "20px",
    paddingBottom: "30px",
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
        console.log(response.data);
        //   setFunders(response.data)
        setFunders(response.data.filter((data) => capital(data.name)));
      })

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
  console.log(funders);

 

  return (
    <div className="full">
      <div className={classes.flex}>
        <h2 className={classes.h2Style}>
          VRFP Users <FaceIcon className={classes.icon} />
        </h2>
        <p className={classes.pTag}>Here is a list of our current users</p>
      </div>
      {funders.map((data) => {
        capital(data.name);
        if (capital(data.name) === true) {
          return (
            <Card  className={classes.root}>
              <h3>{data.name}</h3>
              <div>{data.role}</div>
          {/* <icon>😁{}</icon> */}
            </Card>
          );
        }
      })}
    </div>
  );
}
