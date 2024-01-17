<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $table = "products";

    protected $fillable = [

        'category_id',
        'parent_id',
        'name',
        'details',
        'price',
        'weight',
        'image',
        'is_active',
        'image_name'

    ];
}
