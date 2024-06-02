"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { formatTime } from "@/lib/utils"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Clock, EyeIcon, MoreHorizontal, PencilIcon, XIcon } from "lucide-react"
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogDescription, AlertDialogAction, AlertDialogFooter } from "@/components/ui/alert-dialog"
import UpdateDepartmentsDialog from "./components/UpdateDepartmentsDialog"
import { departments } from "drizzle/schema"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
  ID: string,
  DepartmentName: string
  MaxClockInTime: string
  MaxClockOutTime: string
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "DepartmentName",
    header: "Department Name"
  },
  {
    accessorKey: "MaxClockInTime",
    header: "Max Clock In",
    cell: ({ cell }) => formatTime(cell.getValue() as string)
  },
  {
    accessorKey: "MaxClockOutTime",
    header: "Max Clock Out",
    cell: ({ cell }) => formatTime(cell.getValue() as string)
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const department = row.original


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
              <UpdateDepartmentsDialog departments={department} />

              <DropdownMenuItem>
                <XIcon className="mr-2 h-4 w-4" />
                <span>
                  Delete
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  {
    id: "delete-actions",
    cell: ({ row }) => {
      const department_id = row.original.ID

      const handleDelete = async () => {
        try {
          // Send a request to delete the employee based on the employee ID
          const res = await fetch(`http://localhost:8000/api/v1/departments/${department_id}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          toast({
            title: "Department deleted succesfully"
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
                This action cannot be undone. This will permanently delete the department.
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

