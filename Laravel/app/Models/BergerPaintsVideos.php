<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BergerPaintsVideos extends Model
{
    use HasFactory;

    protected $table = "berger_paints_videos" ;

    protected $fillable = [

        'title',
        'description',
        'file',
        'is_active'

    ];
}
