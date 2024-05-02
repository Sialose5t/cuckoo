"use client";

import Link from "next/link";
import {
  Bell,
  Bird,
  CircleUser,
  Droplet,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { ConnectWallet } from "@thirdweb-dev/react";
import { web3BtnPrimaryStyle } from "@/components/ui/web3-button-style";

const navigationItems = [
  { href: "/portal/staking", label: "Staking", icon: Home },
  { href: "/portal/faucet", label: "Faucet", icon: Droplet },
];

export function DashLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Bird className="h-6 w-6" />
              <span className="">Cuckoo Portal</span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8"
              target={"_blank"}
              href={"https://cuckoo.network/blog"}
            >
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname === item.href ? "bg-muted px-3 py-2 text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Discord and Forums</CardTitle>
                <CardDescription>
                  Unlock all potentials and get unlimited access to our
                  community.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button
                  size="sm"
                  variant={"outline"}
                  className="w-full"
                  target={"_blank"}
                  href={"https://cuckoo.network/dc"}
                >
                  Join
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Bird className="h-6 w-6" />
                  <span className="sr-only">Cuckoo Portal</span>
                </Link>

                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname === item.href ? "bg-muted px-3 py-2 text-primary" : "text-muted-foreground hover:text-primary"}`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Discord and Forums</CardTitle>
                    <CardDescription>
                      Unlock all potentials and get unlimited access to our
                      community.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Join
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Badge>Testnet Sepolia</Badge>
          </div>
          <DropdownMenu>
            <ConnectWallet style={web3BtnPrimaryStyle} />
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
