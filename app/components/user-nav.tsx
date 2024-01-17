"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { userState } from "../states/userState";
import { userDetails } from "../states/userDetails";
import { useRouter } from "next/navigation";
import { attendanceState } from "../states/attendanceState";
import { courseState } from "../states/coursesState";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export function UserNav({ admin }: { admin?: boolean }) {
  const [user, setUser] = useRecoilState(userState);
  const [details, setDetails] = useRecoilState<any>(userDetails);
  const [attendance, setAttendance] = useRecoilState(attendanceState);
  const [courses, setCourses] = useRecoilState(courseState);
  const router = useRouter();

  const getUserInitials = () => {
    let userInitials = details.name.split(" ")[0].charAt(0);
    if (details.name.split(" ")[1]) {
      userInitials += details.name.split(" ")[1].charAt(0);
    }
    return userInitials;
  };
  useEffect(() => {
    if (details.roll_no) {
      getUserInitials();
    }
  }, [details]);
  return (
    <>
      {details.roll_no || admin ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {admin ? "A" : getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {admin ? "Admin" : details.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {admin ? "admin" : details.roll_no}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setUser("");
                setDetails({});
                setAttendance([]);
                setCourses([]);
                localStorage.setItem("roll_no", "");
                router.replace("/");
              }}
              className="text-red-500 cursor-pointer"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <LoadingOutlined />
          </AvatarFallback>
        </Avatar>
      )}
    </>
  );
}
