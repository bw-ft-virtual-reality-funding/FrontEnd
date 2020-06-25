import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import FundraiserForm from "./fundraiser/FundraiserForm";
import { VRContext } from "../context/VRContext";
import axios from "axios";
import { useTimeMessage } from "./hooks/useTimeMessage";
import DashNav from "./dashNav";
import ProjectView from "./funder/ProjectsView";
import EditUser from "./editUser";
import FindFunder from "./FindFunder";
import FundPage from "./funder/fundPage";
import defaultPFP from "../styles/images/defaultPFP.jpg";


const Dashboard = props => {
    const [userDetails, setUserDetails] = useContext(VRContext);
    const [greet] = useTimeMessage("Good Morning", "Good Afternoon");
    const [PFP, setPFP] = useState(defaultPFP);

    useEffect(() => {
        const loggedID = localStorage.getItem("id");

            if (localStorage.getItem("pfp")) {
                setPFP(JSON.parse(localStorage.getItem("pfp")));
            } else {
                setPFP(defaultPFP);
            }

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
                        <img src={PFP} className="pfp" />
                        <p>{userDetails.role}</p>
                        <div className="buttons">
                            <Link className="button" to="/dashboard/edit" >Settings</Link>
                            <Link className="button" to="/dashboard/FindFunder">Find Users</Link>
                        </div>

                        {
                            userDetails.role === "fundraiser"
                                ? <Link className="button" to="/dashboard/view">View Projects</Link>
                                : ""
                        }

                    </div>
                </PrivateRoute>
                <PrivateRoute path="/dashboard/add">
                    <FundraiserForm
                        URL={'https://virtual-reality-fundraising.herokuapp.com/api/projects'}
                        put="false"
                        values={false}
                        setIsEditing={false}
                    />
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
                    <FindFunder />
                </PrivateRoute>

            </Router>
        </div>
    )
}

export default Dashboard;