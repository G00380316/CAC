import { Grid, Stack, Typography } from "@mui/joy";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
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
        msOverflowStyle: "none", // Hides scrollbar in older IE/Edge
        "&::-webkit-scrollbar": {
            width: "0", // Hides scrollbar in WebKit-based browsers
        },
    },
};

// const getDataDate = (data_date) => {
// 	const newCreatedAt = data_date.split("T")[0];
//
// 	//console.log("Mongodb", newCreatedAt);
//
// 	return newCreatedAt;
// };

export default function Content({ count }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [text, setText] = useState("");
    const [ssText, setssText] = useState("");
    const [ssTitle, setssTitle] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [bibleRef, setbibleRef] = useState("");
    const [byline, setByline] = useState("");
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        const fetchWFTData = async () => {
            try {
                const res = await fetch("/api/webscrape/wft", {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SECRET}`,
                    }
                });
                if (!res.ok) {
                    const response = await fetch("/api/getWFT", {
                        headers: {
                            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SECRET}`,
                        }
                    }
                    );
                    const storedData = await response.json();

                    setLoading(false);
                    setText(storedData.wft.text);
                    setTitle(storedData.wft.title);
                    setDate(storedData.wft.date);
                    setbibleRef(storedData.wft.bibleRef);
                    setByline(storedData.wft.byline);
                    setAudio(storedData.wft.audio);
                }
                const data = await res.json();

                if (data?.response) {
                    setLoading(false);
                    setText(data.response.text);
                    setTitle(data.response.title);
                    setDate(data.response.date);
                    setbibleRef(data.response.bibleRef);
                    setByline(data.response.byline);
                    setAudio(data.response.audio);
                } else {
                    const response = await fetch("/api/getWFT", {
                        headers: {
                            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SECRET}`,
                        }
                    });
                    const storedData = await response.json();

                    setLoading(false);
                    setText(storedData.wft.text);
                    setTitle(storedData.wft.title);
                    setDate(storedData.wft.date);
                    setbibleRef(storedData.wft.bibleRef);
                    setByline(storedData.wft.byline);
                    setAudio(storedData.wft.audio);
                }
            } catch (err) {
                //console.error("Fetch Error:", err);
                setError(true);
            }
        };

        const fetchSSData = async () => {
            try {
                const response = await fetch("/api/getSS", {
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SECRET}`,
                    }
                });
                const storedData = await response.json();
                //console.log(storedData)

                if (storedData.sundaySchool) {
                    setLoading(false);
                    setssText(storedData.sundaySchool.text);
                    setssTitle(storedData.sundaySchool.title);
                }

                if (!storedData.sundaySchool) {
                    const res = await fetch("/api/webscrape/ss", {
                        headers: {
                            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SECRET}`,
                        }
                    });
                    const data = await res.json();

                    if (res.ok) {
                        setLoading(false);
                        setssText(data.response.text);
                        setssTitle(data.response.title);
                    }
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setError(true);
            }
        };

        fetchWFTData();
        fetchSSData();
    }, []);

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
                    <Typography
                        startDecorator={<RemoveRedEyeIcon fontSize="inherit" />}
                        alignSelf={"left"}
                        justifySelf={"left"}
                        fontSize={12}
                    >
                        Todays Views: {count}
                    </Typography>
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
            <Grid xs={12} sm={12} padding={{ sm: 4, xs: 4, md: 1 }}>
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
