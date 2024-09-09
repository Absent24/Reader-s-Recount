import { FaBookReader } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../ui/button";
import { Lobster } from "next/font/google";

const lobster = Lobster({ subsets: ["latin"], weight: "400" });

function LogoAndName() {
  return (
    <div>
      <Button
        size="icon"
        asChild
      >
        <Link href="/">
          <FaBookReader className="w-6 h-6" />
        </Link>
      </Button>
      <Link
        href="/"
        className={`text-lg font-semibold ml-2 drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-[#155f52] to-[#2bbbaa] ${lobster.className}`}
      >
        Reader's Recount
      </Link>
    </div>
  );
}

export default LogoAndName;
