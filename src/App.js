import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function App() {
	const [data, setData] = React.useState(null);
	const [all, setAll] = React.useState(null);
	const [num, setNum] = React.useState(0);

	// const prefNum = 0;

	React.useEffect(() => {
		axios
			.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${num}`, {
				headers: { "X-API-KEY": process.env.REACT_APP_API_KEY },
			})
			.then((response) => {
				setData(response.data);
			});
	}, [num]);

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

	// const prefData = [data.result.data[0].data[0].value, data.result.data[0].data[1].value];
	const prefData = [];
	for (let i = 0; i < data.result.data[0].data.length; i++) {
		prefData.push(data.result.data[0].data[i].value);
	}
	// const prefData = [2,3,4,5]
	const prefName = all.result[num].prefName;
	const series = [];
	const serie = {
		name: prefName,
		data: prefData,
	};
	series.push(serie);
	// const lists_demo = [
	// 	{
	// 		name: "test",
	// 		data: [
	// 			10, 11, 12, 3, 20,
	// 			// [1, 2, 2, 3, 4],
	// 		],
	// 	},
	// 	{
	// 		name: "test2",
	// 		data: [10, 2,3,45,6]
	// 	}
	// ];
	// lists_demo.push({
	// 	name: "test3",
	// 	data:[2,34,5,6,7]
	// })

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
				pointStart: 1960,
			},
		},
		series: series,
	};

	return (
		<div className="App">
			<header className="App-header">
				{all.result.map((prefecture) => {
					return (
						<div>
							<input
								type="checkbox"
								name="Prefecture name"
								value="test"
								onChange={(event) => {
									setNum(prefecture.prefCode - 1);
								}}
							></input>
							<lebel>{prefecture.prefName}</lebel>
						</div>
					);
				})}

				{/* <p>{data.result.boundaryYear}</p> */}
				{/* {data.result.data[0].data.map((element) => {
					return (
						<p>
							{element.value}, {element.year}
						</p>
					);
				})}
				<p>{data.result.data[0].data[10].value}</p>
				{all.result.map((data) => {
					return <li>{data.prefName}</li>;
				})} */}

				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
				<HighchartsReact highcharts={Highcharts} options={options} />
			</header>
		</div>
	);
}

export default App;
