import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

const columns2: GridColDef[] = [
	{ field: "Date", headerName: "Date", width: 150, type: "date" },
	{
		field: "Country",
		headerName: "Country",
		width: 150,
	},
	{
		field: "App",
		headerName: "App",
		width: 150,
	},
	{
		field: "Platform",
		headerName: "Platform",
		width: 150,
	},
	{
		field: "Ad Network",
		headerName: "Ad Network",
		width: 150,
	},
	{
		field: "Daily Users",
		headerName: "Daily Users",
		type: "number",
		width: 150,
	},
];

const rows = [
	{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable({ data, handleCellClick }) {
	const tableColumns = Object.keys(data[0])?.map((label) => {
		return { field: label, headerName: label, width: 150 };
	});
	return (
		<Box sx={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={data}
				getRowId={(row) => uuidv4()}
				columns={columns2}
				pageSize={5}
				rowsPerPageOptions={[5]}
				disableSelectionOnClick
				experimentalFeatures={{ newEditingApi: true }}
				onCellClick={handleCellClick}
			/>
		</Box>
	);
}
