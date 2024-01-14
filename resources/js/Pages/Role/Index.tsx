import { Head, Link } from "@inertiajs/react";
import { Role, PageProps } from "@/types";
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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { buttonVariants } from "@/Components/ui/button";
import { MoreVertical } from "lucide-react";
import Paginate, { PaginateLink } from "@/Components/paginate";
import Filter from "@/Components/filter";

interface RolePaginate extends PaginateLink {
    data: Role[];
}

export default function Index({
    auth,
    paginate,
    search,
    sort,
}: PageProps<{
    paginate: RolePaginate;
    search?: string;
    sort?: string;
}>) {
    const dataSort = [
        {
            value: "name:asc",
            label: "Name - ASC",
        },
        {
            value: "name:desc",
            label: "Name - DESC",
        },
    ];

    return (
        <DashboardLayout user={auth.user} search={search}>
            <Head title="Role" />
            <div className="p-4">
                <div className="mx-auto space-y-4 max-w-7xl sm:px-6 lg:px-8">
                    <div className="inline-flex justify-between w-full">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                Role
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                A list of your recent roles.
                            </p>
                        </div>

                        <div className="flex space-x-2">
                            <Filter
                                data={dataSort}
                                filterKey="sort"
                                placeholder="Sort By"
                                defaultValue={sort ?? undefined}
                            />

                            <a
                                href={route("role.export")}
                                className={buttonVariants()}
                            >
                                Export
                            </a>

                            <Link
                                href={route("role.create")}
                                className={buttonVariants()}
                            >
                                Add
                            </Link>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Permissions
                                </TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginate.data?.map((item: Role) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="hidden font-medium sm:table-cell">
                                        <ul>
                                            {item.permissions?.map(
                                                (permission, index) => (
                                                    <li key={index}>
                                                        {permission.label}
                                                    </li>
                                                )
                                            )}
                                        </ul>
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
                                                            "role.show",
                                                            item.id
                                                        )}
                                                    >
                                                        Detail
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "role.edit",
                                                            item.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "role.destroy",
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

                    <Paginate paginateLink={paginate} />
                </div>
            </div>
        </DashboardLayout>
    );
}
