import getDepartments from "./actions/getDepartments"
import { columns } from "./columns"
import AddDepartmentDialog from "./components/AddDepartmentsDialog"
import { DataTable } from "./data-table"

export default async function DepartmentsPage() {
  const data = await getDepartments()
  return (
    <div>
      <AddDepartmentDialog />
      <DataTable columns={columns} data={data} />
    </div>
  )
}



