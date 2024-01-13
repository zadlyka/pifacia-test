import { PropsWithChildren } from "react";
import { User } from "@/types";
import { Sidebar } from "@/Components/dashboard/sidebar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Header } from "@/Components/dashboard/header";
import { Grid2X2, LayoutDashboard } from "lucide-react";

export default function DashboardLayout({
    user,
    search,
    children,
}: PropsWithChildren<{ user: User; search?: string }>) {
    const menu = [
        {
            label: "Pages",
            subMenu: [
                {
                    name: "Dashboard",
                    href: route("dashboard"),
                    icon: LayoutDashboard,
                    active: route().current("dashboard"),
                },
                {
                    name: "Departement",
                    href: route("departement"),
                    icon: Grid2X2,
                    active: route().current("departement"),
                },
            ],
        },
    ];

    return (
        <main className="flex h-screen">
            <Sidebar menu={menu} className="hidden w-1/4 sm:flex border-e" />
            <ScrollArea className="w-full h-screen">
                <Header menu={menu} search={search} className="sticky top-0" />
                <div>{children}</div>
            </ScrollArea>
        </main>
    );
}
