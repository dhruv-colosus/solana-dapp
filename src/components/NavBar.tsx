import { Link } from "react-router-dom";
import { Link2Off, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
function NavBar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 w-full justify-between">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Link2Off className="h-6 w-6" />
          <p className="font-black">DApp</p>
          <span className="sr-only">DApp</span>
        </Link>
        <Link
          to="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <Link
          to="/airdrop"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Airdrop
        </Link>
        <Link
          to="/launchtoken"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Token Launchpad
        </Link>
        <Link
          to="/swap"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Swap{" "}
        </Link>
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
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Link2Off className="h-6 w-6" />
              <span className="sr-only">DApp</span>
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/airdrop"
              className="text-muted-foreground hover:text-foreground"
            >
              Airdrop
            </Link>
            <Link
              to="launchtoken"
              className="text-muted-foreground hover:text-foreground"
            >
              Token Launchpad
            </Link>
            <Link
              to="swap"
              className="text-muted-foreground hover:text-foreground"
            >
              Swap
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex justify-end ">
        <WalletMultiButton />
      </div>
    </header>
  );
}

export default NavBar;
