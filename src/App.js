import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function App() {
	const [data, setData] = React.useState(null);
	const [all, setAll] = React.useState(null);

	React.useEffect(() => {
		axios
			.get("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=11", {
				headers: { "X-API-KEY": process.env.REACT_APP_API_KEY },
			})
			.then((response) => {
				setData(response.data);
			});
	}, []);

	React.useEffect(() => {
		axios
			.get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
				headers: { "X-API-KEY": process.env.REACT_APP_API_KEY },
			})
			.then((response) => {
				setAll(response.data);
			});
	}, []);


	if (!data) return null;
	if (!all) return null;

	// allには、すべての都道府県とIDが格納 all.result[].prefCode/PrefName
	// dataには、表示すべきグラフの内容
	// data.result.data[0]に総人口の推移、その中のdataのyearとvalueあり
	// const lists = data.result.data[0].data;
	// const lists_demo = [[20, 1]];

	// リストに
	const lists_demo =  [
		{
			name: "test",
			data: [10,11,12,3,20],
		},
	];

	const options = {
		title: {
			text: "都道府県別人口数",
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false,
				},
				pointInterval: 5,
				pointStart: 1965,
			},
		},
		series: lists_demo,
	};

	return (
		<div className="App">
			<header className="App-header">
				{/* <p>{data.result.boundaryYear}</p> */}
				{data.result.data[0].data.map((element) => {
					return (
						<p>
							{element.value}, {element.year}
						</p>
					);
				})}
				{/* <p>{data.result.data[0].data[10].value}</p> */}
				{all.result.map((data) => {
					return <li>{data.prefName}</li>;
				})}

				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
				<HighchartsReact highcharts={Highcharts} options={options} />
			</header>
		</div>
	);
}

export default App;
