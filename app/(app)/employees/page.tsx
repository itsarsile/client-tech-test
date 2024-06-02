import getDepartments from "../departments/actions/getDepartments"
import getEmployees from "./actions/getEmployees"
import { columns } from "./columns"
import AddEmployeeDialog from "./components/AddEmployeeDialog"
import { DataTable } from "./data-table"

export default async function EmployeePage() {
  const employee = await getEmployees()
  const departments = await getDepartments()
  return (
    <div>
      <AddEmployeeDialog departments={departments} />
      <DataTable columns={columns} data={employee} />
    </div>
  )
}



