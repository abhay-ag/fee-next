import { Metadata } from "next";
import StudentComponent from "./components/StudentHomePage";
import { UserNav } from "@/app/components/user-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Student Dashboard",
};

export default function DashboardPage() {
  return (
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
      <StudentComponent />
    </div>
  );
}
