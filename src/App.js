import "./App.css";
import { useMemo, useState } from "react";
import Papa from "papaparse";
import { Input, Grid, Container } from "@mui/material";
import ChartDisplay from "./components/ChartDisplay";
import DataTable from "./components/DataTable";
import DatePicker from "./components/DatePicker";
import moment from "moment/moment";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

function App() {
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [startValue, setStartValue] = useState();
	const [endValue, setEndValue] = useState();
	const [filterItem, setFilterItem] = useState("");

	const parsedEndValue = useMemo(
		() => moment(endValue?.$d).format("DD/MM/YYYY"),
		[endValue]
	);
	const parsedStartValue = useMemo(
		() => moment(startValue?.$d).format("DD/MM/YYYY"),
		[startValue]
	);
	const handleFileChange = (e) => {
		setError("");

		if (e.target.files.length) {
			const inputFile = e.target.files[0];

			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}

			const reader = new FileReader();

			reader.onload = async ({ target }) => {
				const csv = Papa.parse(target.result, { header: true });
				const parsedData = csv?.data;
				parsedData.sort(function (a, b) {
					// Turn your strings into dates, and then subtract them
					// to get a value that is either negative, positive, or zero.
					if (a.Date > b.Date) {
						return 1;
					}
					if (a.Date < b.Date) {
						return -1;
					}
					return 0;
				});
				setData(parsedData);
				let minValue = moment(parsedData[0].Date, "DD/MM/YYYY");
				let maxValue = moment(
					parsedData[parsedData.length - 1].Date,
					"DD/MM/YYYY"
				).toDate();
				setStartValue(minValue);
				setEndValue(maxValue);
			};

			reader.readAsText(inputFile);
		}
	};

	const handleCellClick = (e) => {
		if (e.field === "Date" || e.field === "Daily Users") return;
		setFilterItem({ row: e.field, field: e.value });
	};

	const handleDateStartChange = (e) => {
		setStartValue(e);
	};

	const handleDateEndChange = (e) => {
		setEndValue(e);
	};

	return (
		<div>
			<div style={{ marginTop: "3rem" }}>{error ? error : null}</div>
			<Container sx={{ my: 1 }}>
				<Input
					aria-label="Enter CSV Input"
					onChange={handleFileChange}
					id="csvInput"
					name="file"
					type="file"
				/>
				<DatePicker
					setStartValue={handleDateStartChange}
					startValue={startValue}
					endValue={endValue}
					setEndValue={handleDateEndChange}
				/>
			</Container>
			{data.length ? (
				<Grid container spacing={2} alignItems="center" justifyContent="center">
					<Grid item xs={12} md={4}>
						<ChartDisplay
							data={data}
							filterItem={filterItem}
							startDate={parsedStartValue}
							endDate={parsedEndValue}
						/>
					</Grid>
					<Grid item xs={12} md={8} sx={{}}>
						<Container>
							<DataTable data={data} handleCellClick={handleCellClick} />
						</Container>
					</Grid>
				</Grid>
			) : null}
		</div>
	);
}

export default App;
