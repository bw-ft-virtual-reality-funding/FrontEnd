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
				gsap.fromTo(element, {opacity:0, y:-300}, {stagger:1, y:1, opacity:1, duration:1})
			}, {once : true});
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
