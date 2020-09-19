export default class GotService {
	constructor() {
		this._apiBaseUrl = "https://anapioficeandfire.com/api"
	}

	async getResource(url) {
		const res = await fetch(this._apiBaseUrl + url)
		if (!res.ok) {
			throw new Error(`Could not fetch ${url} received ${res.status}`)
		}
		return await res.json()
	}

	async getAllCharacters() {
		const url = `/characters?page=2&pageSize=10`
		const res = await this.getResource(url)
		return res.map(this._transformCharacter)
	}

	async getChracter(id) {
		const url = `/characters/${id}`
		const res = await this.getResource(url)
		return this._transformCharacter(res)
	}

	async getAllBooks() {
		const url = `/books/`
		const res = await this.getResource(url)
		return res.map(this._transformBook)
	}

	async getBook(id) {
		const url = `/books/${id}`
		const res = await this.getResource(url)
		return this._transformBook(res)
	}

	async getAllHouses() {
		const url = `/houses/`
		const res = await this.getResource(url)
		return res.map(this._transformHouse)
	}

	async getHouse(id) {
		const url = `houses/${id}`
		const res = await this.getResource(url)
		return this._transformHouse(res)
	}

	_transformCharacter(character) {
		const stringUrl = character.url.toString()
		const id = stringUrl.slice(stringUrl.lastIndexOf("/") + 1)

		return {
			id: id,
			name: character.name,
			gender: character.gender,
			born: character.born,
			died: character.died,
			culture: character.culture
		}
	}

	_transformHouse(house) {
		return {
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			overlord: house.overlord,
			ancestralWeapons: house.ancestralWeapons
		}
	}

	_transformBook(book) {
		return {
			name: book.name,
			numberOfPages: book.numberOfPages,
			publiser: book.publiser,
			released: book.released
		}
	}
}
