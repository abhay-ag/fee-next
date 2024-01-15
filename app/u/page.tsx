import { Metadata } from "next";
import { Overview } from "@/app/components/overview";
import { UserNav } from "@/app/components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

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
            <UserNav />
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Course Content</TabsTrigger>
            <TabsTrigger value="reports">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="flex items-center">
                <CardContent className="pt-3">
                  <div className="text-2xl font-bold">System Designn</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="flex items-center">
                <CardContent className="pt-3">
                  <div className="text-2xl font-bold">ADI</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="flex items-center">
                <CardContent className="pt-3">
                  <div className="text-2xl font-bold">NALR</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-3">
                  <div className="text-2xl font-bold">BEE</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-7">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
