<?php

namespace Database\Seeders;

use App\Enums\RoleId;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => RoleId::Administrator->name,
            'email' => 'administrator@mail.com',
            'role_id' => RoleId::Administrator->value
        ]);

        User::factory(3)->create();
    }
}
