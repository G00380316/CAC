"use client"

import Image from 'next/image'
import { Box, Typography } from '@mui/joy'
import styles from './page.module.css'
import Content from '@/components/Content.js'
import { useEffect } from 'react'

//useEffect(()=>{},[])

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
                        width={125}
                        height={125}
                        priority
                    />
                    <Typography
                        level='title-lg'
                        fontSize={24}
                        sx={{ color: "black" }}
                        marginTop={1}>
                        CAC Study Material
                    </Typography>
                </Box>
            </nav>
            <Content />
        </main>
    )
}
