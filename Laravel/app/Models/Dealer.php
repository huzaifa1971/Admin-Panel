<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dealer extends Model
{
    use HasFactory;

    protected $table = "dealer";

    protected $fillable = [

        'firstname',
        'lastname',
        'address',
        'email',
        'phone',
        'country',
        'city',
        'message',
        'file'

    ];
}
