"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../../components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../../../../components/ui/select"
import React, { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../../../components/ui/form"
import { PencilIcon, PlusIcon } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

interface EmployeeDialogProps {
  departments: {
    ID: number,
    DepartmentName: string,
  }[],
  employeeData?: {
    id: string,
    employee_id: string,
    name: string,
    address: string,
    department_id: string,
    department_name: string,
  },
  isOpen: boolean,
  onOpenChange: (isOpen: boolean) => void
}

const FormSchema = z.object({
  name: z.string(),
  employee_id: z.string(),
  address: z.string(),
  department_id: z.string(),
})


export default function UpdateEmployeeDialog({ employeeData, departments, isOpen, onOpenChange }: EmployeeDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: employeeData
  })

  useEffect(() => {
    if (employeeData) {
      form.reset(employeeData);
    }
  }, [employeeData, form]);


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const updatedEmployeeData = {
      ...data,
      department_id: parseInt(data.department_id, 10),
    }
    try {
      const res = await fetch(`http://localhost:8000/api/v1/employees/${employeeData?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployeeData),
      })

      if (!res.ok) {
        throw new Error("Network response was not ok")
      }

      const responseData = await res.json()

      toast({
        title: "Employee updated successfully"
      })

      onOpenChange(false)
    } catch (error) {
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <PencilIcon className="mr-2 h-4 w-4" />
          <span>
            Edit
          </span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Employee</DialogTitle>
          <DialogDescription>Fill out the form to add a new employee.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="employee_id"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="id" className="text-right">
                      Employee ID
                    </FormLabel>
                    <FormControl>
                      <Input {...field} id="id" placeholder="Enter employee ID" className="col-span-3" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="id" className="text-right">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} id="id" placeholder="Enter employee name" className="col-span-3" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="id" className="text-right">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input {...field} id="id" placeholder="Enter employee address" className="col-span-3" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="departments" className="text-right">
                      Departments
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={`${field.value}`}>
                      <SelectTrigger className="w-60">
                        <SelectValue placeholder="Select departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {departments.map((department) => (
                            <SelectItem value={`${department.ID}`}>{department.DepartmentName}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}

