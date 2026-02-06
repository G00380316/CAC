"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./scrape.module.css"

export default function LoginForm() {

    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            if (!url) return;

            const res = await fetch("/api/webscrape/ss/scrape", {
                method: "POST", headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SECRET}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url
                })
            })

            if (res.error) {
                setError("Invalid Entry");
                return;
            }

            router.replace("/");
        }
        catch (error) {
            // console.log(error);
        }
    };

    return (
        <main style={{ display: "flex", flexDirection: "column", height: "100vh", background: 'whitesmoke', alignItems: "center", justifyContent: "center" }}>
            < div className={styles.container} >
                <div>
                    <h3 style={{ margin: "15px" }}>Scrape Sunday School</h3>
                    <p className={styles.description}>Enter Sunday School Url below</p>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="url">Url</label>
                        <input onChange={(e) => setUrl(e.target.value)} type="url" id="url"></input>
                    </div>
                    <div>
                        <button>Submit</button>
                        {error && (
                            <div className={styles.error}>
                                {error}
                            </div>)}
                    </div>
                </form >
                <br></br>
                <br></br>
            </div >
        </main>
    )
}
