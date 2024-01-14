<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\Permission;
use App\Helpers\PermissionCheck;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return PermissionCheck::verify($user, Permission::Read_User->value, null);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        return PermissionCheck::verify($user, Permission::Read_User->value, null);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return PermissionCheck::verify($user, Permission::Create_User->value, null);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        return PermissionCheck::verify($user, Permission::Update_User->value, null);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        return PermissionCheck::verify($user, Permission::Delete_User->value, null);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return PermissionCheck::verify($user, Permission::Update_User->value, null);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return PermissionCheck::verify($user, Permission::Delete_User->value, null);
    }
}
