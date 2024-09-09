import { Label } from "../ui/label";
import { Input } from "../ui/input";

type InputFieldProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
};

function InputField({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
}: InputFieldProps) {
  return (
    <div>
      <Label
        htmlFor={name}
        className="capitalize"
      >
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required ? true : undefined}
      ></Input>
    </div>
  );
}

export default InputField;
