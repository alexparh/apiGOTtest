import React, { Component } from "react"
import GotService from "../../services/gotService"
import Spinner from "../spinner"
import "./itemList.css"

export default class ItemList extends Component {
	state = {
		characters: [],
		loading: true
	}
	gotService = new GotService()

	onCharactersSet = characters => {
		this.setState({
			characters,
			loading: false
		})
	}

	componentDidMount() {
		this.gotService.getAllCharacters().then(this.onCharactersSet)
	}

	render() {
		const { characters, loading } = this.state

		if (loading) {
			return (
				<li className="list-group-item">
					<Spinner />
				</li>
			)
		}

		const charactersView = characters.map(item => {
			return (
				<li
					key={item.id}
					className="list-group-item"
					onClick={() => this.props.onCharSelected(item.id)}
				>
					{!item.name ? "<no info>" : item.name}
				</li>
			)
		})

		return <ul className="item-list list-group">{charactersView}</ul>
	}
}
