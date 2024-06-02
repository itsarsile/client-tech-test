export default async function getEmployees() {
	try {
		const res = await fetch("http://localhost:8000/api/v1/employees", { cache: "no-cache", next: { tags: ['employees'] } })
		if (!res.ok) {
			throw new Error('Error feftching employees')
		}

		const data = await res.json()

		return data
	} catch (error) {
		console.error(error)
	}
}
