"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = document.querySelector<HTMLInputElement>("#roll_no")?.value;
    const password =
      document.querySelector<HTMLInputElement>("#password")?.value;
    await fetch("/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roll_no: id, password: password }),
    }).then((resp) => {
      if (resp.ok) {
        router.push("/u");
      } else {
        toast({ title: "Please check your credentials" });
      }
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Input
              id="roll_no"
              name="roll_no"
              placeholder="roll number"
              type="number"
              required
              disabled={isLoading}
            />
            <Input
              id="password"
              name="password"
              placeholder="password"
              type="password"
              required
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>Login</Button>
        </div>
      </form>
    </div>
  );
}
