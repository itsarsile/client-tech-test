export default async function getDepartments() {
	try {
		const res = await fetch("http://localhost:8000/api/v1/departments", { cache: "no-cache" })
		if (!res.ok) {
			throw new Error('Error fetching departments')
		}

		const data = await res.json()

		return data
	} catch (error) {
		console.error(error)
	}
}
