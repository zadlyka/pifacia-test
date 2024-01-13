<?php

namespace App\Exports;

use App\Models\Employee;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportEmployee implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Employee::select(
            'name',
            'start_at',
            'end_at',
            'permissions',
            'actived'
        )->get();
    }

    public function map($employee): array
    {
        return [
            $employee->name,
            $employee->start_at,
            $employee->end_at,
            $this->extractPermissions($employee->permissions),
            $employee->actived ? 'Actived' : 'Inactived'
        ];
    }

    public function headings(): array
    {
        return [
            "Name",
            "Start At",
            "End At",
            "Permission",
            "Actived"
        ];
    }

    public function extractPermissions($permissions)
    {
        if (!is_array($permissions)) return '';

        $data = array();
        foreach ($permissions as $item) {
            array_push($data, $item['label']);
        }
        return join(",", $data);
    }
}
