<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Role;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements Auditable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasUuids;
    use \OwenIt\Auditing\Auditable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    protected $with = [
        'role',
    ];

    public function scopeSearch(Builder $query, $value)
    {
        $query->when($value ?? false, function ($query, $value) {
            return $query->where('name', 'LIKE', '%' . $value . '%');
        });
    }

    public function scopeFilter(Builder $query, $value): void
    {
        $query->when($value['role_id'] ?? false, function ($query, $value) {
            return $query->where('role_id', $value);
        });

        $query->when($value['created_at'] ?? false, function ($query, $value) {
            return $query->where('created_at', $value);
        });

        $query->when($value['updated_at'] ?? false, function ($query, $value) {
            return $query->where('updated_at', $value);
        });
    }

    public function scopeSort(Builder $query, $sortBy): void
    {
        $query->when($sortBy ?? false, function ($query, $sort) {
            $sortby = explode(":", $sort);
            $field = $sortby[0];
            $order = $sortby[1];

            return $query->orderBy($field, $order);
        });
    }
}
