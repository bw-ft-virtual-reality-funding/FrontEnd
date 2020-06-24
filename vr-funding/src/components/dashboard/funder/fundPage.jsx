import React, { useState, useEffect } from 'react'
import FundraiserCard from "../fundraiser/FundraiserCard";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import FundraiserForm from '../fundraiser/FundraiserForm';

const FundPage = props => {
    const [project, setProject] = useState({});
    const [isEditing, setIsEditing] = useState(false);

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
            {
                isEditing
                    ?
                    <div className="modal openModal">
                        <div className="cancelX" onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(false)
                        }}>X</div>
                        <FundraiserForm
                            URL={`https://virtual-reality-fundraising.herokuapp.com/api/projects/${id}`}
                            values={project}
                            put="true"
                            setIsEditing={setIsEditing}
                            id={id}
                        />
                    </div>
                    : ""
            }

            <div className="projects">
                <FundraiserCard details={project} />
            </div>
            <div className="buttons">
                <button className="button pledge">Pledge to Campaign</button>
                <button className="button" onClick={() => setIsEditing(true)}>Edit</button>
            </div>
        </div>
    )
}

export default FundPage;