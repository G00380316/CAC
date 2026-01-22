"use client"
import { Grid, Stack } from "@mui/joy";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";

const Styles = {
	root: {
		maxHeight: "90vh",
		overflowY: "scroll",
		"&::-webkit-scrollbar": {
			width: "0.1rem",
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "rgba(0,0,0,0)",
			borderRadius: "0.25em",
		},
		"&::-webkit-scrollbar-track": {
			backgroundColor: "transparent", // Make the scrollbar track transparent
		},
		scrollbarWidth: "none", // Hides scrollbar in Firefox
		"-ms-overflow-style": "none", // Hides scrollbar in older IE/Edge
		"&::-webkit-scrollbar": {
			width: "0", // Hides scrollbar in WebKit-based browsers
		},
	},
};

export default function Content({ id }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [ssText, setssText] = useState("");
	const [ssTitle, setssTitle] = useState("");


	useEffect(() => {
		const fetchSSData = async () => {
			try {
				const response = await fetch(`/api/getSSbyId/${id}`);
				const storedData = await response.json();

				if (storedData.sundaySchool) {
					setLoading(false);
					setssText(storedData.sundaySchool.text);
					setssTitle(storedData.sundaySchool.title);
				}
			} catch (err) {
				console.error("Fetch Error:", err);
				setError(true);
			}
		};

		if (id) fetchSSData();
	}, [id]);

	if (loading && !ssText) {
		return (
			<Grid
				container
				direction="row"
				justifyContent="space-around"
				alignItems="stretch"
			>
				<Grid></Grid>
				<Grid>
					<Stack marginTop="35vh" alignItems="center">
						<LoadingButton loading variant="none" size="large" />
					</Stack>
				</Grid>
				<Grid></Grid>
			</Grid>
		);
	}

	return (
		<Grid
			container
			direction={{ xs: "row", sm: "row", md: "row" }}
			justifyContent={"center"}
			sx={Styles.root}
			maxWidth={{ sx: 500, sm: 500, md: 800 }}
		>
			<Grid item xs={12} sm={12} padding={{ sm: 4, xs: 4, md: 1 }}>
				<Stack
					spacing={1}
					maxWidth={{ sx: 500, sm: 500, md: 800 }}
					justifyContent={"center"}
					sx={{ wordWrap: "break-word" }}
				>
					<div
						dangerouslySetInnerHTML={{ __html: ssTitle }}
						style={{ color: "black", marginTop: 20 }}
					/>
					<p
						dangerouslySetInnerHTML={{ __html: ssText }}
						style={{ color: "black", marginBottom: 100 }}
					/>
				</Stack>
			</Grid>
		</Grid>
	);
}
