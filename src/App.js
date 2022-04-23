import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Highcharts, { setOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";

function App() {
	const [data, setData] = React.useState(null);
	const [all, setAll] = React.useState(null);
	const [num, setNum] = React.useState(0);
	const [series, setSeries] = React.useState([]);
	const [options, setOptions] = React.useState();

	// // if (!num) return null;

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

	// }, []);

	if (!data) return null;

	if (!all) return null;
	if (!series) return null;

	let prefData = [];
	// React.useEffect(() => {
	for (let i = 0; i < data.result.data[0].data.length; i++) {
		prefData.push(data.result.data[0].data[i].value);
	}
	let prefName = all.result[num].prefName;
	// const series = [];
	let serie = {
		name: prefName,
		data: prefData,
	};

	// const test = () => {
	// setSeries([...series, serie]);
	// };
	// const lists = [...series, serie];

	// const lists = [...series, serie];
	// setSeries(lists);

	// setSeries([...series, serie]);
	// series.push(serie);

	// const options = ;

	return (
		<div className="App">
			<header className="App-header">
				{/* <input
					type="checkbox"
					onChange={(event) => {
						setSeries(lists);
					}}
				></input> */}
				{series.map((data) => {
					return <p>{data.name}</p>;
				})}
				{all.result.map((prefecture) => {
					return (
						<div>
							<input
								type="checkbox"
								name="Prefecture name"
								value="test"
								onChange={(event) => {
									setNum(prefecture.prefCode - 1);
									// setseriesを呼んでも、更新前にグラフがびょうがされてしまう。
									// sectSeries([...series, serie]);
									setOptions({
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
										series: [...series, serie],
									});
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
				<HighchartsReact highcharts={Highcharts} options={{ ...options }} />
			</header>
		</div>
	);
}

export default App;
