import DarkMode from "./DarkMode";
import LogoAndName from "./LogoAndName";
import Menu from "./Menu";
import Search from "./Search";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="hidden container md:flex flex-row justify-between items-center flex-wrap gap-4 py-5">
        <LogoAndName />
        <Search />
        <div className="flex gap-4 items-center">
          <DarkMode />
          <Menu />
        </div>
      </div>
      <div className="md:hidden container flex flex-col gap-4 py-1">
        <div className="flex flex-row justify-between gap-4 py-1">
          <LogoAndName />
          <div className="flex gap-4 items-center">
            <DarkMode />
            <Menu />
          </div>
        </div>
        <div className="flex justify-center pb-2">
          <Search />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
