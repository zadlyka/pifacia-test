import { Head, Link } from "@inertiajs/react";
import { Division, Employee, PageProps } from "@/types";
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

interface EmployeePaginate extends PaginateLink {
    data: Employee[];
}

function extractOptionDivision(divisions: Division[]) {
    const data = [];
    for (const division of divisions) {
        data.push({ value: division.id, label: division.name });
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
    paginate: EmployeePaginate;
    search?: string;
    sort?: string;
    filter?: any;
    options: { divisions: Division[] };
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

    const dataFilter = extractOptionDivision(options.divisions);

    const filterDivisionId = filter?.hasOwnProperty("division_id")
        ? filter["division_id"]
        : undefined;

    return (
        <DashboardLayout user={auth.user} search={search}>
            <Head title="Employee" />
            <div className="p-4">
                <div className="mx-auto space-y-4 max-w-7xl sm:px-6 lg:px-8">
                    <div className="inline-flex justify-between w-full">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                Employee
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                A list of your recent employees.
                            </p>
                        </div>

                        <div className="flex space-x-2">
                            <Filter
                                data={dataFilter}
                                filterKey="filter[division_id]"
                                placeholder="Filter"
                                defaultValue={filterDivisionId}
                            />

                            <Filter
                                data={dataSort}
                                filterKey="sort"
                                placeholder="Sort By"
                                defaultValue={sort ?? undefined}
                            />

                            <a
                                href={route("employee.export")}
                                className={buttonVariants()}
                            >
                                Export
                            </a>

                            <Link
                                href={route("employee.create")}
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
                                    Division
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Start At
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    End At
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Permissions
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    File
                                </TableHead>
                                <TableHead>Actived</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginate.data?.map((item: Employee) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="hidden font-medium sm:table-cell">
                                        {item.division.name}
                                    </TableCell>
                                    <TableCell className="hidden font-medium sm:table-cell">
                                        {item.start_at}
                                    </TableCell>
                                    <TableCell className="hidden font-medium sm:table-cell">
                                        {item.end_at}
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
                                    <TableCell className="hidden font-medium sm:table-cell">
                                        {item.file && (
                                            <a
                                                className="text-blue-600"
                                                href={item.file}
                                            >
                                                Download
                                            </a>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {item.actived ? "Actived" : "Inactived"}
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
                                                            "employee.show",
                                                            item.id
                                                        )}
                                                    >
                                                        Detail
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "employee.edit",
                                                            item.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "employee.destroy",
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
