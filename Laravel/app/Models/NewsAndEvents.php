<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsAndEvents extends Model
{
    use HasFactory;

    protected $table = "news_and_event";

    protected $fillable = [

        'title',
        'short_description',
        'long_description',
        'image',
        'is_active'

    ];
}
