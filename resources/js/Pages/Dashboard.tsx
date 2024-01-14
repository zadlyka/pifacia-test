import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import DashboardLayout from "@/Layouts/dashboard-layout";

export default function Dashboard({ auth }: PageProps) {
    const role = auth.user.role?.name ?? "-";

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="p-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    You're logged in as <strong>{role}</strong> !
                </div>
            </div>
        </DashboardLayout>
    );
}
