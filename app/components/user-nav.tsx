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

export function UserNav({ admin }: { admin?: boolean }) {
  const [user, setUser] = useRecoilState(userState);
  const [details, setDetails] = useRecoilState(userDetails);
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{admin ? "A" : "AA"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {admin ? "Admin" : "Abhay Aggarwal"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {admin ? "admin" : "2110990034"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setUser("");
            setDetails({});
            localStorage.setItem("roll_no", "");
            router.replace("/");
          }}
          className="text-red-500 cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
