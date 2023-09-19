"use client"

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { CopyIcon, ServerIcon } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

const textMap: Record<"public" | "admin", string> = {
  admin: "admin",
  public: "Public",
};

const variantMap: Record<"public" | "admin", BadgeProps["variant"]> = {
  admin: "destructive",
  public: "secondary",
};

const ApiAlert = ({
  title,
  desc,
  variant,
}: {
  title: string;
  desc: string;
  variant: "public" | "admin";
}) => {
  const onCopy = (desc: string) => {
    navigator.clipboard.writeText(desc)
    toast.success("API Route copied to the clipboard.")
  };
  return (
    <Alert>
      <ServerIcon className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] y-[rem] font-mono text-sm font-semibold">
          {desc}
        </code>
        <Button variant="outline" size={"icon"} onClick={() => onCopy(desc)}>
          <CopyIcon className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
