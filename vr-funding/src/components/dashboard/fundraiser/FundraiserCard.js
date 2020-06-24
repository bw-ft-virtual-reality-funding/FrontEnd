import React from "react";
import { Link } from "react-router-dom";

export default function FundraiserCard(props) {
	const { details } = props;

	if (!details) {
		return <h3>Working on fetching your fundraiser...</h3>;
	}

	return (
		<Link to={`/dashboard/view/${details.id}`} className="fundraiser container">
			<h2>{details.title}</h2>
			<img src={details.img_url} />
			{/* <a className='link' href={details.img_url} target="_blank">Fundraiser Link</a> */}
			<p>{details.description}</p>
		</Link>
	);
}
