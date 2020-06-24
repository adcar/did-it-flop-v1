import React, { Component } from "react";
const tmdb = require("moviedb")("2e0bfe56b018618b270a6e0428559292");

export default class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			hidden: true,
			movieName: "",
			revenue: 0,
			budget: 0,
			nothingFound: false,
			loading: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			loading: true,
			hidden: true
		});
		tmdb.searchMovie({ query: this.state.value }, (err, res) => {
			if (res.results[0]) {
				const movieId = res.results[0].id;
				tmdb.movieInfo({ id: movieId }, (error, response) => {
					this.setState({
						id: response.id,
						revenue: response.revenue,
						budget: response.budget,
						movieName: response.title,
						hidden: false,
						nothingFound: false,
						loading: false
					});
				});
			} else {
				this.setState({
					nothingFound: true,
					hidden: true,
					loading: false
				});
			}
		});
	}
	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	render() {
		const { movieName, budget, revenue, id } = this.state;
		return (
			<div>
				<form className="mainForm" onSubmit={this.handleSubmit}>
					<input
						placeholder="Enter movie title"
						value={this.state.value}
						onChange={this.handleChange}
					/>
				</form>
				{this.state.loading ? <h2> Loading... </h2> : ""}
				{this.state.nothingFound ? <h2> Nothing found! Try again </h2> : ""}
				{this.state.hidden ? (
					""
				) : (
					<>
						<h2>
							{revenue >= budget
								? `Nope! "${movieName}" netted $${this.numberWithCommas(
										revenue - budget
								  )}!`
								: `Oof! "${movieName}" lost $${this.numberWithCommas(
										budget - revenue
								  )}!`}
						</h2>
						<h3>
							<a href={`https://www.themoviedb.org/movie/${id}#media_v4`}>
								Source
							</a>
						</h3>
					</>
				)}
			</div>
		);
	}
}
