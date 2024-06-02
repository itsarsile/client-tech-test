"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../../components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../../../../components/ui/select"
import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { revalidateTag } from "next/cache"
import { toast } from "@/components/ui/use-toast"
import { PlusIcon } from "lucide-react"

interface EmployeeDialogProps {
  departments: [
    {
      ID: number,
      DepartmentName: string,
    }
  ]
}

const FormSchema = z.object({
  name: z.string(),
  employee_id: z.string(),
  address: z.string(),
  department_id: z.string()
})


export default function AddEmployeeDialog({ departments }: EmployeeDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const employeeData = {
      ...data,
      department_id: parseInt(data.department_id, 10),
    }
    try {
      const res = await fetch("http://localhost:8000/api/v1/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),

      })


      if (!res.ok) {
        throw new Error("Network response was not ok");
      }


      toast({
        title: "Employee created succesfully"
      })

      window.location.reload()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error creating employee:", error)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="mb-2">
          <PlusIcon className="mr-2 w-4 h-4" />
          <span>
            Add New Employee
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
