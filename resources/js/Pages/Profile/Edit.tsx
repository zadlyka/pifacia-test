import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/dashboard-layout";
import { Card } from "@/Components/ui/card";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ auth }: PageProps) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Profile" />
            <div className="p-4">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <Card className="p-4">
                        <UpdateProfileInformationForm className="max-w-xl" />
                    </Card>

                    <Card className="p-4">
                        <UpdatePasswordForm className="max-w-xl" />
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
