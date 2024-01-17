<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Employees extends Model
{
    use HasFactory;

    protected $table = "employees";

    protected $fillable = [

        'name',
        'email',
        'joining_date',
        'joining_salary',
        'password',
        'phone_number',
        'is_active'
    ];
}
