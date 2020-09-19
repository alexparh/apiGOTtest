import React, { Component } from "react"
import { Col, Row, Container, Button } from "reactstrap"
import Header from "../header"
import RandomChar from "../randomChar"
import ItemList from "../itemList"
import CharDetails from "../charDetails"
import "./style.css"

export default class App extends Component {
	state = {
		showRandomChar: false,
		selectedCharId: null
	}

	onRandomCharacterView = () => {
		this.setState({
			showRandomChar: !this.state.showRandomChar
		})
	}

	onCharSelected = id => {
		this.setState({
			selectedCharId: id
		})
	}

	render() {
		const { showRandomChar, selectedCharId } = this.state
		const randomChar = showRandomChar ? <RandomChar /> : null

		return (
			<>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{ size: 5, offset: 0 }}>
							{randomChar}
							<div className="randomButton">
								<Button
									onClick={this.onRandomCharacterView}
									color="secondary"
									size="lg"
								>
									Random character
								</Button>
							</div>
						</Col>
					</Row>
					<Row>
						<Col md="6">
							<ItemList onCharSelected={this.onCharSelected} />
						</Col>
						<Col md="6">
							<CharDetails id={selectedCharId} />
						</Col>
					</Row>
				</Container>
			</>
		)
	}
}
