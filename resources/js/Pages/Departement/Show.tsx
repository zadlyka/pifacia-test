import moment from "moment";
import { Head, Link } from "@inertiajs/react";
import { Audit, Departement, PageProps } from "@/types";
import DashboardLayout from "@/Layouts/dashboard-layout";
import { buttonVariants } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

function ExtractNotes({ data, event }: { data: any; event: string }) {
    const keys = data instanceof Object ? Object.keys(data) : [];

    return (
        <ul>
            {keys?.map((item, index) => (
                <li key={index}>
                    {event} data {item}
                </li>
            ))}
        </ul>
    );
}

export default function Show({
    auth,
    departement,
    audits,
}: PageProps<{ departement: Departement; audits: Audit[] }>) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Departement" />
            <div className="p-4">
                <div className="mx-auto space-y-4 max-w-7xl sm:px-6 lg:px-8">
                    <div className="inline-flex justify-between w-full">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                Departement
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                A detail of your departement.
                            </p>
                        </div>

                        <Link
                            href={route("departement.edit", departement.id)}
                            className={buttonVariants()}
                        >
                            Edit
                        </Link>
                    </div>

                    <div className="space-y-2">
                        <div className="flex flex-row">
                            <dt className="text-sm font-medium w-36 text-muted-foreground md:text-base">
                                Name
                            </dt>
                            <dd className="font-medium">{departement.name}</dd>
                        </div>
                        <div className="flex flex-row">
                            <dt className="text-sm font-medium w-36 text-muted-foreground md:text-base">
                                Start At
                            </dt>
                            <dd className="font-medium">
                                {departement.start_at}
                            </dd>
                        </div>
                        <div className="flex flex-row">
                            <dt className="text-sm font-medium w-36 text-muted-foreground md:text-base">
                                End At
                            </dt>
                            <dd className="font-medium">
                                {departement.end_at}
                            </dd>
                        </div>
                        <div className="flex flex-row">
                            <dt className="text-sm font-medium w-36 text-muted-foreground md:text-base">
                                Actived
                            </dt>
                            <dd className="font-medium">
                                {departement.actived ? "Actived" : "Inactived"}
                            </dd>
                        </div>
                        <div className="flex flex-row">
                            <dt className="text-sm font-medium w-36 text-muted-foreground md:text-base">
                                Permissions
                            </dt>
                            <dd className="font-medium">
                                <ul>
                                    {departement.permissions?.map(
                                        (permission, index) => (
                                            <li key={index}>
                                                {permission.label}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </dd>
                        </div>

                        <div className="flex flex-row">
                            <dt className="text-sm font-medium w-36 text-muted-foreground md:text-base">
                                File
                            </dt>
                            <dd className="font-medium">
                                {departement.file ? (
                                    <a
                                        className="text-blue-600"
                                        href={departement.file}
                                    >
                                        Download
                                    </a>
                                ) : (
                                    ""
                                )}
                            </dd>
                        </div>
                    </div>

                    <div className="inline-flex justify-between w-full">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                History
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                A List of data change history.
                            </p>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Event</TableHead>
                                <TableHead>Notes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {audits?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {moment(item.created_at).format(
                                            "YYYY-MM-DD HH:mm:ss"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.user?.name ?? "System"}
                                    </TableCell>
                                    <TableCell>{item.event}</TableCell>
                                    <TableCell>
                                        <ExtractNotes
                                            data={item.new_values}
                                            event={item.event}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
}
