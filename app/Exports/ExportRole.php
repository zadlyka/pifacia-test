<?php

namespace App\Exports;

use App\Models\Role;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportRole implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Role::select(
            'name',
            'permissions',
        )->get();
    }

    public function map($role): array
    {
        return [
            $role->name,
            $this->extractPermissions($role->permissions),
        ];
    }

    public function headings(): array
    {
        return [
            "Name",
            "Permission",
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
