"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

type SubmitBtnProps = {
  className?: string;
  text?: string;
  size?: "lg" | "sm" | "icon" | null;
};

export function SubmitBtn({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`capitalize ${className}`}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
