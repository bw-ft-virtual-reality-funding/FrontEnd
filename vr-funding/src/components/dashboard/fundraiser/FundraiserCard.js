import React from 'react'

export default function FundraiserCard(props) {

    const {details} = props

    if (!details) {
        return <h3>Working on fetching your fundraiser...</h3>
      }

    return (
        <div className='fundraiser container'>
            <h2>{details.title}</h2>
            <a href={details.img_url} target="_blank">Fundraiser Link</a>
            <p>{details.description}</p>
        </div>
    )
}