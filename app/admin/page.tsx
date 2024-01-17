import { Metadata } from "next";
import { Overview } from "@/app/components/overview";
import { UserNav } from "@/app/components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableDemo } from "../components/data-table";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Student Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <div className="min-h-screen space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">DashLMS</h2>
          <div className="flex gap-3 items-center">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <UserNav admin />
          </div>
        </div>
        <DataTableDemo />
      </div>
    </>
  );
}
