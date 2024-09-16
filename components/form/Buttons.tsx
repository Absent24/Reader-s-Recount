"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";

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
      size={size}>
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

type actionType = "edit" | "delete";
export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPenSquare className="w-6 h-6" />;
      case "delete":
        return <LuTrash2 className="w-6 h-6" />;
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer w-9 h-9 z-50">
      {pending ? <ReloadIcon className=" animate-spin" /> : renderIcon()}
    </Button>
  );
};
