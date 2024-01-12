import { Head, Link } from "@inertiajs/react";
import { Basic, PageProps } from "@/types";
import DashboardLayout from "@/Layouts/dashboard-layout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { buttonVariants } from "@/Components/ui/button";
import { MoreVertical } from "lucide-react";
import Paginate, { PaginateLink } from "@/Components/paginate";

interface BasicPaginate extends PaginateLink {
    data: Basic[];
}

export default function Index({
    auth,
    paginate,
    search,
}: PageProps<{ paginate: BasicPaginate; search?: string }>) {
    return (
        <DashboardLayout user={auth.user} search={search}>
            <Head title="Basic" />
            <div className="p-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="inline-flex justify-between w-full">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                Basic
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </p>
                        </div>
                        <Link
                            href={route("basic.create")}
                            className={buttonVariants()}
                        >
                            Add
                        </Link>
                    </div>

                    <Table>
                        <TableCaption>
                            A list of your recent basics.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginate.data?.map((item: Basic) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <MoreVertical className="w-4 h-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "basic.show",
                                                            item.id
                                                        )}
                                                    >
                                                        Detail
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "basic.edit",
                                                            item.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "basic.destroy",
                                                            item.id
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="w-full"
                                                    >
                                                        Delete
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Paginate className="mt-4" paginateLink={paginate} />
                </div>
            </div>
        </DashboardLayout>
    );
}
