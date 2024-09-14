import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ReviewInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

function ReviewInput({ name, labelText, defaultValue }: ReviewInputProps) {
  return (
    <div className="mb-2">
      <Label
        htmlFor={name}
        className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={5}
        required
        className="leading-loose"
      />
    </div>
  );
}

export default ReviewInput;
