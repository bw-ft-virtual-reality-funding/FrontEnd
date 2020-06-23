import React, { useContext, useState } from "react";
import { VRContext } from "../context/VRContext";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const EditUser = props => {

    const [userDetails, setUserDetails] = useContext(VRContext);
    const [formValues, setFormValues] = useState(userDetails);
    const [isDeleting, setIsDeleting] = useState(false);

    const onChangeHandler = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        axiosWithAuth()
            .put(`https://virtual-reality-fundraising.herokuapp.com/api/users/${userDetails.id}`,
                formValues)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onDelete = (e) => {
        e.preventDefault()
        axiosWithAuth.
            delete(``)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <form>
            {
                isDeleting
                    ?
                    <div className="modal">
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

            <h2>Change User Details</h2>
            <input
                type="text"
                value={formValues.name}
                onChange={onChangeHandler}
            />
            <select
                onChange={onChangeHandler}
                value={userDetails.role}
            >
                <option value="funder">Funder</option>
                <option value="fundraiser">Fundraiser</option>
            </select>
            <div className="buttons">
                <button className="button">Accept</button>
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