"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortDropdown = ({
  name,
  passValue,
  labelText,
  defalut,
}: {
  name: string;
  passValue: (value: string) => void;
  labelText?: string;
  defalut?: number;
}) => {
  const options = [
    "Rating - High",
    "Rating - Low",
    "Title A-Z",
    "Title Z-A",
    "Author A-Z",
    "Author Z-A",
    "Reviews - High",
    "Reviews - Low",
  ];
  const defaultRating = defalut ? defalut.toString() : "Rating - High";

  function handleChange(value: string) {
    passValue(value);
  }

  return (
    <div className="mb-2 mx-2 px-2 flex flex-row items-center">
      <Label
        htmlFor={name}
        className="capitalize px-2 text-md whitespace-nowrap">
        {labelText || name}
      </Label>
      <Select
        defaultValue={defaultRating}
        name={name}
        onValueChange={handleChange}
        required>
        <SelectTrigger className="min-w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem
                key={option}
                value={option}>
                {option}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortDropdown;
