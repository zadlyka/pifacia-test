import moment from "moment";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { PageProps } from "@/types";
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
import { Checkbox } from "@/Components/ui/checkbox";
import { cn } from "@/lib/utils";
import Select from "react-select";

export const optionsDepartement = [
    { value: "0", label: "Manage All" },
    { value: "100", label: "Manage Data" },
    { value: "200", label: "Manage Member" },
];

function AddForm({ className }: { className?: string }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            start_at: "",
            end_at: "",
            actived: false,
            permissions: null,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("departement.store"));
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
                <Label htmlFor="start_at">Start At</Label>
                <Input
                    id="start_at"
                    type="datetime-local"
                    name="start_at"
                    value={data.start_at}
                    className="block w-full mt-1"
                    onChange={(e) =>
                        setData(
                            "start_at",
                            moment(e.target.value).format("YYYY-MM-DD HH:mm:ss")
                        )
                    }
                />
                <InputError message={errors.start_at} className="mt-2" />
            </div>

            <div>
                <Label htmlFor="end_at">End At</Label>
                <Input
                    id="end_at"
                    type="datetime-local"
                    name="end_at"
                    value={data.end_at}
                    className="block w-full mt-1"
                    onChange={(e) =>
                        setData(
                            "end_at",
                            moment(e.target.value).format("YYYY-MM-DD HH:mm:ss")
                        )
                    }
                />
                <InputError message={errors.end_at} className="mt-2" />
            </div>

            <div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="actived"
                        checked={data.actived}
                        onCheckedChange={() =>
                            setData("actived", !data.actived)
                        }
                    />
                    <Label htmlFor="actived">Actived</Label>
                </div>

                <InputError message={errors.actived} className="mt-2" />
            </div>

            <div>
                <Label htmlFor="permissions">Permissions</Label>
                <Select
                    id="permissions"
                    name="permissions"
                    isMulti
                    options={optionsDepartement}
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

function DrawerDialogDemo() {
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
                        <DialogTitle>Add departement</DialogTitle>
                        <DialogDescription>
                            Please fill out this form.
                        </DialogDescription>
                    </DialogHeader>
                    <AddForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add departement</DrawerTitle>
                    <DrawerDescription>
                        Please fill out this form.
                    </DrawerDescription>
                </DrawerHeader>
                <AddForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default function Create({ auth }: PageProps) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Departement" />
            <div className="p-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <DrawerDialogDemo />
                </div>
            </div>
        </DashboardLayout>
    );
}
