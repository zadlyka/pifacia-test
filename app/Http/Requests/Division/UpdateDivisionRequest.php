<?php

namespace App\Http\Requests\Division;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDivisionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'departement_id' => ['required', 'uuid', 'exists:departements,id'],
            'name' => ['required', 'string', 'max:255'],
            'start_at' => ['required', 'date_format:Y-m-d H:i:s'],
            'end_at' => ['required', 'date_format:Y-m-d H:i:s'],
            'actived' => ['required', 'boolean'],
            'permissions' => ['nullable', 'array'],
            'file' => ['nullable'],
        ];
    }
}
