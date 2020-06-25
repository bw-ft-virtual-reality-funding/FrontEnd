import React, { useContext, useState } from "react";
import { VRContext } from "../context/VRContext";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import defaultPFP from "../styles/images/defaultPFP.jpg";

const EditUser = props => {

    const [userDetails, setUserDetails] = useContext(VRContext);
    const [formValues, setFormValues] = useState(userDetails);
    const [imageURL, setImageURL] = useState(undefined);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAddingPFP, setIsAddingPFP] = useState(false);

    const PFP = JSON.parse(localStorage.getItem("pfp"));

    const onChangeHandler = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        axios
            .put(`https://virtual-reality-fundraising.herokuapp.com/api/users/${userDetails.id}`,
                formValues)
            .then(res => {
                console.log(res);
                window.location.assign("/dashboard/profile")
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onDelete = (e) => {
        e.preventDefault()
        const loggedID = localStorage.getItem("id");
        axios
            .delete(`https://virtual-reality-fundraising.herokuapp.com/api/users/${loggedID}`)
            .then(res => {
                console.log(res);
                localStorage.removeItem("token")
                localStorage.removeItem("id");
                window.location.assign("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <form className="edit" onSubmit={onSubmitHandler}>
            {
                isDeleting
                    ?
                    <div className="modal openModal">
                        <div className="cancelX" onClick={(e) => {
                            e.preventDefault();
                            setIsDeleting(false)
                        }}>X</div>
                        <p>Are you sure you want to delete your account?</p>
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
                isAddingPFP
                    ?
                    <div className="modal openModal">
                        <div className="cancelX" onClick={(e) => {
                            e.preventDefault();
                            setIsAddingPFP(false)
                        }}>X</div>
                        <p>Change Profile Picture</p>
                        <input 
                        type="text"
                        placeholder="Image URL"
                        onChange={(e) => {
                            setImageURL(e.target.value);
                        }}
                        />
                        <div className="buttons">
                            <button 
                            className="button"
                            onClick={(e) => {
                                e.preventDefault();
                                localStorage.setItem("pfp", JSON.stringify(imageURL))
                                setIsAddingPFP(false)
                            }}
                            >Accept</button>
                            <button className="button" onClick={(e) => {
                                e.preventDefault();
                                setIsAddingPFP(false)
                            }}>Cancel</button>
                        </div>
                        <button 
                        className="button delete"
                        onClick={(e) => {
                            e.preventDefault();
                            localStorage.removeItem("pfp");
                            setIsAddingPFP(false)
                        }}
                        >Remove</button>
                    </div>
                    : ""
            }

            <h2>Change User Details</h2>
            <div className="pfpContainer">
                <img 
                src={PFP ? PFP : defaultPFP} 
                className="pfpEdit" 
                onClick={() => {
                    setIsAddingPFP(true);
                }}
                />
            </div>
            <input
                type="text"
                value={formValues.name}
                onChange={onChangeHandler}
                name="name"
            />
            <input
                type="text"
                value={formValues.username}
                onChange={onChangeHandler}
                name="username"
            />
            <select
                onChange={onChangeHandler}
                value={userDetails.role}
                name="role"
            >
                <option value="funder">Funder</option>
                <option value="fundraiser">Fundraiser</option>
            </select>
            <div className="buttons">
                <button className="button" type="submit">Accept</button>
                <button className="button cancel"
                    onClick={() => window.location.assign("/dashboard/profile")}
                >Cancel</button>
            </div>
            <button className="button delete"
                onClick={(e) => {
                    e.preventDefault();
                    setIsDeleting(true)
                }}
            >Delete Account</button>
        </form>
    )
}
export default EditUser;