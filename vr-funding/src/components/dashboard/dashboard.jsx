import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import FundraiserForm from "./fundraiser/FundraiserForm";
import { VRContext } from "../context/VRContext";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {useTimeMessage} from "../hooks/useTimeMessage";
import DashNav from "./dashNav";

const Dashboard = props => {
    const [userDetails, setUserDetails] = useContext(VRContext);
    const [greet] = useTimeMessage("Good Morning", "Good Afternoon");

    // useEffect(() => {
    //     const loggedID = localStorage.getItem("id");

    //     axiosWithAuth()
    //         .get(`https://virtual-reality-fundraising.herokuapp.com/api/user/${loggedID}`)
    //         .then(res => {
    //             console.log(res);
    //             // setUserDetails(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [])

    return (
        <div className="dashboard">
            <DashNav />
            <Router>
                <PrivateRoute path="/dashboard/profile">
                    <div className="welcome">
                        <h2>{`${greet}, ${userDetails.name}`}</h2>
                        <button className="button">Settings</button>
                    </div>
                </PrivateRoute>
                <PrivateRoute path="/dashboard/add">
                    <FundraiserForm />
                </PrivateRoute>
            </Router>
        </div>
    )
}

export default Dashboard;