import React from "react"
import "./errorMessage.css"

const ErrorMessage = ({ status }) => {
	return (
		<>
			<img src={process.env.PUBLIC_URL + "/img/error.jpg"} alt="Error" />
			<span>Something goes wrong. Error: {status}</span>
		</>
	)
}

export default ErrorMessage
