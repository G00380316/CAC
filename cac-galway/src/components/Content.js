import { Grid, Stack } from '@mui/joy';
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from 'react';

const Styles = {
    root: {
        maxHeight: '80vh',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0.1rem'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0)',
            borderRadius: '0.25em'
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent', // Make the scrollbar track transparent
        },
        scrollbarWidth: 'none', // Hides scrollbar in Firefox
        '-ms-overflow-style': 'none', // Hides scrollbar in older IE/Edge
        '&::-webkit-scrollbar': {
            width: '0', // Hides scrollbar in WebKit-based browsers
        },
    }
};

const getDate = () => {

    let date_time = new Date();

    // get current date
    // adjust 0 before single digit date
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    date_time = year + "-" + month + "-" + date;

    return date_time
}

const getDataDate = (data_date) => {

    const newCreatedAt = data_date.split('T')[0];

    //console.log("Mongodb", newCreatedAt);

    return newCreatedAt;
}
export default function Content() {

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

    let currentDate = getDate();

    useEffect(() => {
        const fetchWFTData = async () => {
            try {
                const response = await fetch('/api/getWFT')
                const storedData = await response.json()

                const currentDataDate = getDataDate(storedData.wft.createdAt)

                if (currentDate == currentDataDate) {
                    setLoading(false);
                    setText(storedData.wft.text);
                    setTitle(storedData.wft.title);
                    setDate(storedData.wft.date);
                    setbibleRef(storedData.wft.bibleRef);
                    setByline(storedData.wft.byline);
                    setAudio(storedData.wft.audio);
                } else {

                    const res = await fetch('http://localhost:5000/webscrape/wft');
                    const data = await res.json();

                    //console.log("Here", data)

                    if (res.ok) {
                        setLoading(false);
                        setText(data.response.text);
                        setTitle(data.response.title);
                        setDate(data.response.date);
                        setbibleRef(data.response.bibleRef);
                        setByline(data.response.byline);
                        setAudio(data.response.audio);
                    }
                }
            } catch (err) {
                //console.error("Fetch Error:", err);
                setError(true);
            }
        };

        const fetchSSData = async () => {
            try {
                const response = await fetch('/api/getSS')
                const storedData = await response.json()
                //console.log(storedData)

                if (storedData.sundaySchool) {
                    setLoading(false);
                    setssText(storedData.sundaySchool.text);
                    setssTitle(storedData.sundaySchool.title);
                }

                if (!storedData.sundaySchool) {

                    const res = await fetch('http://localhost:5000/webscrape/ss');
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

        fetchWFTData()
        fetchSSData()

    }, [])


    if (loading && !text) {
        return (
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="stretch"
            >
                <Grid>
                </Grid>
                <Grid>
                    <Stack marginTop="35vh" alignItems="center">
                        <LoadingButton loading variant="none" size='large' />
                    </Stack>
                </Grid>
                <Grid>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid
            container
            direction={{ xs: 'row', sm: 'row', md: 'row' }}
            justifyContent={'center'}
            sx={Styles.root}
            maxWidth={{ sx: 500, sm: 500, md: 800 }}
        >
            <Grid
                item
                direction={{ md: 'row' }}
                xs={12}  // Full width on extra small screens
                sm={12}  // Full width on small screens
                padding={{ sm: 2, xs: 2, md: 1 }}
            >
                <Stack spacing={1} maxWidth={{ sx: 500, sm: 500, md: 800 }}>
                    <h2
                        dangerouslySetInnerHTML={{ __html: title }}
                        style={{
                            marginTop: 40,
                            alignSelf: 'center',
                            color: 'black'
                        }} />
                    <div
                        dangerouslySetInnerHTML={{ __html: audio }}
                        style={{ alignSelf: 'center' }}
                    />
                    <p
                        dangerouslySetInnerHTML={{ __html: date }}
                        style={{
                            fontSize: 12, alignSelf: 'center', color: 'navy'
                        }} />
                    <p
                        dangerouslySetInnerHTML={{ __html: bibleRef }}
                        style={{
                            fontSize: 14, alignSelf: 'center', color: 'black'
                        }} />
                    <p
                        dangerouslySetInnerHTML={{ __html: byline }}
                        style={{
                            fontSize: 14,
                            fontStyle: 'italic',
                            alignSelf: 'center',
                            color: 'blue'
                        }} />
                    <p
                        dangerouslySetInnerHTML={{ __html: text }}
                        style={{}} />
                    <br />
                    <br />
                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                padding={{ sm: 4, xs: 4, md: 1 }}
            >
                <Stack spacing={1} maxWidth={{ sx: 500, sm: 500, md: 800 }}>
                    <div
                        dangerouslySetInnerHTML={{ __html: ssTitle }}
                        style={{ color: 'black', marginTop: 40 }}
                    />
                    <p
                        dangerouslySetInnerHTML={{ __html: ssText }}
                        style={{ color: 'black' }} />
                </Stack>
            </Grid>
        </Grid>

    )
}
