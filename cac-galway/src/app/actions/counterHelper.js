'use server'

import { cookies } from 'next/headers'

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

	return date_time;
};


function getEndOfDay() {
	const end = new Date()
	end.setHours(23, 59, 59, 999)
	return end
}

export async function ifNewDay() {
	const cookieStore = cookies()

	const currentDate = getDate();

	const token = cookieStore.get('daily_token')?.value

	if (token !== currentDate) {
		cookieStore.set('daily_token', currentDate, {
			httpOnly: true,
			path: '/',
			expires: getEndOfDay(),
		})


		return { isNewDay: true }
	}

	return { isNewDay: false }
}

