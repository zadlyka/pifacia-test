<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Role;
use App\Models\User;
use App\Models\Division;
use App\Models\Employee;
use App\Models\Departement;
use App\Policies\RolePolicy;
use App\Policies\UserPolicy;
use App\Policies\DivisionPolicy;
use App\Policies\EmployeePolicy;
use App\Policies\DepartementPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Departement::class => DepartementPolicy::class,
        Division::class => DivisionPolicy::class,
        Employee::class => EmployeePolicy::class,
        Role::class => RolePolicy::class,
        User::class => UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
