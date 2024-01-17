import { UserNav } from "@/app/components/user-nav";
import StudentAttendance from "./components/attendance-form";

export default function Page() {
  return (
    <div className="min-h-screen space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          DashLMS - Attendance
        </h2>
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
      <StudentAttendance />
    </div>
  );
}
