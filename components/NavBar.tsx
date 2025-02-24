"use client";
import * as React from "react";
import { Moon, Pencil, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const [color, setColor] = React.useState<boolean>(false);
  const { setTheme } = useTheme();

  const applyColor = () => {
    if (color === true) {
      setColor(false);
      setTheme("dark");
    } else {
      setColor(true);
      setTheme("light");
    }
  };

  return (
    <nav className="flex justify-between items-center p-2 px-6 drop-shadow-lg bg-white dark:bg-black dark:drop-shadow-lg">
      <Button
        variant={"link"}
        className="text-lg flex gap-3 items-center justify-center"
      >
        <Pencil className="w-[2rem] h-[2rem]" /> Todo App
      </Button>
      <div>
        <Button variant={"secondary"} onClick={() => applyColor()}>
          {color ? (
            <Moon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-100 transition-all dark:-rotate-0" />
          ) : (
            <Sun className="w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90" />
          )}
        </Button>
      </div>
    </nav>
  );
}
