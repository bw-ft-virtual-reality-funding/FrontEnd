import React, { useState, useEffect, Children } from 'react'
import FundraiserCard from "../fundraiser/FundraiserCard";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import FundraiserForm from '../fundraiser/FundraiserForm';
import { loadStripe } from "@stripe/stripe-js";
import PaymentDetails from "./paymentDetails";

const FundPage = props => {
    const [project, setProject] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFunding, setIsFunding] = useState(false);

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

    const onDelete = (e) => {
        e.preventDefault()

        axiosWithAuth()
            .delete(`https://virtual-reality-fundraising.herokuapp.com/api/projects/${id}`)
            .then(res => {
                console.log(res);
                window.location.assign("/dashboard/view");
            })
            .catch(err => {
                console.log(err);
            })
    }


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

            {
                isDeleting
                    ?
                    <div className="modal openModal">
                        <div className="cancelX" onClick={(e) => {
                            e.preventDefault();
                            setIsDeleting(false)
                        }}>X</div>
                        <p>Are you sure you want to delete project?</p>
                        <div className="buttons">
                            <button className="button" onClick={onDelete}>Yes</button>
                            <button className="button" onClick={(e) => {
                                e.preventDefault();
                                setIsDeleting(false)
                            }}>No</button>
                        </div>
                    </div>
                    : ""
            }

            {
                isFunding
                    ?
                    <div className="modal openModal">
                        <div className="cancelX" onClick={(e) => {
                            e.preventDefault();
                            setIsFunding(false);
                        }}>X</div>
                        <h2>Add your payment details</h2>
                        <PaymentDetails />
                    </div>
                    : ""
            }

            <div className="projects">
                <FundraiserCard details={project} />
            </div>
            <div className="buttons">
                <button
                    className="button pledge"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsFunding(true)
                    }}
                >Pledge to Campaign</button>

                <button className="button" onClick={() => setIsEditing(true)}>Edit</button>
            </div>
            <button className="button delete"
                onClick={(e) => {
                    e.preventDefault();
                    setIsDeleting(true)
                }}
            >Delete Project</button>
        </div>
    )
}

export default FundPage;