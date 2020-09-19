import React, { Component } from "react"
import GotService from "../../services/gotService"
import "./charDetails.css"

export default class CharDetails extends Component {
	state = { character: null }
	gotService = new GotService()

	componentDidMount() {
		this.updateChar()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.id !== this.props.id) {
			this.updateChar()
		}
	}

	updateChar = () => {
		const { id } = this.props

		if (!id) {
			return
		}

		this.gotService.getChracter(id).then(character => {
			this.setState({
				character
			})
		})
	}

	render() {
		const { character } = this.state

		if (!character) {
			return <span className="noCharacter">Select a character</span>
		}

		const { name, gender, born, died, culture } = character

		return (
			<div className="char-details rounded">
				<h4>{!name ? "<no info>" : name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Gender</span>
						<span>{!gender ? "<no info>" : gender}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Born</span>
						<span>{!born ? "<no info>" : born}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Died</span>
						<span>{!died ? "<no info>" : died}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Culture</span>
						<span>{!culture ? "<no info>" : culture}</span>
					</li>
				</ul>
			</div>
		)
	}
}
