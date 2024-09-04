import { FC, useState } from "react";
import { useTheme } from "next-themes";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme === "light");

  const onChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsSelected(newTheme === "light");
  };

  return (
    <div
      className={clsx(
        "px-px transition-opacity hover:opacity-80 cursor-pointer",
        className
      )}
      onClick={onChange}
    >
      <VisuallyHidden>
        <input type="checkbox" checked={isSelected} onChange={onChange} />
      </VisuallyHidden>
      <div
        className={clsx(
          "w-auto h-auto bg-transparent rounded-lg flex items-center justify-center",
          isSelected ? "bg-transparent text-default-500" : "bg-transparent"
        )}
      >
        {!isSelected ? (
          <SunFilledIcon size={22} />
        ) : (
          <MoonFilledIcon size={22} />
        )}
      </div>
    </div>
  );
};
