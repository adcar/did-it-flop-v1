import React, { Component } from "react";
import ReactDOM from "react-dom";
import Form from "./Form.js";
import "./styles.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Did it Flop?</h1>
				<Form />
			</div>
		);
	}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
