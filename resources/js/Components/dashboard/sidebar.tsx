import { cn } from "@/lib/utils";
import { LucideIcon, Settings } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button, buttonVariants } from "@/Components/ui/button";
import ApplicationLogo from "@/Components/application-logo";
import { User } from "@/types";

interface SubMenu {
    name: string;
    href: string;
    icon: LucideIcon;
    active: boolean;
    permission: string | null;
}

export interface Menu {
    label: string;
    subMenu: SubMenu[];
}

function evaluatePermission(permission: string | null, user: User) {
    if (!permission) return true;
    if (!user.role) return false;

    const permissionManage = Math.round(Number(permission) / 100) * 100;
    const allowedPermissions = ["0", permissionManage.toString(), permission];

    const permissions = user.role?.permissions.map((item) => item.value);

    return allowedPermissions.some((item) => permissions.includes(item));
}

export function Sidebar({
    user,
    menu,
    className,
}: {
    user: User;
    menu: Menu[];
    className?: string;
}) {
    return (
        <div className={cn("flex flex-col gap-4 p-4 h-screen", className)}>
            <div className="flex justify-center w-full">
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
                </Link>
            </div>

            <ul className="flex-grow space-y-2 list-none">
                {menu.map((item, index) => (
                    <li key={index}>
                        <h2 className="mb-2 font-semibold tracking-tight">
                            {item.label}
                        </h2>
                        <ul className="space-y-2 list-none">
                            {item.subMenu.map(
                                (item, index) =>
                                    evaluatePermission(
                                        item.permission,
                                        user
                                    ) && (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    buttonVariants({
                                                        variant: item.active
                                                            ? "default"
                                                            : "ghost",
                                                    }),
                                                    "text-sm flex justify-start w-full"
                                                )}
                                            >
                                                <item.icon
                                                    className="w-4 h-4 mr-2"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                            )}
                        </ul>
                    </li>
                ))}
            </ul>

            <div className="sticky inset-x-0 bottom-0 pt-4 border-t">
                <Button variant="ghost" className="justify-start w-full">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                </Button>
            </div>
        </div>
    );
}
