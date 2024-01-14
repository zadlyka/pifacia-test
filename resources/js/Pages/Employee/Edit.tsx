import moment from "moment";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { Division, Employee, Option, PageProps } from "@/types";
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
    employee,
    options,
    className,
}: {
    employee: Employee;
    options: { divisions: Division[]; permissions: Option[] };
    className?: string;
}) {
    const inputRef = useRef(null);
    const divisions = options.divisions;
    const optionsPermissions = options.permissions;
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            division_id: employee.division_id,
            name: employee.name,
            start_at: moment(employee.start_at).format("YYYY-MM-DD HH:mm:ss"),
            end_at: moment(employee.end_at).format("YYYY-MM-DD HH:mm:ss"),
            actived: employee.actived,
            permissions: employee.permissions,
            file: employee.file,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("employee.update", employee.id));
    };

    return (
        <form onSubmit={submit} className={cn(className, "space-y-6")}>
            <div className="grid grid-cols-2 gap-2">
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
                    <Label htmlFor="division_id">Division</Label>
                    <ShadcnSelect
                        onValueChange={(value) => setData("division_id", value)}
                        defaultValue={data.division_id}
                    >
                        <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Select a division" />
                        </SelectTrigger>
                        <SelectContent>
                            {divisions.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </ShadcnSelect>
                    <InputError message={errors.division_id} className="mt-2" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
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
                                moment(e.target.value).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )
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
                                moment(e.target.value).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )
                            )
                        }
                    />
                    <InputError message={errors.end_at} className="mt-2" />
                </div>
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

            <div>
                <Label htmlFor="file">File</Label>
                <Input
                    id="file"
                    type="file"
                    name="file"
                    className="block w-full mt-1"
                    ref={inputRef}
                    onChange={(e) =>
                        setData(
                            "file",
                            //@ts-ignore
                            e.target.files[0]
                        )
                    }
                />

                <InputError message={errors.file} className="mt-2" />

                {data.file && (
                    <div className="flex items-center justify-between mt-2 space-x-2">
                        <a className="text-blue-600" href={data.file}>
                            Download
                        </a>

                        <Button
                            onClick={() => {
                                setData("file", "");
                                if (inputRef.current) {
                                    //@ts-ignore
                                    inputRef.current.value = null;
                                }
                            }}
                            type="button"
                            size={"sm"}
                            variant={"destructive"}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            <Button className="w-full" disabled={processing}>
                Save
            </Button>
        </form>
    );
}

function DrawerDialogDemo({
    employee,
    options,
}: {
    employee: Employee;
    options: { divisions: Division[]; permissions: Option[] };
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
                        <DialogTitle>Edit employee</DialogTitle>
                        <DialogDescription>
                            Please fill out this form.
                        </DialogDescription>
                    </DialogHeader>
                    <EditForm employee={employee} options={options} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit employee</DrawerTitle>
                    <DrawerDescription>
                        Please fill out this form.
                    </DrawerDescription>
                </DrawerHeader>
                <EditForm
                    employee={employee}
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
    employee,
    options,
}: PageProps<{
    employee: Employee;
    options: { divisions: Division[]; permissions: Option[] };
}>) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Employee" />
            <div className="p-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <DrawerDialogDemo employee={employee} options={options} />
                </div>
            </div>
        </DashboardLayout>
    );
}
