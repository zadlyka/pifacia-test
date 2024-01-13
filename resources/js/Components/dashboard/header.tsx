"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bell, ChevronDown, Menu as MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Menu, Sidebar } from "@/Components/dashboard/sidebar";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export function Header({
    menu,
    search,
    className,
}: {
    menu: Menu[];
    search?: string;
    className?: string;
}) {
    const { setData, get } = useForm({
        search: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        get(route().current() ?? "");
    };

    return (
        <div
            className={cn(
                "flex items-center justify-between sm:justify-end gap-4 p-4 border-b z-10 bg-white",
                className
            )}
        >
            <Sheet>
                <SheetTrigger className="sm:hidden">
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="left">
                    <Sidebar menu={menu} className="py-8" />
                </SheetContent>
            </Sheet>

            <form onSubmit={submit} className="sm:w-1/3">
                <Input
                    id="search"
                    type="search"
                    name="search"
                    placeholder="search..."
                    defaultValue={search}
                    onChange={(e) => setData("search", e.target.value)}
                />
            </form>

            <div className="flex gap-2 sm:gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="relative ">
                            <Bell className="w-4 h-4 " />
                            <span className="sr-only">Notifications</span>
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1.2, 1, 1],
                                }}
                                transition={{
                                    ease: "linear",
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                                className="absolute w-4 h-4 bg-red-500 border-2 border-white rounded-full -top-2 -end-2"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Not found</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="inline-flex items-center gap-4 cursor-pointer">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="hidden text-sm sm:flex">
                                John Doe
                            </span>
                            <ChevronDown className="hidden w-4 h-4 sm:flex" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={route("profile.edit")}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route("logout")} method="post">
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
