import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className=" flex flex-col items-center justify-center w-[36px] h-[36px] rounded border
                 text-black dark:text-white
                 bg-white dark:bg-gray-800">
      {theme === "dark" ? <SunMedium /> : <Moon />}
    </button>
  );
}
