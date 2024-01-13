<?php

namespace App\Exports;

use App\Models\Division;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportDivision implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Division::select(
            'name',
            'start_at',
            'end_at',
            'permissions',
            'actived'
        )->get();
    }

    public function map($division): array
    {
        return [
            $division->name,
            $division->start_at,
            $division->end_at,
            $this->extractPermissions($division->permissions),
            $division->actived ? 'Actived' : 'Inactived'
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
