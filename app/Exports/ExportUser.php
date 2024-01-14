<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportUser implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return User::get();
    }

    public function map($user): array
    {
        return [
            $user->name,
            $user->email,
            $user->role->name ?? '-'
        ];
    }

    public function headings(): array
    {
        return [
            "Name",
            "Email",
            "Role"
        ];
    }
}
