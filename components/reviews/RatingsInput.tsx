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
  defalut,
}: {
  name: string;
  labelText?: string;
  defalut?: number;
}) => {
  const numbers = ["5", "4", "3", "2", "1"];
  const defaultRating = defalut ? defalut.toString() : "5";

  return (
    <div className="mb-2 max-w-48">
      <Label
        htmlFor={name}
        className="capitalize">
        {labelText || name}
      </Label>
      <Select
        defaultValue={defaultRating}
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
