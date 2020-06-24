import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../../styles/images/placeholder.png"

export default function FundraiserCard(props) {
	const { details } = props;

	if (!details) {
		return <h3>Working on fetching your fundraiser...</h3>;
	}

	console.log(details.img_url);

	return (
		<Link to={`/dashboard/view/${details.id}`} className="fundraiser container">
			<h2 className="link">{details.title}</h2>
			<div className="column">
				<img src={details.img_url === "" || "https://picsum.photos/200" || undefined || null ? placeholder : details.img_url} />
				<div className="text">
					<p>{details.description}</p>
				</div>
			</div>

		</Link>
	);
}
