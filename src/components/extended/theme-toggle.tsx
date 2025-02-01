import React from 'react'

import { useTheme } from "next-themes";
import { Sun, Moon, Trash } from "lucide-react";
import { Button } from "../ui/button";
const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <div>
 <Button onClick={toggleTheme} size="icon" variant="outline">
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
    </div>
  )
}

export default ThemeToggle