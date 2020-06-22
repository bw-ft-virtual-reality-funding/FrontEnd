import React, { useState } from "react";
import {Link} from 'react-router-dom'

export default function Signup() {
    const [disabled, setDisabled] = useState(true);


    return <div>
    <form>
        <h1>Sign Up</h1>
        <h3>Create you account.</h3>
        
        <label htmlFor="firstname">
            First Name&nbsp;
            <input name="firstname" type="text"/>
        </label>
        <label htmlFor="lastname">
            Last Name&nbsp;
            <input name="lastname" type="text"/>
        </label>

        <label htmlFor="email">
            Email&nbsp;
            <input name="email" type="email"/>
        </label>

        <label htmlFor="password">
            Password&nbsp;
            <input name="password" type="password"/>
        </label>

        <label htmlFor="confirm_password">
            Confirm Password&nbsp;
            <input name="confirm_password" type="password"/>
        </label>

        <div>
            <button disabled={disabled}>Sign Up Now</button>
        </div>

        <div className="errors">
            <div></div>
            <div></div>
        </div>
    </form>

    <div>Already have an account?<Link to="/">Login</Link> </div>
</div>;
}
