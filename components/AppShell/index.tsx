import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import MobileNav from "./MobileNav"
import DesktopNav from "./DesktopNav"
import { signOut } from "@/app/auth"
import Avatar from "./Avatar"
import ThemeSwitchMenu from "./ThemeSwitchMenu"

export function AppShell({ children }: { children: React.ReactNode }) {

  const logoutAction = async () => {
    'use server';
    await signOut();
  }
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[65px] items-center border-b px-6">
            <span className="">Fleetify Test</span>
            <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
            </Link>
          </div>
          <DesktopNav />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[70px] items-center gap-4 border-b px-6 dark:bg-gray-800/40">
          <MobileNav />
          <div className="w-full lg:flex-1">
          </div>
          <ThemeSwitchMenu />
          <div className="ml-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                  size="icon"
                  variant="ghost"
                >
                  <Avatar />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <form action={logoutAction}>
                  <DropdownMenuItem>
                    <button type="submit">
                      Logout
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="h-full light:bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  )
}


