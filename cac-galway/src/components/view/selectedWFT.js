
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
	const [text, setText] = useState("");
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [bibleRef, setbibleRef] = useState("");
	const [byline, setByline] = useState("");
	const [audio, setAudio] = useState(null);


	useEffect(() => {
		const fetchSSData = async () => {
			try {
				const response = await fetch(`/api/getWFTbyId/${id}`);
				const storedData = await response.json();

				if (storedData.wordfortoday) {
					setLoading(false);
					setText(storedData.wordfortoday.text);
					setTitle(storedData.wordfortoday.title);
					setDate(storedData.wordfortoday.date);
					setbibleRef(storedData.wordfortoday.bibleRef);
					setByline(storedData.wordfortoday.byline);
					setAudio(storedData.wordfortoday.audio);
				}
			} catch (err) {
				console.error("Fetch Error:", err);
				setError(true);
			}
		};

		if (id) fetchSSData();
	}, [id]);

	if (loading && !text) {
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
			<Grid
				item
				direction={{ md: "row" }}
				xs={12} // Full width on extra small screens
				sm={12} // Full width on small screens
				padding={{ sm: 4, xs: 4, md: 1 }}
			>
				<Stack
					spacing={1}
					maxWidth={{ sx: 500, sm: 500, md: 800 }}
					mt={4}
					justifyContent={"center"}
					sx={{ wordWrap: "break-word" }}
				>
					<h2
						dangerouslySetInnerHTML={{ __html: title }}
						style={{
							marginTop: 3,
							alignSelf: "center",
							color: "black",
						}}
					/>
					<div
						dangerouslySetInnerHTML={{ __html: audio }}
						style={{ alignSelf: "center" }}
					/>
					<p
						dangerouslySetInnerHTML={{ __html: date }}
						style={{
							fontSize: 12,
							alignSelf: "center",
							color: "navy",
						}}
					/>
					<p
						dangerouslySetInnerHTML={{ __html: bibleRef }}
						style={{
							fontSize: 14,
							alignSelf: "center",
							color: "black",
						}}
					/>
					<p
						dangerouslySetInnerHTML={{ __html: byline }}
						style={{
							fontSize: 14,
							fontStyle: "italic",
							alignSelf: "center",
							color: "blue",
						}}
					/>
					<p dangerouslySetInnerHTML={{ __html: text }} style={{}} />
					<br />
					<br />
				</Stack>
			</Grid>
		</Grid>
	);
}
