"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { LoadingOutlined } from "@ant-design/icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleEllipsisIcon, PlusCircleIcon } from "lucide-react";
import { AddStudentForm } from "./student-form";
import { access } from "fs";
import { CourseForm } from "./course-form";

export type Student = {
  id: number;
  name: string;
  email: string;
};

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Student[]>([]);
  const [open, setOpen] = React.useState(false);
  const [courseOpen, setCourseOpen] = React.useState(false);
  const [edit, setEditData] = React.useState<any>({});

  async function getData() {
    const response = await fetch("/all", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    setData(data.data);
  }

  React.useEffect(() => {
    getData();
  }, []);

  const deleteStudent = async (s_id: string) => {
    await fetch("/student/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roll_no: s_id }),
    }).then((resp) => {
      if (resp.ok) {
        getData();
      }
    });
  };

  const editData = async (s_id: string) => {
    const resp = await fetch("/student/get", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roll_no: s_id }),
    });
    const data = await resp.json();
    setEditData(data.data);
    setOpen(true);
  };

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "roll_no",
      header: "Roll No",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("roll_no")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("name")}</div>;
      },
    },
    {
      accessorKey: "email_id",
      header: "Email",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email_id")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <CircleEllipsisIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => editData(row.getValue("roll_no"))}
                >
                  Edit data
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteStudent(row.getValue("roll_no"))}
                  className="text-red-500"
                >
                  Delete student
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const onAction = ({ action }: { action: string }) => {
    if (action === "close") {
      setOpen(false);
      setTimeout(() => {
        setEditData({});
      }, 200);
    } else if (action === "fetchData") {
      getData();
    } else if (action === "closeCourseForm") {
      setCourseOpen(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter students..."
          value={(table.getColumn("roll_no")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("roll_no")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Dialog
            open={open}
            onOpenChange={(e) => {
              if (!e) {
                onAction({ action: "close" });
              } else {
                setOpen(e);
              }
            }}
          >
            <DialogTrigger className="bg-zinc-900 flex items-center gap-1 text-white px-4 py-1 rounded-lg">
              <PlusCircleIcon className="h-5 w-5" /> Student
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4 text-2xl">
                  Add a new student
                </DialogTitle>
                <AddStudentForm values={edit} onAction={onAction} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog
            open={courseOpen}
            onOpenChange={(e) => {
              setCourseOpen(e);
            }}
          >
            <DialogTrigger className="bg-zinc-900 flex items-center gap-1 text-white px-4 py-1 rounded-lg">
              <PlusCircleIcon className="h-5 w-5" /> Course
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4 text-2xl">
                  Add a new course
                </DialogTitle>
                <CourseForm onAction={onAction} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-md border">
        {data.length ? (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div className="p-4 flex items-center justify-center">
            <LoadingOutlined />
          </div>
        )}
      </div>
    </div>
  );
}
