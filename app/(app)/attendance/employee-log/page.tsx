import getEmployees from "../../employees/actions/getEmployees";
import getAttendanceLogs from "./actions/getAttendanceLogs";
import { columns } from "./columns";
import AttendanceDialog from "./components/AttendanceDialog";
import { DataTable } from "./data-table";

export default async function EmployeeLog() {
  const data = await getAttendanceLogs()
  const employee = await getEmployees()
  return (
    <div>
      <h1 className="p-5 font-black text-2xl">Attendance Logs</h1>
      <AttendanceDialog employees={employee} />
      <DataTable columns={columns} data={data} />
    </div>
  )
}



