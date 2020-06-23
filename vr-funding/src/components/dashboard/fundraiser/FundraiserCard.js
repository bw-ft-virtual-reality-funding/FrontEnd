import React from 'react'

export default function FundraiserCard(props) {

    const {details} = props

    if (!details) {
        return <h3>Working fetching your fundraiser details...</h3>
      }

    return (
        <div className='fundraiser container'>
            <h2>{details.title}</h2>
            <a href={details.imgUrl}></a>
            <p>{details.description}</p>
        </div>
    )
}