// import { Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
// import { MoonIcon } from "@radix-ui/react-icons";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../assets/icons/MoonIcon";
import { SunIcon } from "../assets/icons/SunIcon";
// import {MoonIcon} from "./MoonIcon";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      {/* <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      >
        <Sun
          size={20}
          className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <MoonIcon className="text-2xl absolute   rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button> */}
      <Switch
        defaultSelected={theme == "dark" ? true : false}
        size="lg"
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        color="secondary"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      ></Switch>
    </div>
  );
}
