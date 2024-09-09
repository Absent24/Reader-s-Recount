"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";

function SignOut() {
  const { toast } = useToast();
  const handleClick = () => {
    toast({ description: "You have been signed out." });
  };

  return (
    <SignOutButton redirectUrl="/">
      <button
        className="w-full text-left"
        onClick={handleClick}
      >
        Sign Out
      </button>
    </SignOutButton>
  );
}

export default SignOut;
