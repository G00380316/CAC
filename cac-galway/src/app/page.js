"use client"

import Image from 'next/image'
import { Box, Grid, Typography } from '@mui/joy'
import styles from './page.module.css'
import Content from '@/components/Content.js'
import { useEffect, useState, useRef } from 'react';

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

export default function Home() {
    const [count, setCount] = useState(1);
    const [error, setError] = useState(null);
    const fetchRan = useRef(false);

    let currentDate = getDate();

    useEffect(() => {

        const fetchCount = async () => {
            if (fetchRan.current) return;
            fetchRan.current = true;

            try {
                const response = await fetch('/api/getCount')
                const storedData = await response.json()
                if (!storedData.counter) {
                    const res = await fetch('/api/createCount', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ date: currentDate })
                    })
                    const data = await res.json()
                    if (res.ok) { console.log(data) }
                }

                const currentDataDate = getDataDate(storedData.counter.createdAt)

                if (currentDate === currentDataDate) {
                    const res = await fetch('/api/updateCount', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ date: currentDate })
                    })
                    const data = await res.json()
                    console.log(data)
                    setCount(data.counter.count);
                } else {
                    const res = await fetch('/api/createCount', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ date: currentDate })
                    })
                    const data = await res.json()
                    if (res.ok) { console.log(data) }
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setError(true);
            }

        }

        fetchCount()

    }, [])

    return (
        <main className={styles.main}>
            <nav style={{ width: "100vw" }}>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={'center'}
                    padding={1}
                >
                    <Image
                        src={"/CacGalwaylogo.jpg"}
                        alt='Cac Galway Logo'
                        className='{styles.vercelLogo}'
                        width={75}
                        height={75}
                        priority
                    />
                    <Typography
                        level='title-md'
                        fontSize={24}
                        sx={{
                            color: "black",
                            fontFamily: "'Roboto,sans -serif"
                        }}
                        marginTop={1}
                        alignSelf={'center'}
                        justifySelf={'center'}
                    >
                        CAC Study Material
                    </Typography>
                </Box>
            </nav>
            <Grid justifyItems={'center'}>
                <Content count={count} />
            </Grid>
        </main>
    )
}
