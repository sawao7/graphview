import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		axios
			.get(
				"https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=11362&prefCode=11",
				{
					headers: { "X-API-KEY": process.env.REACT_APP_API_KEY },
				}
			)
			.then((response) => {
				// setData(response.json().result);
				setData(response.data);
			});
	}, []);

	if (!data) return null;
	console.log(data);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					<code>src/App.js</code> and save to reload.
				</p>
				<p>{data.result.boundaryYear}</p>

				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
