<?php

namespace Database\Seeders;

use App\Enums\Permission;
use App\Enums\RoleId;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::factory()->create([
            'id' => RoleId::Administrator->value,
            'name' => RoleId::Administrator->name,
            'permissions' => [
                (object) [
                    'value' => Permission::Manage_All->value,
                    'label' => str_replace("_", " ", Permission::Manage_All->name)
                ]
            ]
        ]);

        Role::factory()->create([
            'id' => RoleId::Basic->value,
            'name' => RoleId::Basic->name,
            'permissions' =>  [
                (object) [
                    'value' => Permission::Manage_Role->value,
                    'label' => str_replace("_", " ", Permission::Manage_Role->name)
                ],
                (object) [
                    'value' => Permission::Manage_Departement->value,
                    'label' => str_replace("_", " ", Permission::Manage_Departement->name)
                ],
                (object) [
                    'value' => Permission::Manage_Division->value,
                    'label' => str_replace("_", " ", Permission::Manage_Division->name)
                ],
                (object) [
                    'value' => Permission::Manage_Employee->value,
                    'label' => str_replace("_", " ", Permission::Manage_Employee->name)
                ]
            ]
        ]);

        Role::factory(3)->create();
    }
}
