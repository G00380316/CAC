import { Grid, Stack, Typography } from "@mui/joy";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
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
		msOverflowStyle: "none", // Hides scrollbar in older IE/Edge
	"&::-webkit-scrollbar": {
	width: "0", // Hides scrollbar in WebKit-based browsers
		},
	},
};

const htmlToText = (html) => {
	if (typeof window === "undefined") return html;
	const div = document.createElement("div");
	div.innerHTML = html;
	return div.textContent || div.innerText || "";
};

export default function Content() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [SSlist, setList] = useState([]);

	useEffect(() => {
		const fetchSSList = async () => {
			try {
				const response = await fetch("/api/getListSS");
				const storedData = await response.json();
				// console.log(storedData)

				if (storedData.sundaySchools) {
					setLoading(false);
					setList(storedData.sundaySchools);
				}
			} catch (err) {
				console.error("Fetch Error:", err);
				setError(true);
			}
		};

		fetchSSList();
	}, []);

	if (loading && !SSlist) {
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
					sx={{ wordWrap: "break-word", marginTop: 5, marginBottom: 15 }}
				>
					<Typography
						variant="h1"
						fontSize={"lg"}
						fontWeight={800}>
						Past Sunday Schools
					</Typography>

					{SSlist.map((sunday) => (
						<Link
							key={sunday._id}
							href={`/sundayschools/ss/${sunday._id}`}
							style={{ textDecoration: "none", marginTop: 15 }}
						>
							<Typography
								level="body-md"
								sx={{
									cursor: "pointer",
									"&:hover": { textDecoration: "underline" },
								}}
							>
								{htmlToText(sunday.title)}
							</Typography>
						</Link>
					))}
				</Stack>
			</Grid >
		</Grid >
	);
}
