import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RatingInput = ({
  name,
  labelText,
}: {
  name: string;
  labelText?: string;
}) => {
  const numbers = ["5", "4", "3", "2", "1"];

  return (
    <div className="mb-2 max-w-48">
      <Label
        htmlFor={name}
        className="capitalize">
        {labelText || name}
      </Label>
      <Select
        defaultValue={numbers[0]}
        name={name}
        required>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {numbers.map((number) => {
            return (
              <SelectItem
                key={number}
                value={number}>
                {number}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RatingInput;
