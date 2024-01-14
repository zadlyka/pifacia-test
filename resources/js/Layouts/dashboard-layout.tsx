import { PropsWithChildren } from "react";
import { User } from "@/types";
import { Sidebar } from "@/Components/dashboard/sidebar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Header } from "@/Components/dashboard/header";
import {
    Blocks,
    Building2,
    LayoutDashboard,
    ShieldEllipsis,
    User as UserIcon,
    Users,
} from "lucide-react";

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
                    name: "Role",
                    href: route("role"),
                    icon: ShieldEllipsis,
                    active: route().current("role"),
                },
                {
                    name: "User",
                    href: route("user"),
                    icon: UserIcon,
                    active: route().current("user"),
                },
                {
                    name: "Departement",
                    href: route("departement"),
                    icon: Building2,
                    active: route().current("departement"),
                },
                {
                    name: "Division",
                    href: route("division"),
                    icon: Blocks,
                    active: route().current("division"),
                },
                {
                    name: "Employee",
                    href: route("employee"),
                    icon: Users,
                    active: route().current("employee"),
                },
            ],
        },
    ];

    return (
        <main className="flex h-screen">
            <Sidebar menu={menu} className="hidden w-1/4 sm:flex border-e" />
            <ScrollArea className="w-full h-screen">
                <Header user={user} menu={menu} search={search} className="sticky top-0" />
                <div>{children}</div>
            </ScrollArea>
        </main>
    );
}
