import { Input } from "../ui/input";

function Search() {
  return (
    <Input
      type="text"
      placeholder="Explore books and authors"
      className="max-w-xs dark:bg-muted"
    />
  );
}

export default Search;
