export default async function getAttendanceLogs() {
	try {
		const res = await fetch("http://localhost:8000/api/v1/attendances/log", { cache: "no-cache", next: { tags: ['employees'] } })
		if (!res.ok) {
			throw new Error('Error feftching log')
		}

		const data = await res.json()

		return data
	} catch (error) {
		console.error(error)
	}
}

