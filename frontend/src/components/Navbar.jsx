import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/Theme";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (  
     <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="#home" className="text-xl font-bold tracking-tight logo-text">
            LeetConnect
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#home"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#home"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
    
     <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <a href="#sign-in">Sign In</a>
          </Button>
          <Button asChild>
            <a href="#get-started">Get Started</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}