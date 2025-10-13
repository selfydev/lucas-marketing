import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  // Placeholder for dark mode toggle - will be implemented later
  return (
    <Button
      className="h-9 w-9"
      onClick={() => {
        // TODO: Implement dark mode toggle
        console.log("Dark mode toggle clicked");
      }}
      size="icon"
      variant="ghost"
    >
      <Sun className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
