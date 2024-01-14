import moment from "moment";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { Departement, Division, Option, PageProps } from "@/types";
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
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

function EditForm({
    division,
    options,
    className,
}: {
    division: Division;
    options: { departements: Departement[]; permissions: Option[] };
    className?: string;
}) {
    const departements = options.departements;
    const optionsPermissions = options.permissions;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            departement_id: division.departement_id,
            name: division.name,
            start_at: moment(division.start_at).format("YYYY-MM-DD HH:mm:ss"),
            end_at: moment(division.end_at).format("YYYY-MM-DD HH:mm:ss"),
            actived: division.actived,
            permissions: division.permissions,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("division.update", division.id));
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
                <Label htmlFor="departement_id">Departement</Label>
                <ShadcnSelect
                    onValueChange={(value) => setData("departement_id", value)}
                    defaultValue={data.departement_id}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a departement" />
                    </SelectTrigger>
                    <SelectContent>
                        {departements.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </ShadcnSelect>
                <InputError message={errors.departement_id} className="mt-2" />
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
                    options={optionsPermissions}
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

function DrawerDialogDemo({
    division,
    options,
}: {
    division: Division;
    options: { departements: Departement[]; permissions: Option[] };
}) {
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
                        <DialogTitle>Edit division</DialogTitle>
                        <DialogDescription>
                            Please fill out this form.
                        </DialogDescription>
                    </DialogHeader>
                    <EditForm division={division} options={options} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit division</DrawerTitle>
                    <DrawerDescription>
                        Please fill out this form.
                    </DrawerDescription>
                </DrawerHeader>
                <EditForm
                    division={division}
                    options={options}
                    className="px-4"
                />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default function Edit({
    auth,
    division,
    options,
}: PageProps<{
    division: Division;
    options: { departements: Departement[]; permissions: Option[] };
}>) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Division" />
            <div className="p-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <DrawerDialogDemo division={division} options={options} />
                </div>
            </div>
        </DashboardLayout>
    );
}
