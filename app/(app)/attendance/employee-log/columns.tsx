"use client"

import { convertUTCToLocalDateTimeString } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

export type AttendanceLog = {
  EmployeeID: string
  AttendanceID: string
  AttendanceType: string
  Description: string
}

export const columns: ColumnDef<AttendanceLog>[] = [
  {
    accessorKey: "AttendanceID",
    header: "ID",
  },
  {
    accessorKey: "EmployeeID",
    header: () => <div className="uppercase">NIK</div>,
    cell: ({ row }) => {
      const employee_id = row.getValue('EmployeeID') as string
      return <p className="uppercase">{employee_id}</p>
    }
  },
  {
    accessorKey: "DateAttendance",
    header: "Date",
    cell: ({ row }) => {
      const dateAttendance = row.getValue('DateAttendance') as string
      const localDateTime = convertUTCToLocalDateTimeString(dateAttendance)
      return <p>{localDateTime}</p>
    }
  },
  {
    accessorKey: "Description",
    header: "Description"
  },
]


