import React , { useEffect } from "react";
import { Link } from "react-router-dom";
import placeholder from "../../styles/images/placeholder.png";
import { gsap } from 'gsap'

export default function FundraiserCard(props) {
	const { details } = props;

	useEffect(() =>{
		const container = Array.from(document.querySelectorAll(".projects .container"))	

		console.log(container)

		container.map(element => {
			console.log(element)
			element.addEventListener("mouseenter", function() {
				gsap.to(element, {x:15, y:15})
			});
			element.addEventListener("mouseleave", function() {
				gsap.to(element, {x:1, y:1})
			});
		});
	}, [])
	
	if (!details) {
		return <h3>Working on fetching your fundraiser...</h3>;
	}

	return (
		<Link to={`/dashboard/view/${details.id}`} className="fundraiser container">
			<h2 className="link">{details.title}</h2>
			<div className="column">
				<img
					src={
						details.img_url === "" ||
						// "https://picsum.photos/200" ||
						undefined ||
						null
							? placeholder
							: details.img_url
					}
				/>
				<div className="text">
					<p>{details.description}</p>
				</div>
			</div>
		</Link>
	);
}
