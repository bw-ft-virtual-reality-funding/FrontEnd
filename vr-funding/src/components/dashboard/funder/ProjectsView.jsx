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

    // document.addEventListener("DOMContentLoaded", function(event) {
    //     console.log('DOM fully loaded and parsed');
    //     window.onload = function() {
    //         console.log('Animation');
    //         gsap.to('.projects .container', {stagger:1,autoAlpha:0,x:-500,duration:3})
    //     };
    // });
    gsap.to('.projects .container', {stagger:1,autoAlpha:0,x:-500,duration:3});

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