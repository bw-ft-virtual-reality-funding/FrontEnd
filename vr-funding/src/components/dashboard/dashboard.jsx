import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import FundraiserForm from "./fundraiser/FundraiserForm";
import { VRContext } from "../context/VRContext";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";
import { useTimeMessage } from "./hooks/useTimeMessage";
import DashNav from "./dashNav";
import ProjectView from "./funder/ProjectsView";
import EditUser from "./editUser";
import  FindFunder from "./FindFunder";
import FundPage from "./funder/fundPage";


const Dashboard = props => {
    const [userDetails, setUserDetails] = useContext(VRContext);
    const [greet] = useTimeMessage("Good Morning", "Good Afternoon");

    useEffect(() => {
        const loggedID = localStorage.getItem("id");

        axios
            .get(`https://virtual-reality-fundraising.herokuapp.com/api/users/${loggedID}`)
            .then(res => {
                // console.log(res);
                setUserDetails(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="dashboard">
            <DashNav />
            <Router>
                <PrivateRoute path="/dashboard/profile">
                    <div className="welcome">
                        <h2>{`${greet}, ${userDetails.name}`}</h2>
                        <p>{userDetails.role}</p>
                        <Link className="button" to="/dashboard/edit" >Settings</Link>
                    </div>
                </PrivateRoute>
                <PrivateRoute path="/dashboard/add">
                    <FundraiserForm />
                </PrivateRoute>
                <PrivateRoute path="/dashboard/view" exact>
                    <ProjectView />
                </PrivateRoute>
                <PrivateRoute path="/dashboard/view/:id">
                    <FundPage />
                </PrivateRoute>
                <PrivateRoute path="/dashboard/edit">
                    <EditUser />
                </PrivateRoute>
                <PrivateRoute path="/dashboard/FindFunder">
                   <FindFunder/>
                </PrivateRoute>
            </Router>
        </div>
    )
}

export default Dashboard;