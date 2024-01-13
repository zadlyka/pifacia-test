import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { Role, PageProps } from "@/types";
import DashboardLayout from "@/Layouts/dashboard-layout";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/Components/ui/drawer";
import { Button } from "@/Components/ui/button";
import InputError from "@/Components/input-error";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import Select from "react-select";
import { optionsRole } from "./Create";

function EditForm({ role, className }: { role: Role; className?: string }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: role.name,
            permissions: role.permissions,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("role.update", role.id));
    };

    return (
        <form onSubmit={submit} className={cn(className, "space-y-6")}>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="block w-full mt-1"
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <Label htmlFor="permissions">Permissions</Label>
                <Select
                    id="permissions"
                    name="permissions"
                    isMulti
                    options={optionsRole}
                    className="basic-multi-select"
                    value={data.permissions}
                    onChange={(value) => setData("permissions", value as any)}
                />
                <InputError message={errors.permissions} className="mt-2" />
            </div>

            <Button className="w-full" disabled={processing}>
                Save
            </Button>
        </form>
    );
}

function DrawerDialogDemo({ role }: { role: Role }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);

    const isWindow = typeof window !== "undefined";
    const getWidth = () => (isWindow ? window.innerWidth : 0);

    useEffect(() => {
        if (!isOpen) {
            history.back();
        }

        if (isWindow) {
            const width = getWidth();
            if (width >= 768) setIsDesktop(true);
        }
    }, [isOpen, isDesktop, setIsDesktop]);

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit role</DialogTitle>
                        <DialogDescription>
                            Please fill out this form.
                        </DialogDescription>
                    </DialogHeader>
                    <EditForm role={role} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit role</DrawerTitle>
                    <DrawerDescription>
                        Please fill out this form.
                    </DrawerDescription>
                </DrawerHeader>
                <EditForm role={role} className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default function Edit({ auth, role }: PageProps<{ role: Role }>) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Role" />
            <div className="p-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <DrawerDialogDemo role={role} />
                </div>
            </div>
        </DashboardLayout>
    );
}
