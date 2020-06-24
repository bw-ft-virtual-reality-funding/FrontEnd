import React, { useEffect, useState } from "react";
import FundraiserCard from "../fundraiser/FundraiserCard";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

const FundPage = props => {
    const [project, setProject] = useState({});

    const UrlId = useParams();
    const id = UrlId.id;

    useEffect(() => {
        axiosWithAuth()
            .get(`https://virtual-reality-fundraising.herokuapp.com/api/projects/${id}`)
            .then(res => {
                setProject(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id])


    return (
        <div className="full">
            <div className="projects">
                <FundraiserCard details={project} />
            </div>
            <button className="button">Pledge to Campaign</button>
        </div>
    )
}

export default FundPage;