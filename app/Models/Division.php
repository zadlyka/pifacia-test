<?php

namespace App\Models;

use App\Models\Departement;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Division extends Model implements Auditable
{
    use HasFactory, SoftDeletes, HasUuids;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'departement_id',
        'name',
        'start_at',
        'end_at',
        'actived',
        'permissions',
        'file',
    ];

    protected $casts = [
        'actived' => 'boolean',
        'permissions' => 'array',
    ];

    public function departement()
    {
        return $this->belongsTo(Departement::class, 'departement_id');
    }

    protected $with = [
        'departement',
    ];

    public function scopeSearch(Builder $query, $value)
    {
        $query->when($value ?? false, function ($query, $value) {
            return $query->where('name', 'LIKE', '%' . $value . '%');
        });
    }

    public function scopeFilter(Builder $query, $value): void
    {
        $query->when($value['departement_id'] ?? false, function ($query, $value) {
            return $query->where('departement_id', $value);
        });

        $query->when($value['actived'] ?? false, function ($query, $value) {
            return $query->where('actived', $value === 'true' ? 1 : 0);
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
