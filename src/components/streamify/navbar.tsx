import { AudioLines, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10 justify-between">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <AudioLines className="h-6 w-6" />
          <span className="sr-only">Streamify LLC</span>
        </a>
        <a
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          User Management
        </a>
        <a
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Top Charts
        </a>
        <a
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Revenue Insights
        </a>
        <a
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Help Center
        </a>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <AudioLines className="h-6 w-6" />
              <span className="sr-only">Streamify LLC</span>
            </a>
            <a href="#" className="hover:text-foreground">
              Dashboard
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              User Management
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Top Charts
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Revenue Insights
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Help Center
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <ModeToggle />
    </header>
  );
}
