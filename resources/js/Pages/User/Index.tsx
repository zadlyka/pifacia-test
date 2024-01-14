import { Head, Link } from "@inertiajs/react";
import { User, PageProps, Role } from "@/types";
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

interface UserPaginate extends PaginateLink {
    data: User[];
}

function extractOptionRole(roles: Role[]) {
    const data = [];
    for (const role of roles) {
        data.push({ value: role.id, label: role.name });
    }
    return data;
}

export default function Index({
    auth,
    paginate,
    search,
    sort,
    filter,
    options,
}: PageProps<{
    paginate: UserPaginate;
    search?: string;
    sort?: string;
    filter?: any;
    options: { roles: Role[] };
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

    const dataFilter = extractOptionRole(options.roles)

    const filterRoleId = filter?.hasOwnProperty("role_id")
        ? filter["role_id"]
        : undefined;

    return (
        <DashboardLayout user={auth.user} search={search}>
            <Head title="User" />
            <div className="p-4">
                <div className="mx-auto space-y-4 max-w-7xl sm:px-6 lg:px-8">
                    <div className="inline-flex justify-between w-full">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                User
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                A list of your recent users.
                            </p>
                        </div>

                        <div className="flex space-x-2">
                            <Filter
                                data={dataFilter}
                                filterKey="filter[role_id]"
                                placeholder="Filter"
                                defaultValue={filterRoleId}
                            />

                            <Filter
                                data={dataSort}
                                filterKey="sort"
                                placeholder="Sort By"
                                defaultValue={sort ?? undefined}
                            />

                            <a
                                href={route("user.export")}
                                className={buttonVariants()}
                            >
                                Export
                            </a>

                            <Link
                                href={route("user.create")}
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
                                    Email
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Role
                                </TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginate.data?.map((item: User) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="hidden font-medium sm:table-cell">
                                        {item.email}
                                    </TableCell>
                                    <TableCell className="hidden font-medium sm:table-cell">
                                        {item.role?.name ?? "-"}
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
                                                            "user.show",
                                                            item.id
                                                        )}
                                                    >
                                                        Detail
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "user.edit",
                                                            item.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "user.destroy",
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
