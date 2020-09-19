import React, { Component } from "react"
import GotService from "../../services/gotService"
import Spinner from "../spinner"
import ErrorMessage from "../errorMessage"
import "./randomChar.css"

export default class RandomChar extends Component {
	gotService = new GotService()
	state = {
		char: {},
		loading: true,
		error: 0
	}

	componentDidMount() {
		this.updateCharacter()
		this.timerId = setInterval(this.updateCharacter, 1500)
	}

	onCharLoaded = char => {
		this.setState({ char, loading: false })
	}

	onError = err => {
		this.setState({
			error: err,
			loading: false
		})
	}

	updateCharacter = () => {
		const id = Math.floor(Math.random() * 140 + 25)
		this.gotService
			.getChracter(id)
			.then(this.onCharLoaded)
			.catch(err => {
				const errMessage = err.toString()
				this.onError(errMessage.substring(errMessage.toString().length - 3))
			})
	}

	render() {
		const { char, loading, error } = this.state

		const errorMessage = error ? <ErrorMessage status={error} /> : null
		const spinner = loading ? <Spinner /> : null
		const content = !(loading || error) ? <View char={char} /> : null
		return (
			<div className="random-block rounded">
				{errorMessage}
				{spinner}
				{content}
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, gender, born, died, culture } = char
	return (
		<>
			<h4>Random Character: {!name ? "<no info>" : name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Gender </span>
					<span>{!gender ? "<no info>" : gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Born </span>
					<span>{!born ? "<no info>" : born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Died </span>
					<span>{!died ? "<no info>" : died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Culture </span>
					<span>{!culture ? "<no info>" : culture}</span>
				</li>
			</ul>
		</>
	)
}
