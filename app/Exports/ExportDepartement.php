<?php

namespace App\Exports;

use App\Models\Departement;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportDepartement implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Departement::select(
            'name',
            'start_at',
            'end_at',
            'permissions',
            'actived'
        )->get();
    }

    public function map($departement): array
    {
        return [
            $departement->name,
            $departement->start_at,
            $departement->end_at,
            $this->extractPermissions($departement->permissions),
            $departement->actived ? 'Actived' : 'Inactived'
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
