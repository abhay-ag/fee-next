"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  roll_no: z
    .string()
    .min(10, { message: "Please enter a valid roll number" })
    .max(10),
  name: z.string().min(3, { message: "Please enter a valid name" }),
  email_id: z.string().email(),
  password: z.string().min(6),
  courses: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one course.",
  }),
});

export function AddStudentForm({
  onAction,
  values,
  courses,
}: {
  onAction: ({ action }: { action: string }) => void;
  values?: any;
  courses: any[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: values._id ? values.name : "",
      roll_no: values._id ? values.roll_no : "",
      email_id: values._id ? values.email_id : "",
      password: values._id ? values.password : "",
      courses: values._id ? values.courses : [],
    },
  });

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await fetch(`/student/${values._id ? "update" : "add"}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        onAction({ action: "close" });
        onAction({ action: "fetchData" });
      } else {
        toast({
          title: "Duplicate entry found! Try updating instead",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-16">
        <FormField
          control={form.control}
          name="roll_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roll Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="roll number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of student</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courses"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">
                List of courses
                <FormDescription>Select all that apply</FormDescription>
              </FormLabel>
              <ScrollArea className="h-16 w-full">
                {courses.map((item) => (
                  <FormField
                    key={item.c_id}
                    control={form.control}
                    name="courses"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.c_id}
                          className="flex mb-1 flex-row items-center gap-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.c_id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.c_id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.c_id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.c_id}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set a password</FormLabel>
              <FormControl>
                <Input
                  disabled={values._id}
                  type="password"
                  placeholder="user password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {!values._id ? "Submit" : "Update details"}
        </Button>
      </form>
    </Form>
  );
}
