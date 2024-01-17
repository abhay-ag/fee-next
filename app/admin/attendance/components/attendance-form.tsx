"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  attendance: z.array(z.string()),
});

export default function StudentAttendance() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendance: [],
    },
  });

  const [selectedValue, setValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const getCourses = async () => {
    const resp = await fetch("/courses", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await resp.json();
    setCourses(data.data);
  };

  const getStudentsByCourse = async () => {
    const resp = await fetch("/courses/byid", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        c_id: selectedValue,
      }),
    });
    const data = await resp.json();
    setStudents(data.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (selectedValue !== "") {
      getStudentsByCourse();
      form.reset();
    }
  }, [selectedValue]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await fetch("/attendance/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        c_id: selectedValue,
        attendance: data.attendance,
      }),
    });
  };

  return (
    <>
      {courses.length ? (
        <>
          <div className="flex flex-col gap-8">
            <Select value={selectedValue} onValueChange={(e) => setValue(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((el: any) => {
                  return (
                    <SelectItem key={el.c_id} value={el.c_id}>
                      <b>{el.c_id}</b> - {el.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div className="border rounded-lg p-1">
              {selectedValue === "" ? (
                <div className="font-light text-sm opacity-50">
                  Please select a course to view the list of students
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="attendance"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-lg">
                            List of students in <b>{selectedValue}</b>
                          </FormLabel>
                          {students.map((item: any, index: any) => (
                            <FormField
                              key={item.roll_no}
                              control={form.control}
                              name="attendance"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.roll_no}
                                    className={`flex h-8 flex-row items-center gap-3  rounded-lg px-1 space-y-0 ${
                                      index % 2 === 0 ? "bg-gray-100" : ""
                                    }`}
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          item.roll_no
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.roll_no,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== item.roll_no
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {item.roll_no}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />
                    <Button
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "px-4 py-1 rounded-full mt-4"
                      )}
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <LoadingOutlined className="text-5xl" />
        </div>
      )}
    </>
  );
}
