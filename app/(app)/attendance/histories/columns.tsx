"use client"

import { convertUTCToLocalDateTimeString } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

export type AttendanceHistories = {
  DepartmentName: string
  ClockInDiff: string
  ClockOutDiff: string
  Description: string
}

export const columns: ColumnDef<AttendanceHistories>[] = [
  {
    accessorKey: "DepartmentName",
    header: "Department",
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
    accessorKey: "ClockInDiff",
    header: "Clock In Diff",
    cell: ({ row }) => {
      const clockInDiff = row.getValue('ClockInDiff') as string
      return <p>{clockInDiff.split(".")[0]} UTC+7</p>
    }
  },
  {
    accessorKey: "ClockOutDiff",
    header: "Clock Out Diff",
    cell: ({ row }) => {
      const clockOutDiff = row.getValue('ClockOutDiff') as string
      return <p>{clockOutDiff.split(".")[0]} UTC+7</p>
    }
  },
]


