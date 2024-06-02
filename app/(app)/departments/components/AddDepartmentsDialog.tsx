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

const FormSchema = z.object({
  department_name: z.string(),
  max_clock_in_time: z.string(),
  max_clock_out_time: z.string(),
})


export default function AddDepartmentDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {

      const maxClockInTime = convertToUTCTimeString(data.max_clock_in_time)
      const maxClockOutTime = convertToUTCTimeString(data.max_clock_out_time)

      const departmentData = {
        department_name: data.department_name,
        max_clock_in_time: maxClockInTime,
        max_clock_out_time: maxClockOutTime,
      };


      const res = await fetch("http://localhost:8000/api/v1/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentData),

      })


      if (!res.ok) {
        throw new Error("Network response was not ok");
      }


      toast({
        title: "Department created succesfully"
      })

      window.location.reload()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error creating department:", error)
    }
  }


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="mb-2">
          <PlusIcon className="mr-2 w-4 h-4" />
          <span>
            Add New Department
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Department</DialogTitle>
          <DialogDescription>Fill out the form to add a new department.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="department_name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="id" className="text-right">
                      Department Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} id="id" placeholder="Enter department name" className="col-span-3" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max_clock_in_time"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="id" className="text-right">
                      Max Clock-In
                    </FormLabel>
                    <FormControl>
                      <Input {...field} aria-label="Time" type="time" className="col-span-3" step="1" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max_clock_out_time"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="id" className="text-right">
                      Max Clock-Out
                    </FormLabel>
                    <FormControl>
                      <Input {...field} aria-label="Time" type="time" className="col-span-3" step="1" />
                    </FormControl>
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

