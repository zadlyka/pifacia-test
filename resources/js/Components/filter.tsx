import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";

interface Data {
    value: string;
    label: string;
}

export default function Filter({
    data,
    filterKey,
    placeholder,
    defaultValue,
    className,
}: {
    data: Data[];
    filterKey: string;
    placeholder: string;
    defaultValue?: string;
    className?: string;
}) {
    return (
        <Select
            onValueChange={(value) => {
                location.replace(`${route().current()}?${filterKey}=${value}`);
            }}
            defaultValue={defaultValue}
        >
            <SelectTrigger
                className={cn(className, "hidden w-[180px] sm:flex")}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {data.map((item) => (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
