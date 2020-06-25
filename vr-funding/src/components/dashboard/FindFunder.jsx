import React, { useState, useEffect, useRef } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import gsap from "gsap";
import { Card } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles } from "@material-ui/core/styles";
import funder from "../styles/images/funder.png";
import fundraiser from "../styles/images/fundraiser.png";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    height: "125px",
    width: "300px",
    margin: "10px",
    textAlign: "center",
    padding: "40px 20px",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: '100%',
    height: '100vh',
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
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: "40px",
    paddingLeft: "10px",
  },

  pTag: {
    fontSize: "20px",
    paddingBottom: "30px",
  },

  cards: {
    maxWidth: "1200px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },

  h3Style: {
    fontSize: "18px",
    paddingBottom: "10px",
  },

  role: {
    textTransform: "uppercase",
    padding: "10px",
  },

  img: {
    width: "50px",
    marginTop: "5px",
  },
}));

const initialFunder = [];

export default function FindFunder() {
  const classes = useStyles();
  const [funders, setFunders] = useState(initialFunder);

  //start of animations
  
  
  

  useEffect(() => {
    axiosWithAuth()
      .get("https://virtual-reality-fundraising.herokuapp.com/api/users")
      .then((response) => {
        // console.log(response.data);
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
  //   console.log(funders);

  return (
    <div className={classes.center} height>
      <div className={classes.flex}>
        <h2 className={classes.h2Style}>
          VRFP Users <FaceIcon className={classes.icon} />
        </h2>
        <p className={classes.pTag}>Here is a list of our current users</p>
      </div>

      <div className={classes.cards}>
        {funders.map((data) => {
          capital(data.name);
          if (capital(data.name) === true && data.role === "funder") {
            return (
              <Card id="spin" className={classes.root}>
                <h3 className={classes.h3Style}>{data.name}</h3>
                <div className={classes.role}>{data.role}</div>
                <hr width="50%" />
                <div>
                  <img className={classes.img} src={funder}></img>
                </div>
              </Card>
            );
          } else if (
            capital(data.name) === true &&
            data.role === "fundraiser"
          ) {
            return (
              <Card id="spin" className={classes.root}>
                <h3 className={classes.h3Style}>{data.name}</h3>
                <div className={classes.role}>{data.role}</div>
                <hr width="50%" />
                <div>
                  <img className={classes.img} src={fundraiser}></img>
                </div>
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
}

gsap.to("#spin", { rotation: 27, x: 100, duration: 1 });
