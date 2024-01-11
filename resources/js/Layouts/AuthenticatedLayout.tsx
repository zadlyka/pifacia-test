import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import { Sidebar } from "@/Components/sidebar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Header } from "@/Components/header";
import {
    CheckSquare,
    FormInput,
    Grid2X2,
    LayoutDashboard,
    LogIn,
    LogOut,
} from "lucide-react";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    const menu = [
        {
            label: "Pages",
            subMenu: [
                {
                    name: "Dashboard",
                    href: "/dashboard",
                    icon: LayoutDashboard,
                },
                {
                    name: "Tables",
                    href: "/tables",
                    icon: Grid2X2,
                },
                {
                    name: "Tasks",
                    href: "/tasks",
                    icon: CheckSquare,
                },
                {
                    name: "Forms",
                    href: "/forms",
                    icon: FormInput,
                },
            ],
        },
        {
            label: "Account",
            subMenu: [
                {
                    name: "Sign In",
                    href: "/sign-in",
                    icon: LogIn,
                },
                {
                    name: "Sign Out",
                    href: "/sign-out",
                    icon: LogOut,
                },
            ],
        },
    ];

    return (
        <main className="flex h-screen">
            <Sidebar menu={menu} className="hidden w-1/4 sm:flex border-e" />
            <ScrollArea className="w-full h-screen">
                <Header menu={menu} className="sticky top-0" />
                <div>{children}</div>
            </ScrollArea>
        </main>
    );
}
