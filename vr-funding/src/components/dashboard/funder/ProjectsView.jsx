import React, { useState, useEffect} from 'react';
import axios from 'axios'
import FundraiserCard from '../fundraiser/FundraiserCard'
import { axiosWithAuth } from '../../utils/axiosWithAuth';

import { gsap } from 'gsap'

const ProjectView = props => {
    const url = `https://virtual-reality-fundraising.herokuapp.com/api/projects`
    // If there are issues, let me know

    /*  GET REQUEST HERE  */

    const [projectsList, setProjectsList] = useState([])

    const getProjectsList = () => {
        axiosWithAuth()
        .get(url)
        .then(res => {
            // console.log(res)
            setProjectsList(res.data)
        })
        .catch(err => {
        //    debugger
        })
    }

        useEffect(() => {
            getProjectsList()
    }, [])

    window.addEventListener('focus', function(event) {
        gsap.fromTo('.projects .container', {opacity:0, y:-300}, {stagger:1, y:1, opacity:1, duration:1})
    });

    return (
        <div className="projects">
            {
                projectsList.map(fundraiser => {
                    return (
                        <FundraiserCard key={fundraiser.id} details={fundraiser}/>
                    )
                })
            }
        </div>
    )
}



export default ProjectView;