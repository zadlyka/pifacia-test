<?php

namespace App\Helpers;

use App\Enums\Permission;

class PermissionCheck
{
    public static function verify($user, $use, $user_id)
    {
        $role = $user->role;
        $permissions = array();

        foreach ($role->permissions as $permission) {
            array_push($permissions, $permission['value']);
        }

        if (in_array(Permission::Manage_All->value, $permissions)) return true;

        else if (in_array($use, $permissions)) return true;

        else if (in_array(round($use / 100) * 100, $permissions)) return true;

        else if ($user->id === $user_id) return true;

        return false;
    }
}
