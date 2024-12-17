import { Grid, Stack, Typography } from '@mui/joy';
import { LoadingButton } from "@mui/lab";
import { useState } from 'react';

export default function Content() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (loading) {
        return (
            <Grid container direction="row" justifyContent="space-around" alignItems="stretch">
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
        <Grid container direction="column">
            <Stack spacing={1} >
                <Typography level='body-md'>{}</Typography>
            </Stack>
        </Grid>

    )
}
