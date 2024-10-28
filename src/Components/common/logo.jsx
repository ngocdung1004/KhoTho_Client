import React from "react";
import { Link } from "react-router-dom";

import "./styles/logo.css";

const Logo = (props) => {
	let { width, link } = props;

	if (link === undefined) {
		link = true;
	}

	const imageElement = (
		<img src= "src/Assets/logos/logo_khotho_3.png" alt="logo" className="logo" width= "180px" />
	);

	return (
		<React.Fragment>
			{link ? <Link to="/">{imageElement}</Link> : imageElement}
		</React.Fragment>
	);
};

export default Logo;
