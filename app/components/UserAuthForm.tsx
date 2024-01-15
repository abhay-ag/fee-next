"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
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
              disabled={isLoading}
            />
            <Input
              id="password"
              name="password"
              placeholder="password"
              type="password"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>Login</Button>
        </div>
      </form>
    </div>
  );
}
