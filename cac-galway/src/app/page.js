"use client"

import Image from 'next/image'
import { Box, Grid, Typography } from '@mui/joy'
import styles from './page.module.css'
import Content from '@/components/Content.js'


export default function Home() {
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
                <Content />
            </Grid>
        </main>
    )
}
