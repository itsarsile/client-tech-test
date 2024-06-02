"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { PlusIcon } from "lucide-react"
import { convertToUTCTimeString } from "@/lib/utils"

interface AttendanceDialogProps {
  employees: {
    employee_id: string
  }[]
}

const FormSchema = z.object({
  employee_id: z.string(),
  attendance_type: z.enum(["1", "0"]),
})

export default function AttendanceDialog({ employees }: AttendanceDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      employee_id: employees.length > 0 ? employees[0].employee_id : "",
      attendance_type: "1",
    },
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const endpoint = data.attendance_type === "1" ? "/clockin" : "/clockout";

      const res = await fetch(`http://localhost:8000/api/v1${endpoint}`, {
        method: data.attendance_type === "1" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id: data.employee_id
        }),
      })

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      toast({
        title: "Punch log created successfully"
      })

      window.location.reload()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error punching log:", error)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="mb-2">
          <PlusIcon className="mr-2 w-4 h-4" />
          <span>
            Punch Attendance Log
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Punch Log for Employee</DialogTitle>
          <DialogDescription>Fill out the form to punch the attendance log</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="employee_id"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="employee_id" className="text-right">
                      Employee ID
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-60">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {employees.map((employee) => (
                            <SelectItem key={employee.employee_id} value={employee.employee_id}>
                              {employee.employee_id}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendance_type"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="attendance_type" className="text-right">
                      Attendance Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-60">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">In</SelectItem>
                          <SelectItem value="0">Out</SelectItem>
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
    </Dialog>
  )
}
