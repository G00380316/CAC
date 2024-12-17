export const dynamic = 'force-dynamic';

export async function scrapeWFT() {


    try {

        const res = await fetch(`${process.env.FAITHPALSERVER_URL}/messages/get/${session?.user?._id}`, { cache: 'no-store' });
        const data = await res.json();
        //console.log('API Response:', data);

        return data;

    } catch (error) {

        console.error('Error completing the Webscrape function:', error);

        throw error;

    }
}
