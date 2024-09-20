"use client";
import { useRouter } from "next/navigation";
import SortDropdown from "./SortDropdown";

function SortList() {
  const router = useRouter();
  function handleSelection(category: string) {
    router.push(`/?category=${category}`);
  }
  return (
    <div className="flex flex-row justify-center text-primary">
      <SortDropdown
        name="Order by:"
        passValue={handleSelection}
        labelText="Sort By:"
      />
    </div>
  );
}

export default SortList;
