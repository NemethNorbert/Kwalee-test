import * as React from "react";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function MaterialUIPickers({
	setStartValue,
	setEndValue,
	startValue,
	endValue,
}) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<MobileDatePicker
				label="Start Date"
				inputFormat="DD/MM/YYYY"
				value={startValue}
				onChange={(value) => {
					setStartValue(value);
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
			<MobileDatePicker
				label="End Date"
				inputFormat="DD/MM/YYYY"
				value={endValue}
				onChange={(value) => {
					setEndValue(value);
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	);
}
