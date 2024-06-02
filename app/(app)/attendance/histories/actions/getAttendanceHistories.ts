interface QueryParams {
	date?: string;
	department?: string;
}

export default async function getAttendanceHistories(queryParams?: QueryParams) {
	try {
		const queryParamsRecord: Record<string, string> = {};
		if (queryParams) {
			if (queryParams.date) {
				queryParamsRecord.date = queryParams.date;
			}
			if (queryParams.department) {
				queryParamsRecord.department = queryParams.department;
			}
		}
		const queryParamsString = new URLSearchParams(queryParamsRecord).toString();
		const res = await fetch(`http://localhost:8000/api/v1/attendances/histories?${queryParamsString}`, { cache: 'no-cache' });
		if (!res.ok) {
			throw new Error('Error fetching log');
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
