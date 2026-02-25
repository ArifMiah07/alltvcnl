import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className=" flex flex-col items-center justify-center rounded border
                 text-black dark:text-white
                 ">
      {theme === "dark" ? (
        <SunMedium className="w-[16px] h-[16px]" />
      ) : (
        <Moon className="w-[16px] h-[16px]" />
      )}
    </button>
  );
}
