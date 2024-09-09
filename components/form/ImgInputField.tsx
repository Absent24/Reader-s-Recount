import { Input } from "../ui/input";
import { Label } from "../ui/label";

function ImgInputField() {
  const name = "image";
  return (
    <div className="mb-2">
      <Label
        htmlFor={name}
        className="capitalize">
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className="max-w-xs"></Input>
    </div>
  );
}

export default ImgInputField;
