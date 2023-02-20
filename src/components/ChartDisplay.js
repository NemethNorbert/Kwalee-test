import React, { useEffect, useState } from "react";
import {
	ComposedChart,
	Line,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Scatter,
} from "recharts";

const data = [
	{
		name: "Page A",
		uv: 590,
		pv: 800,
		amt: 1400,
		cnt: 490,
	},
	{
		name: "Page B",
		uv: 868,
		pv: 967,
		amt: 1506,
		cnt: 590,
	},
	{
		name: "Page C",
		uv: 1397,
		pv: 1098,
		amt: 989,
		cnt: 350,
	},
	{
		name: "Page D",
		uv: 1480,
		pv: 1200,
		amt: 1228,
		cnt: 480,
	},
	{
		name: "Page E",
		uv: 1520,
		pv: 1108,
		amt: 1100,
		cnt: 460,
	},
	{
		name: "Page F",
		uv: 1400,
		pv: 680,
		amt: 1700,
		cnt: 380,
	},
];

export default function App({ data, filterItem, startDate, endDate }) {
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		let filteredData = data.filter((obj) => {
			return obj.Date >= startDate && obj.Date <= endDate;
		});
		filteredData = filteredData.filter((obj) => {
			return obj[filterItem.row] === filterItem.field;
		});
		setFilteredData(filteredData);
	}, [data, filterItem, startDate, endDate]);

	return (
		<ComposedChart
			width={500}
			height={400}
			data={filteredData}
			margin={{
				top: 20,
				right: 20,
				bottom: 20,
				left: 20,
			}}
		>
			<CartesianGrid stroke="#f5f5f5" />
			<XAxis dataKey={"Date"} />
			<YAxis dataKey={"Daily Users"} />
			<Tooltip />
			<Legend />
			<Bar dataKey={"Daily Users"} barSize={20} fill="#413ea0" />
		</ComposedChart>
	);
}
