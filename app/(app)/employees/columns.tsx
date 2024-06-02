"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Clock, EyeIcon, MoreHorizontal, PencilIcon, XIcon } from "lucide-react"
import UpdateEmployeeDialog from "./components/UpdateEmployeeDialog"
import { useEffect, useState } from "react"
import getDepartments from "../departments/actions/getDepartments"
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogDescription, AlertDialogAction, AlertDialogFooter } from "@/components/ui/alert-dialog"
import DeleteEmployeeAlertDialog from "./components/DeleteEmployeeDialog"
import { toast } from "@/components/ui/use-toast"
import { revalidateTag } from "next/cache"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
  id: string
  employee_id: string
  name: string
  department_name: string
  address: string
  department_id: string
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "employee_id",
    header: () => <div className="uppercase">NIK</div>,
    cell: ({ row }) => {
      const employee_id = row.getValue('employee_id') as string
      return <p className="uppercase">{employee_id}</p>
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department_name",
    header: "Department"
  },
  {
    accessorKey: "department_id",

  },
  {
    accessorKey: "address",
    header: "Address"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original
      const [departments, setDepartments] = useState([])
      const [isDialogOpen, setIsDialogOpen] = useState(false)

      useEffect(() => {
        if (isDialogOpen) {
          async function fetchDepartments() {
            const departmentsData = await getDepartments()
            setDepartments(departmentsData)
          }
          fetchDepartments()
        }
      }, [isDialogOpen])
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <UpdateEmployeeDialog employeeData={employee} departments={departments} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Clock className="mr-2 h-4 w-4" />
              <span>
                Attendance History
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      )
    }
  },
  {
    id: "delete-actions",
    cell: ({ row }) => {
      const employeeId = row.original.id

      const handleDelete = async () => {
        try {
          // Send a request to delete the employee based on the employee ID
          const res = await fetch(`http://localhost:8000/api/v1/employees/${employeeId}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          toast({
            title: "Employee deleted succesfully"
          })
          window.location.reload()
        } catch (error) {
          console.error("Error deleting employee:", error);
          // Optionally, provide feedback to the user about the error
        }
      };
      return (
        <AlertDialog>
          <AlertDialogTrigger className="text-red-400">Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the employee.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }
  }
]

