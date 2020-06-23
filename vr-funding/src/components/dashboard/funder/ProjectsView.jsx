import React, { useState, useEffect} from 'react';
import axios from 'axios'
import FundraiserCard from '../fundraiser/FundraiserCard'

const ProjectView = props => {
    const url = `https://virtual-reality-fundraising.herokuapp.com/api/projects`
    // If there are issues, let me know

    /*  GET REQUEST HERE  */

    const [projectsList, setProjectsList] = useState([])

    const getProjectsList = () => {
        axios.get(url)
        .then(res => {
            console.log(res)
            setProjectsList(res.data)
        })
        .catch(err => {
           debugger
        })
    }

        useEffect(() => {
            getProjectsList()
    }, [])

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