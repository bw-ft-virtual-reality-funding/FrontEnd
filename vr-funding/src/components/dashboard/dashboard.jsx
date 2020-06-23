import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import FundraiserForm from "./fundraiser/FundraiserForm";
import { VRContext } from "../context/VRContext";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import DashNav from "./dashNav";

const Dashboard = props => {
    const [userDetails, setUserDetails] = useContext(VRContext);

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
                <h2>{`Hello, ${userDetails.name}!`}</h2>
                </PrivateRoute>
                <PrivateRoute path="/dashboard/add">
                    <FundraiserForm />
                </PrivateRoute>
            </Router>
        </div>
    )
}

export default Dashboard;